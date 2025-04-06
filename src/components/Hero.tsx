
import React from "react";
import { Button } from "@/components/ui/button";

const Hero = () => {
  return (
    <div className="relative bg-gradient-to-r from-blue-900 to-blue-700 text-white">
      <div className="container mx-auto px-6 py-12 md:py-24 flex flex-col md:flex-row items-center">
        <div className="md:w-1/2 text-center md:text-left mb-8 md:mb-0">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Discover Amazing Deals
          </h1>
          <p className="text-lg md:text-xl mb-6 text-blue-100">
            Shop the latest products at unbeatable prices with fast shipping and easy returns.
          </p>
          <div className="space-x-4">
            <Button size="lg" className="bg-yellow-400 text-black hover:bg-yellow-300">
              Shop Now
            </Button>
            <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
              Learn More
            </Button>
          </div>
        </div>
        <div className="md:w-1/2">
          <img
            src="https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?auto=format&fit=crop&q=80"
            alt="Shopping"
            className="rounded-lg shadow-xl"
          />
        </div>
      </div>
    </div>
  );
};

export default Hero;
