import React from "react";
import Image from "next/image";
import logo from "../assets/logo.png";
import {
  MenuIcon,
  SearchIcon,
  ShoppingCartIcon,
} from "@heroicons/react/outline";
import { signIn, signOut, useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import { selectItems } from "../slices/basketSlice";

const Header = () => {
  const items = useSelector(selectItems);

  const router = useRouter();
  const session = useSession();
  const isAuthenticated = session?.status === "authenticated";

  const navigateCheckout = () => {
    isAuthenticated ? router.push("/checkout") : signIn();
  };

  return (
    <header>
      {/* Top Nav */}
      <div className="flex items-center bg-amazon_blue p-1 flex-grow py-2">
        {/* Logo */}
        <div
          className="mt-2 flex items-center flex-grow sm:flex-grow-0"
          onClick={() => router.push("/")}
        >
          <Image
            src={logo}
            width={150}
            height={40}
            objectFit="contain"
            className="cursor-pointer"
          />
        </div>
        {/* Search Bar */}
        <div className="hidden sm:flex items-center h-10 rounded-md flex-grow bg-yellow-400 hover:bg-yellow-500">
          <input
            type="text"
            className="p-2 h-full w-6 flex-grow rounded-l-md focus:outline-none"
          />
          <SearchIcon className="h-12 p-4 cursor-pointer" />
        </div>
        {/* Right Side */}
        <div className="text-white flex items-center text-xs space-x-6 mx-6 whitespace-nowrap">
          {/* Account & Lists */}
          <div
            onClick={!isAuthenticated ? signIn : signOut}
            className="flex-1 link "
          >
            {isAuthenticated ? <p>Hello Gerard C. Saperas</p> : <p>Sign in</p>}
            <p className="font-extrabold md:text-sm">Account & Lists</p>
          </div>
          {/* Returns & Orders */}
          <div className="flex-1 link ">
            <p>Returns</p>
            <p className="font-extrabold md:text-sm">& Orders</p>
          </div>
          {/* Basket */}
          <div
            onClick={() => navigateCheckout()}
            className="flex-1 link relative flex items-center"
          >
            <span className="absolute top-0 lg:right-10 right-0 bg-yellow-400 h-4 w-4 text-center rounded-full text-black font-bold">
              {items.length}
            </span>
            <ShoppingCartIcon className="h-10" />
            <p className="hidden lg:block font-extrabold text-sm mt-2">
              Basket
            </p>
          </div>
        </div>
      </div>
      {/* Bottom Nav */}
      <div className="flex items-center space-x-3 p-2 pl-6 bg-amazon_blue-light text-white text-sm">
        <p className="link flex items-center">
          <MenuIcon className="h-6 mr-1" />
          All
        </p>
        <p className="link">Prime Video</p>
        <p className="link">Amazon Business</p>
        <p className="link">Today's Deals</p>
        <p className="link hidden lg:inline-flex">Electronics</p>
        <p className="link hidden lg:inline-flex">Food & Grocery</p>
        <p className="link hidden lg:inline-flex">Prime</p>
        <p className="link hidden lg:inline-flex">Buy Again</p>
        <p className="link hidden lg:inline-flex">Shopper Toolkit</p>
        <p className="link hidden lg:inline-flex">Health & Personal Care</p>
      </div>
    </header>
  );
};

export default Header;
