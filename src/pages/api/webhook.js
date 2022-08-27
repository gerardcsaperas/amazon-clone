/** File for Strapi's webhook */
import { buffer } from "micro";
import * as admin from "firebase-admin";

// Secure a connection to firebase from the backend
const serviceAccount = require("../../../firebase-permissions.json");
const app =
  !admin.apps.length ?
    admin.initializeApp({
      credential: admin.credential.cert(serviceAccount)
    }) :
    admin.app()

// Establish connection to Stripe
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const endpointSecret = process.env.STRIPE_SIGNING_SECRET;

export default async function (req, res) {
  if (req.method === "POST") {
    const reqBuffer = await buffer(req);
    const payload = reqBuffer.toString();
    const signature = req.headers["stripe-signature"];

    let event;

    // Verify that the event posted came from stripe
    try {
      event = stripe.webhooks.constructEvent(payload, signature, endpointSecret)
    } catch (e) {
      const msg = `Webhook error: ${e.message}`;
      console.log(msg);
      return res.status(e.code || 500).send(msg)
    }

    // Handle the checkout session completed event
    if (event.type === "checkout.session.completed") {
      const session = event.data.object;

      try {
        // Fulfill the order
        await fulfillOrder(session)
        return res.status(200).send()
      } catch (e) {
        const msg = `There was an error fulfilling the order. Error: ${e.message}`;
        console.log(msg);
        return res.status(e.code || 500).send(msg);
      }
    }
  }
}

const fulfillOrder = async (session) => {
  return app
    .firestore()
    .collection('users')
    .doc(session.metadata.email)
    .collection("orders")
    .doc(session.id)
    .set({
      amount: session.amount_total / 100,
      amount_shipping: session.total_details.amount_shipping / 100,
      images: JSON.parse(session.metadata.images),
      timestamp: admin.firestore.FieldValue.serverTimestamp()
    }).then(() => {
      console.log(`Order ${session.id} has been added to the database.`)
    })
}

export const config = {
  api: {
    // When we handle a webhook we don't want `bodyParser` enabled
    bodyParser: false,
    // Externally resolved, not by us
    externalResolver: true
  }
}