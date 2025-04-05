
import React from 'react';
import { MapPin } from 'lucide-react';
import { Button } from "@/components/ui/button";

const Navbar = () => {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-2">
          <MapPin size={24} className="text-shopfinder-500" />
          <span className="text-xl font-bold">ShopFinder</span>
        </div>
        <div className="flex items-center gap-4">
          <Button variant="outline">Sign In</Button>
          <Button className="bg-shopfinder-500 hover:bg-shopfinder-600">Sign Up</Button>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
