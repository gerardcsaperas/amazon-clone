import React from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";
import Image from "next/image";
const Banner = () => {
  return (
    <div className="relative">
      <div className="absolute w-full h-32 bg-gradient-to-t from-gray-100 to-transparent bottom-0 z-20" />
      <Carousel
        autoPlay
        infiniteLoop
        showStatus={false}
        showIndicators={false}
        showArrows={false}
        showThumbs={false}
        interval={5000}
      >
        <img loading="lazy" src="https://links.papareact.com/gi1" />
        <img loading="lazy" src="https://links.papareact.com/6ff" />
        <img loading="lazy" src="https://links.papareact.com/7ma" />
      </Carousel>
    </div>
  );
};

export default Banner;
