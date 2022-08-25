import React, { useEffect } from "react";
import Header from "../components/Header";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import Image from "next/image";
import { useDispatch, useSelector } from "react-redux";
import { selectItems, removeFromBasket } from "../slices/basketSlice";
import CheckoutProduct from "../components/CheckoutProduct";
const Checkout = () => {
  const dispatch = useDispatch();
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
    <div>
      <Header />
      <main className="lg:flex max-w-screen-2xl mx-auto">
        {/* Left Section */}
        <div className="flex-grow my-5 shadow-sm">
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

        {/* Right Section */}
        <div></div>
      </main>
    </div>
  );
};

export default Checkout;
