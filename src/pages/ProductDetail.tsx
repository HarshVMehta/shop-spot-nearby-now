
import React, { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Navbar } from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Star, MinusCircle, PlusCircle, Truck, ArrowLeft, ShoppingCart, Heart } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { products } from "@/data/products";

const ProductDetail = () => {
  const { id } = useParams<{ id: string }>();
  const { toast } = useToast();
  const [quantity, setQuantity] = useState(1);

  const product = products.find((p) => p.id === Number(id));

  if (!product) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <div className="flex-grow container mx-auto px-4 py-8 text-center">
          <h1 className="text-2xl font-bold mb-4">Product Not Found</h1>
          <p className="mb-6">Sorry, we couldn't find the product you're looking for.</p>
          <Link to="/">
            <Button className="inline-flex items-center">
              <ArrowLeft size={16} className="mr-2" />
              Back to Home
            </Button>
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  const handleAddToCart = () => {
    toast({
      title: "Added to Cart",
      description: `${quantity} × ${product.title} added to your cart`,
    });
  };

  const handleAddToWishlist = () => {
    toast({
      title: "Added to Wishlist",
      description: `${product.title} has been added to your wishlist`,
    });
  };

  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const increaseQuantity = () => {
    if (quantity < product.stock) {
      setQuantity(quantity + 1);
    } else {
      toast({
        title: "Maximum Quantity Reached",
        description: `Sorry, only ${product.stock} items are available.`,
        variant: "destructive",
      });
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow container mx-auto px-4 py-8">
        <Link to="/" className="inline-flex items-center text-blue-600 mb-6 hover:underline">
          <ArrowLeft size={16} className="mr-1" />
          Back to products
        </Link>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Product Image */}
          <div className="bg-white p-6 rounded-lg border border-gray-200">
            <div className="aspect-square flex items-center justify-center">
              <img
                src={product.image}
                alt={product.title}
                className="max-h-full max-w-full object-contain"
              />
            </div>
          </div>

          {/* Product Details */}
          <div>
            <h1 className="text-2xl md:text-3xl font-bold mb-2">{product.title}</h1>

            {/* Ratings */}
            <div className="flex items-center mb-4">
              {Array(5)
                .fill(null)
                .map((_, i) => (
                  <Star
                    key={i}
                    size={18}
                    className={`${
                      i < Math.floor(product.rating)
                        ? "text-yellow-400 fill-yellow-400"
                        : "text-gray-300"
                    }`}
                  />
                ))}
              <span className="ml-2 text-sm text-gray-600">
                {product.rating} ({product.ratings} ratings)
              </span>
            </div>

            {/* Price */}
            <div className="mb-4">
              <span className="text-3xl font-bold">${product.price.toFixed(2)}</span>
              {product.originalPrice && (
                <>
                  <span className="text-gray-500 line-through ml-2">
                    ${product.originalPrice.toFixed(2)}
                  </span>
                  <span className="text-green-600 ml-2">
                    Save ${(product.originalPrice - product.price).toFixed(2)}
                  </span>
                </>
              )}
            </div>

            {/* Description */}
            <p className="text-gray-700 mb-6">{product.description}</p>

            {/* Stock Status */}
            <div className="mb-4">
              {product.stock > 0 ? (
                <div className="text-green-600 flex items-center">
                  <span className="inline-block w-2 h-2 bg-green-600 rounded-full mr-2"></span>
                  In Stock ({product.stock} available)
                </div>
              ) : (
                <div className="text-red-600 flex items-center">
                  <span className="inline-block w-2 h-2 bg-red-600 rounded-full mr-2"></span>
                  Out of Stock
                </div>
              )}
            </div>

            {/* Quantity Selector */}
            <div className="flex items-center mb-6">
              <span className="mr-4">Quantity:</span>
              <div className="flex items-center border rounded-md">
                <button
                  onClick={decreaseQuantity}
                  className="px-3 py-1 hover:bg-gray-100 text-gray-600"
                  disabled={quantity <= 1}
                >
                  <MinusCircle size={18} />
                </button>
                <span className="px-4 py-1 border-x">{quantity}</span>
                <button
                  onClick={increaseQuantity}
                  className="px-3 py-1 hover:bg-gray-100 text-gray-600"
                  disabled={quantity >= product.stock}
                >
                  <PlusCircle size={18} />
                </button>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-3">
              <Button
                onClick={handleAddToCart}
                className="flex-grow bg-yellow-400 text-black hover:bg-yellow-300 flex items-center justify-center"
                disabled={product.stock === 0}
              >
                <ShoppingCart className="mr-2" size={20} />
                Add to Cart
              </Button>
              <Button
                onClick={handleAddToWishlist}
                variant="outline"
                className="flex-grow flex items-center justify-center"
              >
                <Heart className="mr-2" size={20} />
                Add to Wishlist
              </Button>
            </div>

            {/* Shipping Info */}
            <div className="mt-8 border-t pt-4">
              <div className="flex items-start space-x-3">
                <Truck size={20} className="text-gray-600 mt-0.5" />
                <div>
                  <p className="font-medium">Free Shipping</p>
                  <p className="text-sm text-gray-600">
                    Delivery expected within 2-4 business days
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ProductDetail;
