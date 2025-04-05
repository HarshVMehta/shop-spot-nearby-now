
import React, { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import SearchBar from '@/components/SearchBar';
import FilterBar from '@/components/FilterBar';
import ShopList from '@/components/ShopList';
import MapView from '@/components/MapView';
import { Shop } from '@/components/ShopCard';
import { generateMockShops } from '@/utils/mockData';
import { searchLocation } from '@/services/locationService';
import { Button } from '@/components/ui/button';
import { toast } from '@/components/ui/use-toast';
import { MapPin } from 'lucide-react';

const Index = () => {
  const [shops, setShops] = useState<Shop[]>([]);
  const [filteredShops, setFilteredShops] = useState<Shop[]>([]);
  const [propertyType, setPropertyType] = useState('all');
  const [location, setLocation] = useState<{ lat: number, lng: number } | null>(null);
  const [selectedShop, setSelectedShop] = useState<{ lat: number, lng: number } | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  // Filter shops when propertyType changes
  useEffect(() => {
    if (shops.length === 0) return;

    if (propertyType === 'all') {
      setFilteredShops(shops);
    } else {
      setFilteredShops(shops.filter(shop => shop.type === propertyType));
    }
  }, [shops, propertyType]);

  const handleSearch = async (searchQuery: string) => {
    setIsLoading(true);
    try {
      const foundLocation = await searchLocation(searchQuery);
      
      if (foundLocation) {
        setLocation(foundLocation);
        const newShops = generateMockShops(foundLocation, 15);
        setShops(newShops);
        setSelectedShop(null);
        
        toast({
          title: "Location found",
          description: `Found ${newShops.length} available shops near ${searchQuery}`,
        });
      } else {
        toast({
          title: "Location not found",
          description: "We couldn't find that location. Please try another search.",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error("Error searching for location:", error);
      toast({
        title: "Search error",
        description: "An error occurred while searching. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleViewDetails = (id: string) => {
    const shop = shops.find(s => s.id === id);
    if (shop) {
      toast({
        title: shop.name,
        description: `${shop.address} - ${shop.type === 'rent' ? 'For Rent' : 'For Sale'} - $${shop.price.toLocaleString()}`,
      });
    }
  };

  const handleShowOnMap = (lat: number, lng: number) => {
    setSelectedShop({ lat, lng });
  };

  // Get user's location on initial load
  useEffect(() => {
    const getUserLocation = () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const userLocation = {
              lat: position.coords.latitude,
              lng: position.coords.longitude
            };
            setLocation(userLocation);
            const newShops = generateMockShops(userLocation, 15);
            setShops(newShops);
          },
          (error) => {
            console.error("Error getting user location:", error);
            // Use New York as default if geolocation fails
            handleSearch("New York");
          }
        );
      } else {
        // Fallback for browsers that don't support geolocation
        handleSearch("New York");
      }
    };

    getUserLocation();
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <div className="bg-shopfinder-500 py-8 px-4">
        <div className="container mx-auto">
          <h1 className="text-white font-bold text-3xl mb-6">
            Find the Perfect Shop for Your Business
          </h1>
          <SearchBar onSearch={handleSearch} />
        </div>
      </div>
      
      <main className="flex-1 container mx-auto py-6 px-4">
        <FilterBar 
          propertyType={propertyType} 
          onPropertyTypeChange={(value) => setPropertyType(value)} 
        />
        
        <div className="mt-6 grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-1 overflow-y-auto max-h-[calc(100vh-300px)] pr-2">
            {isLoading ? (
              <div className="flex items-center justify-center h-64">
                <p className="text-lg text-muted-foreground">Loading shops...</p>
              </div>
            ) : (
              <>
                <div className="mb-4 flex items-center justify-between">
                  <h2 className="text-xl font-semibold">
                    {filteredShops.length} 
                    <span className="text-shopfinder-500"> Shops</span> Available
                  </h2>
                </div>
                <ShopList 
                  shops={filteredShops} 
                  onViewDetails={handleViewDetails} 
                  onShowOnMap={handleShowOnMap}
                />
              </>
            )}
          </div>
          
          <div className="lg:col-span-2 h-[calc(100vh-300px)]">
            <MapView 
              shops={filteredShops} 
              selectedShop={selectedShop}
              onShopClick={handleViewDetails} 
            />
            
            {location && (
              <div className="mt-2 flex items-center text-sm text-muted-foreground">
                <MapPin className="h-4 w-4 mr-1" />
                <span>
                  Displaying shops around coordinates: {location.lat.toFixed(4)}, {location.lng.toFixed(4)}
                </span>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Index;
