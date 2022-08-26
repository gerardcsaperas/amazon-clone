const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

export default async function (req, res) {
  if (req.method === 'POST') {

    try {

      const { email, items } = req.body;

      if (!email || !items) {

        res.status(400).send('Please provide your email and at least one item.')
        return;
      }
      // Transform `items` to what Stripe expects
      const transformedItems = items.map(item => (
        {
          quantity: 1,
          price_data: {
            currency: 'EUR',
            unit_amount: item.price * 100,
            product_data: {
              name: item.title,
              images: [item.image]
            }
          },
          description: item.description
        }
      ))

      // Create Checkout Sessions from body params.
      const session = await stripe.checkout.sessions.create({
        payment_method_types: ["card"],
        shipping_rates: ["shr_1Law7TAhsXSRq7ctY02a0QwA"],
        shipping_address_collection: {
          allowed_countries: ['ES', 'US', 'CA', 'JP']
        },
        line_items: transformedItems,
        mode: 'payment',
        success_url: `${process.env.HOST}/payment-success`,
        cancel_url: `${process.env.HOST}/checkout`,
        metadata: {
          email,
          images: JSON.stringify(
            items.map(item => item.image)
          )
        }
      });

      res.status(200).json({ id: session.id })

    } catch (err) {
      console.log('here', err)
      res.status(err.statusCode || 500).json(err.message);
    }

  } else {
    res.setHeader('Allow', 'POST');
    res.status(405).end('Method Not Allowed');
  }
}