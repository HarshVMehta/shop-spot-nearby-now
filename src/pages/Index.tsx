
import React from "react";
import { Navbar } from "@/components/Navbar";
import ProductGrid from "@/components/ProductGrid";
import Hero from "@/components/Hero";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <Hero />
      <main className="flex-grow container mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold mb-6">Featured Products</h1>
        <ProductGrid />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
