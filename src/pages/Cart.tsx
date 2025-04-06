
import React from "react";
import { Link } from "react-router-dom";
import { Navbar } from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { X, Trash, ShoppingBag, ArrowLeft } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

// Mock cart data
const cartItems = [
  {
    id: 1,
    title: "Wireless Noise Cancelling Headphones",
    price: 299.99,
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e",
    quantity: 1
  },
  {
    id: 4,
    title: "Premium Coffee Maker",
    price: 149.99,
    image: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085",
    quantity: 2
  }
];

const Cart = () => {
  const { toast } = useToast();
  
  const handleRemoveItem = (id: number) => {
    toast({
      title: "Item Removed",
      description: "Item has been removed from your cart",
    });
  };
  
  const handleUpdateQuantity = (id: number, newQuantity: number) => {
    if (newQuantity < 1) return;
    toast({
      title: "Quantity Updated",
      description: "Cart has been updated",
    });
  };

  const calculateSubtotal = () => {
    return cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  const calculateTax = () => {
    return calculateSubtotal() * 0.1; // 10% tax
  };

  const calculateTotal = () => {
    return calculateSubtotal() + calculateTax();
  };
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold">Your Shopping Cart</h1>
          <Link to="/" className="text-blue-600 hover:underline inline-flex items-center mt-2">
            <ArrowLeft size={16} className="mr-1" />
            Continue Shopping
          </Link>
        </div>
        
        {cartItems.length > 0 ? (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <div className="bg-white rounded-lg border">
                {cartItems.map((item, index) => (
                  <React.Fragment key={item.id}>
                    <div className="flex p-4 md:p-6">
                      <div className="w-20 h-20 md:w-24 md:h-24 flex-shrink-0">
                        <img 
                          src={item.image} 
                          alt={item.title} 
                          className="w-full h-full object-contain"
                        />
                      </div>
                      <div className="ml-4 flex-grow">
                        <div className="flex justify-between">
                          <Link to={`/product/${item.id}`} className="font-medium hover:text-blue-600">
                            {item.title}
                          </Link>
                          <button 
                            onClick={() => handleRemoveItem(item.id)}
                            className="text-gray-400 hover:text-red-500"
                          >
                            <X size={18} />
                          </button>
                        </div>
                        <div className="mt-2 flex flex-wrap items-end justify-between gap-2">
                          <div className="flex items-center border rounded">
                            <button 
                              className="px-2 py-1 hover:bg-gray-100"
                              onClick={() => handleUpdateQuantity(item.id, item.quantity - 1)}
                            >
                              -
                            </button>
                            <span className="px-4 py-1 border-x">{item.quantity}</span>
                            <button 
                              className="px-2 py-1 hover:bg-gray-100"
                              onClick={() => handleUpdateQuantity(item.id, item.quantity + 1)}
                            >
                              +
                            </button>
                          </div>
                          <div className="font-medium">${(item.price * item.quantity).toFixed(2)}</div>
                        </div>
                      </div>
                    </div>
                    {index < cartItems.length - 1 && <Separator />}
                  </React.Fragment>
                ))}
              </div>
              <div className="mt-4 flex">
                <Button 
                  variant="outline" 
                  className="text-red-500 flex items-center gap-2"
                  onClick={() => toast({ title: "Cart Cleared", description: "All items have been removed" })}
                >
                  <Trash size={16} />
                  Clear Cart
                </Button>
              </div>
            </div>
            
            <div className="lg:col-span-1">
              <div className="bg-white rounded-lg border p-6">
                <h2 className="text-xl font-bold mb-4">Order Summary</h2>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span>Subtotal ({cartItems.reduce((sum, item) => sum + item.quantity, 0)} items)</span>
                    <span>${calculateSubtotal().toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Tax</span>
                    <span>${calculateTax().toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Shipping</span>
                    <span>Free</span>
                  </div>
                  <Separator />
                  <div className="flex justify-between font-bold">
                    <span>Total</span>
                    <span>${calculateTotal().toFixed(2)}</span>
                  </div>
                </div>
                <Button
                  className="w-full mt-6 bg-yellow-400 text-black hover:bg-yellow-300"
                  onClick={() => toast({ title: "Order Placed!", description: "Your order has been placed successfully" })}
                >
                  Proceed to Checkout
                </Button>
                <div className="mt-4 text-sm text-gray-500 text-center">
                  Secure checkout powered by Stripe
                </div>
              </div>
              
              <div className="bg-white rounded-lg border p-6 mt-4">
                <h3 className="font-semibold mb-2">Accepted Payment Methods</h3>
                <div className="flex flex-wrap gap-2">
                  {["Visa", "Mastercard", "Amex", "PayPal"].map((method) => (
                    <div key={method} className="bg-gray-100 px-3 py-1 rounded text-sm">
                      {method}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="text-center py-12">
            <div className="mx-auto w-20 h-20 text-gray-400 mb-4">
              <ShoppingBag size={80} />
            </div>
            <h2 className="text-2xl font-bold mb-2">Your cart is empty</h2>
            <p className="text-gray-600 mb-6">Looks like you haven't added anything to your cart yet.</p>
            <Link to="/">
              <Button>Start Shopping</Button>
            </Link>
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
};

export default Cart;
