import React, { useEffect, useRef, useState } from 'react';
import { Loader } from '@googlemaps/js-api-loader';
import { Shop } from './ShopCard';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { X } from 'lucide-react';

// Storage key for Google Maps API token
const GOOGLE_MAPS_API_KEY_STORAGE = 'shopfinder_google_maps_api_key';

interface MapViewProps {
  shops: Shop[];
  selectedShop?: {lat: number, lng: number} | null;
  onShopClick: (id: string) => void;
}

const MapView: React.FC<MapViewProps> = ({ shops, selectedShop, onShopClick }) => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<google.maps.Map | null>(null);
  const markersRef = useRef<{[key: string]: google.maps.Marker}>({});
  const [mapInitialized, setMapInitialized] = useState(false);
  const [apiKey, setApiKey] = useState<string>('');
  const [inputApiKey, setInputApiKey] = useState<string>('');
  const [showKeyForm, setShowKeyForm] = useState(false);
  
  // Load API key from localStorage on component mount
  useEffect(() => {
    const storedToken = localStorage.getItem(GOOGLE_MAPS_API_KEY_STORAGE);
    if (storedToken) {
      setApiKey(storedToken);
    }
  }, []);

  const handleSaveApiKey = () => {
    if (inputApiKey.trim()) {
      localStorage.setItem(GOOGLE_MAPS_API_KEY_STORAGE, inputApiKey.trim());
      setApiKey(inputApiKey.trim());
      setShowKeyForm(false);
      // Reload the page to reinitialize the map with the new API key
      window.location.reload();
    }
  };

  const handleRemoveApiKey = () => {
    localStorage.removeItem(GOOGLE_MAPS_API_KEY_STORAGE);
    setApiKey('');
    setInputApiKey('');
    setShowKeyForm(false);
    // Reload the page to reflect the change
    window.location.reload();
  };
  
  // Initialize map when component mounts and API key is available
  useEffect(() => {
    if (!mapContainer.current || map.current || !apiKey) return;

    const loader = new Loader({
      apiKey: apiKey,
      version: 'weekly',
    });
    
    loader.load().then(() => {
      try {
        const initialLocation = shops.length > 0 
          ? { lng: shops[0].lng, lat: shops[0].lat } 
          : { lng: -74.006, lat: 40.7128 }; // Default to NYC if no shops
        
        map.current = new google.maps.Map(mapContainer.current!, {
          center: { lat: initialLocation.lat, lng: initialLocation.lng },
          zoom: 12,
          mapTypeId: google.maps.MapTypeId.ROADMAP,
          mapTypeControl: true,
          streetViewControl: true,
          zoomControl: true,
          fullscreenControl: true
        });
        
        setMapInitialized(true);
      } catch (error) {
        console.error("Error initializing map:", error);
        // If there's an initialization error, it might be due to an invalid API key
        localStorage.removeItem(GOOGLE_MAPS_API_KEY_STORAGE);
        setApiKey('');
      }
    }).catch(error => {
      console.error("Error loading Google Maps:", error);
      localStorage.removeItem(GOOGLE_MAPS_API_KEY_STORAGE);
      setApiKey('');
    });

    return () => {
      map.current = null;
    };
  }, [apiKey, shops]);

  // Update markers when shops change
  useEffect(() => {
    if (!map.current || !mapInitialized) return;

    // Remove existing markers
    Object.values(markersRef.current).forEach(marker => marker.setMap(null));
    markersRef.current = {};

    // Add new markers
    shops.forEach(shop => {
      const infoWindow = new google.maps.InfoWindow({
        content: `
          <div>
            <h3 style="font-weight: bold;">${shop.name}</h3>
            <p>${shop.type === 'rent' ? 'For Rent' : 'For Sale'}: $${shop.price.toLocaleString()}</p>
            <p>${shop.size} sq.ft</p>
          </div>
        `
      });
      
      // Create and add marker
      const marker = new google.maps.Marker({
        position: { lat: shop.lat, lng: shop.lng },
        map: map.current!,
        title: shop.name,
        icon: {
          path: google.maps.SymbolPath.CIRCLE,
          fillColor: '#0084e6',
          fillOpacity: 1,
          strokeWeight: 2,
          strokeColor: '#ffffff',
          scale: 8
        }
      });
      
      marker.addListener('click', () => {
        infoWindow.open(map.current!, marker);
        onShopClick(shop.id);
      });
      
      markersRef.current[shop.id] = marker;
    });
    
    // If we have shops, fit map to bounds of all shops
    if (shops.length > 0) {
      const bounds = new google.maps.LatLngBounds();
      shops.forEach(shop => {
        bounds.extend({ lat: shop.lat, lng: shop.lng });
      });
      
      map.current.fitBounds(bounds);
      
      // Don't zoom in too much
      const listener = google.maps.event.addListener(map.current, 'idle', () => {
        if (map.current!.getZoom() > 16) map.current!.setZoom(16);
        google.maps.event.removeListener(listener);
      });
    }
  }, [shops, mapInitialized, onShopClick]);

  // Pan to selected shop if provided
  useEffect(() => {
    if (!map.current || !mapInitialized || !selectedShop) return;
    
    map.current.panTo({ lat: selectedShop.lat, lng: selectedShop.lng });
    map.current.setZoom(16);
  }, [selectedShop, mapInitialized]);

  return (
    <div className="relative h-full rounded-md overflow-hidden border">
      <div ref={mapContainer} className="absolute inset-0" />
      
      {!apiKey ? (
        <div className="absolute inset-0 flex items-center justify-center bg-black/70 text-white z-10 p-4 text-center">
          <div className="bg-background border rounded-lg shadow-lg p-6 max-w-md text-foreground">
            <h3 className="font-bold text-lg mb-4">Google Maps API Key Required</h3>
            <p className="mb-4">To use the map feature, please enter your Google Maps API key.</p>
            <div className="flex flex-col gap-4">
              <Input
                value={inputApiKey}
                onChange={(e) => setInputApiKey(e.target.value)}
                placeholder="Enter your Google Maps API key"
                className="w-full"
              />
              <Button onClick={handleSaveApiKey} className="bg-shopfinder-500 hover:bg-shopfinder-600">
                Save API Key
              </Button>
              <div className="text-sm text-muted-foreground mt-2">
                <p>Need an API key? <a href="https://developers.google.com/maps/documentation/javascript/get-api-key" target="_blank" rel="noopener noreferrer" className="text-shopfinder-500 hover:underline">Get one from Google Maps Platform</a></p>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="absolute top-2 right-12 z-10">
          <Button 
            variant="outline" 
            size="sm" 
            className="bg-white hover:bg-gray-100 shadow-md"
            onClick={() => setShowKeyForm(!showKeyForm)}
          >
            API Key
          </Button>
          
          {showKeyForm && (
            <div className="absolute top-full right-0 mt-2 p-4 bg-white rounded-md shadow-lg z-20 w-72">
              <div className="flex justify-between items-center mb-2">
                <h3 className="font-medium">Google Maps API Key</h3>
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="h-6 w-6" 
                  onClick={() => setShowKeyForm(false)}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
              <p className="text-xs text-muted-foreground mb-2">Your API key is stored locally on this device.</p>
              <div className="flex gap-2 mt-4">
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="text-red-500 hover:bg-red-50 hover:text-red-600"
                  onClick={handleRemoveApiKey}
                >
                  Remove Key
                </Button>
                <Button 
                  size="sm" 
                  className="bg-shopfinder-500 hover:bg-shopfinder-600"
                  onClick={() => setShowKeyForm(false)}
                >
                  Close
                </Button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default MapView;
