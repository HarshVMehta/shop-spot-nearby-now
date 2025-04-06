
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { 
  Search, 
  ShoppingCart, 
  User, 
  Heart, 
  Menu, 
  X, 
  ChevronDown 
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export const Navbar = () => {
  const { toast } = useToast();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      toast({
        title: "Search",
        description: `Searching for: ${searchQuery}`,
      });
    }
  };
  
  const categories = [
    "Electronics", 
    "Home & Kitchen", 
    "Books", 
    "Fashion", 
    "Toys & Games", 
    "Beauty", 
    "Sports", 
    "Furniture"
  ];

  return (
    <header className="bg-gray-900 text-white sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center h-16">
          {/* Mobile Menu Button */}
          <button 
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="mr-2 md:hidden"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
          
          {/* Logo */}
          <Link to="/" className="flex items-center mr-4">
            <span className="text-xl font-bold bg-gradient-to-r from-yellow-400 to-yellow-200 text-transparent bg-clip-text">
              ShopSmart
            </span>
          </Link>
          
          {/* Search Bar */}
          <div className="flex-grow hidden md:block">
            <form onSubmit={handleSearch} className="relative">
              <div className="flex">
                <Input
                  type="text"
                  placeholder="Search products..."
                  className="w-full border-none rounded-l-md text-gray-900 h-10"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <Button 
                  type="submit"
                  className="bg-yellow-400 hover:bg-yellow-300 text-black rounded-l-none rounded-r-md px-4"
                >
                  <Search size={20} />
                </Button>
              </div>
            </form>
          </div>
          
          {/* Navigation Icons */}
          <div className="flex items-center space-x-4 ml-4">
            <Link to="/account" className="hidden sm:flex flex-col items-center text-xs">
              <User size={20} />
              <span>Account</span>
            </Link>
            <Link to="/wishlist" className="hidden sm:flex flex-col items-center text-xs">
              <Heart size={20} />
              <span>Wishlist</span>
            </Link>
            <Link to="/cart" className="flex flex-col items-center text-xs relative">
              <ShoppingCart size={20} />
              <span className="absolute -top-1 -right-1 bg-yellow-400 text-black text-xs rounded-full h-5 w-5 flex items-center justify-center">
                0
              </span>
              <span>Cart</span>
            </Link>
          </div>
        </div>
        
        {/* Categories Bar - Desktop */}
        <nav className="hidden md:flex text-sm border-t border-gray-700 py-2 overflow-x-auto">
          {categories.map((category) => (
            <Link 
              key={category} 
              to={`/category/${category.toLowerCase().replace(/\s+/g, '-')}`}
              className="px-3 py-1 whitespace-nowrap hover:text-yellow-300"
            >
              {category}
            </Link>
          ))}
          <div className="px-3 py-1 flex items-center cursor-pointer hover:text-yellow-300">
            <span>More</span>
            <ChevronDown size={16} className="ml-1" />
          </div>
        </nav>
      </div>
      
      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-gray-800 absolute w-full z-50">
          <div className="p-4">
            <form onSubmit={handleSearch} className="mb-4">
              <div className="flex">
                <Input
                  type="text"
                  placeholder="Search products..."
                  className="w-full border-none rounded-l-md text-gray-900"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <Button 
                  type="submit"
                  className="bg-yellow-400 hover:bg-yellow-300 text-black rounded-l-none rounded-r-md px-4"
                >
                  <Search size={20} />
                </Button>
              </div>
            </form>
            <div className="space-y-2">
              <Link 
                to="/account" 
                className="flex items-center space-x-2 p-2 hover:bg-gray-700 rounded"
                onClick={() => setIsMenuOpen(false)}
              >
                <User size={20} />
                <span>Account</span>
              </Link>
              <Link 
                to="/wishlist" 
                className="flex items-center space-x-2 p-2 hover:bg-gray-700 rounded"
                onClick={() => setIsMenuOpen(false)}
              >
                <Heart size={20} />
                <span>Wishlist</span>
              </Link>
              <div className="border-t border-gray-700 my-2"></div>
              <div className="font-medium">Categories</div>
              {categories.map((category) => (
                <Link 
                  key={category}
                  to={`/category/${category.toLowerCase().replace(/\s+/g, '-')}`}
                  className="block p-2 hover:bg-gray-700 rounded"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {category}
                </Link>
              ))}
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
