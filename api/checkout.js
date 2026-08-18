import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  try {
    const { 
      roomName, priceNum, nights, roomQuantity, customerEmail, customerName,
      hotelName, phone, guestCount, bedPreference, checkIn, checkOut, requests
    } = req.body;

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
      metadata: {
        hotelName: hotelName || '',
        roomName: roomName || '',
        guestName: customerName || '',
        email: customerEmail || '',
        phone: phone || '',
        guestCount: guestCount || '',
        bedPreference: bedPreference || '',
        checkIn: checkIn || '',
        checkOut: checkOut || '',
        // Truncate requests if too long (Stripe limit is 500 chars)
        requests: (requests || '').substring(0, 499),
      },
      line_items: [
        {
          price_data: {
            currency: 'aed',
            // Total per room for the entire stay (in fils)
            unit_amount: priceNum * nights * 100, 
            product_data: {
              name: roomName,
              description: `${nights} Night(s) Stay with Breakfast for Anthony & Kosha's Wedding`,
            },
          },
          quantity: roomQuantity || 1,
        },
        {
          price_data: {
            currency: 'aed',
            // 4.5% card processing fee on the subtotal (in fils)
            unit_amount: Math.ceil(priceNum * nights * (roomQuantity || 1) * 0.045 * 100), 
            product_data: {
              name: 'Card Processing Fee (4.5%)',
              description: 'Standard secure payment gateway fee',
            },
          },
          quantity: 1,
        }
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
