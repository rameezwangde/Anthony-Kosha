import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  try {
    const { roomName, priceNum, nights, customerEmail, customerName } = req.body;

    // Validate required fields
    if (!roomName || !priceNum || !nights || !customerEmail) {
      return res.status(400).json({ error: 'Missing required checkout parameters' });
    }

    const origin = req.headers.origin || 'https://anthonyandkosha.com'; // Fallback if origin is missing

    // Create Stripe Checkout Session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      customer_email: customerEmail,
      client_reference_id: customerName,
      line_items: [
        {
          price_data: {
            currency: 'aed',
            // Stripe expects amount in smallest currency unit (fils). So 800 AED = 80000
            unit_amount: priceNum * 100, 
            product_data: {
              name: roomName,
              description: `${nights} Night(s) Stay for Anthony & Kosha's Wedding`,
            },
          },
          quantity: nights,
        },
      ],
      mode: 'payment',
      success_url: `${origin}/?booking=success`,
      cancel_url: `${origin}/`,
    });

    // Return the checkout URL to the frontend
    res.status(200).json({ url: session.url });
  } catch (error) {
    console.error('Error creating Stripe checkout session:', error);
    res.status(500).json({ error: 'Failed to create checkout session' });
  }
}
