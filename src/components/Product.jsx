import React from "react";
import Image from "next/image";
import { StarIcon } from "@heroicons/react/solid";
import Currency from "react-currency-formatter";

const Product = ({ id, title, price, description, category, image }) => {
  const rating = Math.floor(Math.random() * 5 + 1);
  const hasPrime = Math.random() > 0.5;
  return (
    <div className="relative flex flex-col m-5 bg-white z-30 p-10">
      <p className="absolute top-2 right-2 text-xs italic text-gray-400 link">
        {category}
      </p>

      <Image src={image} height={200} width={200} objectFit="contain"></Image>

      <h4 className="my-3">{title}</h4>

      <div className="flex">
        {Array(rating)
          .fill()
          .map((_, i) => (
            <StarIcon key={i} className="h-5 text-yellow-500" />
          ))}
      </div>

      <p className="text-xs my-2 line-clamp-2">{description}</p>

      <Currency className="mb-5" quantity={price} currency={"EUR"}></Currency>

      {hasPrime && (
        <div className="flex items-center space-x-2 mt-5">
          <img
            className="w-12"
            src="https://links.papareact.com/fdw"
            alt="Prime logo indicating that the product has Prime Delivery"
          />
          <p className="text-xs text-gray-500">FREE Next-day Delivery</p>
        </div>
      )}

      <button className="mt-auto button">Add to basket</button>
    </div>
  );
};

export default Product;
