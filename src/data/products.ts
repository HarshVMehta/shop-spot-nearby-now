
export interface Product {
  id: number;
  title: string;
  description: string;
  price: number;
  originalPrice?: number;
  image: string;
  category: string;
  rating: number;
  ratings: number;
  stock: number;
}

export const products: Product[] = [
  {
    id: 1,
    title: "Wireless Noise Cancelling Headphones",
    description: "Premium wireless headphones with industry-leading noise cancellation, exceptional sound quality, and long battery life.",
    price: 299.99,
    originalPrice: 349.99,
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e",
    category: "Electronics",
    rating: 4.8,
    ratings: 2457,
    stock: 50
  },
  {
    id: 2,
    title: "Ultra HD Smart TV 55-inch",
    description: "Crystal clear 4K display with smart features, multiple voice assistants and streaming apps built-in.",
    price: 499.99,
    originalPrice: 599.99,
    image: "https://images.unsplash.com/photo-1593305841991-05c297ba4575",
    category: "Electronics",
    rating: 4.5,
    ratings: 1853,
    stock: 30
  },
  {
    id: 3,
    title: "Professional Digital Camera",
    description: "High-resolution sensor, 4K video recording, advanced autofocus system and weather-sealed body.",
    price: 1299.99,
    image: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32",
    category: "Electronics",
    rating: 4.7,
    ratings: 942,
    stock: 15
  },
  {
    id: 4,
    title: "Premium Coffee Maker",
    description: "Programmable coffee maker with built-in grinder, temperature control, and multiple brewing options.",
    price: 149.99,
    originalPrice: 189.99,
    image: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085",
    category: "Home & Kitchen",
    rating: 4.6,
    ratings: 1328,
    stock: 45
  },
  {
    id: 5,
    title: "Ergonomic Office Chair",
    description: "Adjustable height, lumbar support, breathable mesh back and premium cushioning for all-day comfort.",
    price: 249.99,
    image: "https://images.unsplash.com/photo-1505843513577-22bb7d21e455",
    category: "Furniture",
    rating: 4.4,
    ratings: 879,
    stock: 25
  },
  {
    id: 6,
    title: "Robot Vacuum Cleaner",
    description: "Smart navigation, powerful suction, auto-recharge, and app control for effortless cleaning.",
    price: 279.99,
    originalPrice: 329.99,
    image: "https://images.unsplash.com/photo-1518640467707-6811f4a6ab73",
    category: "Home & Kitchen",
    rating: 4.3,
    ratings: 1562,
    stock: 40
  },
  {
    id: 7,
    title: "Stainless Steel Cookware Set",
    description: "10-piece premium cookware set with even heat distribution, durable construction, and dishwasher safe.",
    price: 199.99,
    originalPrice: 249.99,
    image: "https://images.unsplash.com/photo-1584447128309-b66b7a4d1b63",
    category: "Home & Kitchen",
    rating: 4.6,
    ratings: 987,
    stock: 35
  },
  {
    id: 8,
    title: "Wireless Earbuds",
    description: "True wireless earbuds with premium sound, active noise cancellation, and long battery life.",
    price: 129.99,
    image: "https://images.unsplash.com/photo-1606220588913-b3aacb4d2f37",
    category: "Electronics",
    rating: 4.4,
    ratings: 2154,
    stock: 75
  },
  {
    id: 9,
    title: "Smart Fitness Watch",
    description: "Advanced health and fitness tracking, GPS, heart rate monitor, and smartphone notifications.",
    price: 199.99,
    originalPrice: 229.99,
    image: "https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1",
    category: "Electronics",
    rating: 4.5,
    ratings: 1879,
    stock: 60
  },
  {
    id: 10,
    title: "Portable Bluetooth Speaker",
    description: "Waterproof, rugged design with 360° sound and 20-hour battery life.",
    price: 89.99,
    originalPrice: 119.99,
    image: "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1",
    category: "Electronics",
    rating: 4.2,
    ratings: 1543,
    stock: 90
  }
];
