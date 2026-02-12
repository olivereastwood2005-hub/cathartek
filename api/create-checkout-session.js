const Stripe = require('stripe');

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: '2023-10-16',
});

module.exports = async (req, res) => {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const {
      email,
      phone,
      name,
      address,
      address2,
      city,
      postcode,
      country,
      items,
    } = req.body || {};

    if (
      !email ||
      !name ||
      !address ||
      !city ||
      !postcode ||
      !country ||
      !Array.isArray(items) ||
      items.length === 0
    ) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    const origin = req.headers.origin || `https://${req.headers.host}`;

    const line_items = items.map((item) => ({
      quantity: item.qty || 1,
      price_data: {
        currency: 'gbp',
        product_data: {
          name: item.name || 'Item',
        },
        unit_amount: Math.round((item.price || 0) * 100),
      },
    }));

    const session = await stripe.checkout.sessions.create({
      mode: 'payment',
      payment_method_types: ['card'],
      customer_email: email,
      line_items,
      shipping_address_collection: {
        allowed_countries: ['GB'],
      },
      metadata: {
        customer_phone: phone || '',
        customer_name: name,
        address_line1: address,
        address_line2: address2 || '',
        city,
        postcode,
        country,
      },
      success_url: `${origin}/thank-you.html?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/checkout.html`,
    });

    return res.status(200).json({ url: session.url });
  } catch (error) {
    console.error('Stripe checkout error:', error);
    return res.status(500).json({ error: 'Unable to create checkout session' });
  }
};

