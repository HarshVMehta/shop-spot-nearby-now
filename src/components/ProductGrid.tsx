
import React from "react";
import { Link } from "react-router-dom";
import { Star } from "lucide-react";
import { products } from "@/data/products";
import { Card, CardContent } from "@/components/ui/card";

const ProductGrid = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
      {products.map((product) => (
        <Link to={`/product/${product.id}`} key={product.id}>
          <Card className="h-full hover:shadow-md transition-shadow">
            <div className="aspect-square overflow-hidden">
              <img
                src={product.image}
                alt={product.title}
                className="w-full h-full object-contain p-4"
              />
            </div>
            <CardContent className="p-4">
              <h3 className="text-sm font-medium line-clamp-2 mb-1">
                {product.title}
              </h3>
              <div className="flex items-center mb-1">
                {Array(5)
                  .fill(null)
                  .map((_, i) => (
                    <Star
                      key={i}
                      size={14}
                      className={`${
                        i < Math.floor(product.rating)
                          ? "text-yellow-400 fill-yellow-400"
                          : "text-gray-300"
                      }`}
                    />
                  ))}
                <span className="text-xs text-gray-500 ml-1">
                  ({product.ratings})
                </span>
              </div>
              <div className="flex items-baseline">
                <span className="font-bold">${product.price.toFixed(2)}</span>
                {product.originalPrice && (
                  <span className="text-xs text-gray-500 line-through ml-2">
                    ${product.originalPrice.toFixed(2)}
                  </span>
                )}
              </div>
            </CardContent>
          </Card>
        </Link>
      ))}
    </div>
  );
};

export default ProductGrid;
