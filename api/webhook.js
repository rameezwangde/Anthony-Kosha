import Stripe from 'stripe';
import { Resend } from 'resend';

// Initialize SDKs with environment variables
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
const resend = new Resend(process.env.RESEND_API_KEY);

// Disable Next.js/Vercel body parsing so we can compute the raw Stripe signature
export const config = {
  api: {
    bodyParser: false,
  },
};

// Helper function to read the raw body from the request stream
async function buffer(readable) {
  const chunks = [];
  for await (const chunk of readable) {
    chunks.push(typeof chunk === 'string' ? Buffer.from(chunk) : chunk);
  }
  return Buffer.concat(chunks);
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  const sig = req.headers['stripe-signature'];
  let event;

  try {
    const rawBody = await buffer(req);
    event = stripe.webhooks.constructEvent(
      rawBody.toString('utf8'),
      sig,
      process.env.STRIPE_WEBHOOK_SECRET
    );
  } catch (err) {
    console.error('Webhook signature verification failed:', err.message);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  // Handle successful checkout sessions
  if (event.type === 'checkout.session.completed') {
    const session = event.data.object;
    
    // Extract customer details from the Stripe session
    const customerEmail = session.customer_details?.email || session.customer_email;
    const customerName = session.customer_details?.name || 'Guest';

    // Fetch line items to dynamically get the name of the room they booked
    let roomName = 'Your Hotel Room';
    try {
      const lineItems = await stripe.checkout.sessions.listLineItems(session.id);
      if (lineItems.data.length > 0) {
        roomName = lineItems.data[0].description;
      }
    } catch (e) {
      console.error('Error fetching line items:', e);
    }

    if (customerEmail) {
      try {
        // Dispatch the email via Resend
        await resend.emails.send({
          // NOTE: 'onboarding@resend.dev' can only send to your own registered email address for testing.
          // Once you verify a domain in Resend, change this to something like 'booking@anthonyandkosha.com'
          from: 'Wedding Reservations <onboarding@resend.dev>',
          to: [customerEmail],
          subject: `Booking Confirmed: ${roomName}`,
          html: `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; color: #333;">
              <h2 style="color: #6a1a41;">Booking Confirmed!</h2>
              <p>Dear ${customerName},</p>
              <p>Thank you for booking your stay for Anthony & Kosha's wedding celebration in Dubai.</p>
              
              <div style="background-color: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0; border: 1px solid #e9ecef;">
                <p style="margin: 0; font-size: 16px;"><strong>Room:</strong> ${roomName}</p>
                <p style="margin: 10px 0 0 0; font-size: 16px;"><strong>Payment Status:</strong> Paid in Full</p>
              </div>
              
              <p>We are absolutely thrilled to celebrate with you soon!</p>
              <br/>
              <p>Warm regards,</p>
              <p><strong>Anthony & Kosha</strong></p>
            </div>
          `
        });
        console.log('Confirmation email successfully sent to', customerEmail);
      } catch (error) {
        console.error('Error sending email via Resend:', error);
        return res.status(500).json({ error: 'Failed to send confirmation email' });
      }
    }
  }

  // Acknowledge receipt of the event to Stripe
  res.status(200).json({ received: true });
}
