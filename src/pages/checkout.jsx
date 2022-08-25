import React, { useEffect } from "react";
import Header from "../components/Header";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import Image from "next/image";
import { useSelector } from "react-redux";
import { selectItems, selectTotal } from "../slices/basketSlice";
import CheckoutProduct from "../components/CheckoutProduct";
import Currency from "react-currency-formatter";
const Checkout = () => {
  const totalPrice = useSelector(selectTotal);
  const items = useSelector(selectItems);
  const router = useRouter();
  const session = useSession();
  const isAuthenticated = session.status === "authenticated";

  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/");
    }
  }, []);

  return (
    <div className="bg-gray-100">
      <Header />
      <main className="lg:flex max-w-screen-2xl mx-auto p-5">
        <div>
          {/* Left Section */}
          <div className="flex-grow mb-5 shadow-sm">
            <Image
              src="https://links.papareact.com/ikj"
              width={1020}
              height={250}
              objectFit="contain"
            />
          </div>

          <div className="flex flex-col p-5 space-y-10 bg-white">
            <h1 className="text-3xl border-b pb-4">
              {items.length === 0
                ? "No items on your shopping basket"
                : "Your shopping basket"}
            </h1>

            {items.map((item, index) => (
              <CheckoutProduct key={`CheckoutProduct-${index}`} {...item} />
            ))}
          </div>
        </div>

        {/* Right Section */}
        {items.length > 0 && (
          <div className="flex flex-col bg-white p-10 shadow-md lg:ml-5 lg:mt-0 sm:mt-5">
            <h2 className="whitespace-nowrap">
              Subtotal ({items.length} items):{" "}
              <span className="font-bold">
                <Currency quantity={totalPrice} currency="EUR" />
              </span>
            </h2>
            <button className="button">Checkout</button>
          </div>
        )}
      </main>
    </div>
  );
};

export default Checkout;
