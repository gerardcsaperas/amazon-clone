import React from "react";
import Header from "../components/Header";
import { useSession, getSession } from "next-auth/react";
import { db } from "../firebase";
import moment from "moment";
import Order from "../components/Order";

export default function Orders({ orders }) {
  const session = useSession();
  const isAuthenticated = session.status === "authenticated";

  return (
    <div>
      <Header />
      <main className="max-w-screen-lg bg-gray-100 mx-auto p-10 min-h-screen">
        <h1 className="text-3xl border-b mb-2 pb-1 border-yellow-400">
          Your Orders
        </h1>

        {isAuthenticated ? (
          <h2>
            {orders.length} Order{orders.length > 1 && "s"}
          </h2>
        ) : (
          <h2>Please sign in to see your orders.</h2>
        )}

        <div className="mt-5 space-y-4">
          {orders.map((order, i) => (
            <Order key={`Order-${i}`} {...order} />
          ))}
        </div>
      </main>
    </div>
  );
}

export async function getServerSideProps(context) {
  const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
  // Get user
  const session = await getSession(context);

  if (!session) {
    return {
      props: {},
    };
  }

  // Firebase orders
  const databaseOrders = await db
    .collection("users")
    .doc(session.user.email)
    .collection("orders")
    .orderBy("timestamp", "desc")
    .get();

  // Stripe orders
  const orders = await Promise.all(
    databaseOrders.docs.map(async (order) => ({
      id: order.id,
      amount: order.data().amount,
      amountShipping: order.data().amount_shipping,
      images: order.data().images,
      timestamp: moment(order.data().timestamp.toDate()).unix(),
      items: (
        await stripe.checkout.sessions.listLineItems(order.id, {
          limit: 100,
        })
      ).data,
    }))
  );

  return {
    props: {
      orders,
      session,
    },
  };
}
