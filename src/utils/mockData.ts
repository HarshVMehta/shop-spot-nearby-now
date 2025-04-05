
import { Shop } from "../components/ShopCard";

// Generate random mock data for shops
export const generateMockShops = (location: { lat: number, lng: number }, count = 10): Shop[] => {
  const shops: Shop[] = [];
  
  const shopTypes = ['Coffee Shop', 'Boutique', 'Restaurant', 'Bakery', 'Grocery', 'Electronics', 'Bookstore'];
  const streets = ['Main St', 'Broadway', 'Market St', 'Park Ave', 'Oak Lane', 'Maple Rd', 'Center St'];
  const cities = ['New York', 'San Francisco', 'Chicago', 'Boston', 'Seattle', 'Austin'];
  const images = [
    'https://images.unsplash.com/photo-1565699369970-9929af6efe29?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
    'https://images.unsplash.com/photo-1606953166542-2890fe5a0f5c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
    'https://images.unsplash.com/photo-1672672839771-83af40a43d0c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
    'https://images.unsplash.com/photo-1600205045223-96a0a5ffba9a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
    'https://images.unsplash.com/photo-1613642364850-364c3eff0b69?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
  ];
  
  // Generate random shops around the provided location
  for (let i = 0; i < count; i++) {
    // Random offset in latitude and longitude (roughly within ~1-2 miles)
    const latOffset = (Math.random() - 0.5) * 0.05;
    const lngOffset = (Math.random() - 0.5) * 0.05;
    
    const type = Math.random() > 0.5 ? 'rent' : 'purchase';
    const shopType = shopTypes[Math.floor(Math.random() * shopTypes.length)];
    const street = streets[Math.floor(Math.random() * streets.length)];
    const streetNumber = Math.floor(Math.random() * 1000) + 1;
    const city = cities[Math.floor(Math.random() * cities.length)];
    const image = images[Math.floor(Math.random() * images.length)];
    
    shops.push({
      id: `shop-${i}`,
      name: `${shopType} ${i + 1}`,
      address: `${streetNumber} ${street}, ${city}`,
      price: type === 'rent' ? 
        Math.floor(Math.random() * 5000) + 1000 : 
        Math.floor(Math.random() * 900000) + 100000,
      size: Math.floor(Math.random() * 2000) + 500,
      type,
      image,
      lat: location.lat + latOffset,
      lng: location.lng + lngOffset
    });
  }
  
  return shops;
};

// Default coordinates for major cities
export const defaultLocations = {
  "New York": { lat: 40.7128, lng: -74.0060 },
  "San Francisco": { lat: 37.7749, lng: -122.4194 },
  "Chicago": { lat: 41.8781, lng: -87.6298 },
  "Los Angeles": { lat: 34.0522, lng: -118.2437 },
  "Miami": { lat: 25.7617, lng: -80.1918 },
  "Seattle": { lat: 47.6062, lng: -122.3321 }
};
