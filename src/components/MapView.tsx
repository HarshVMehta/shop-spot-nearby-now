
import React, { useEffect, useRef, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { Shop } from './ShopCard';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { X } from 'lucide-react';

// Storage key for Mapbox token
const MAPBOX_TOKEN_STORAGE_KEY = 'shopfinder_mapbox_token';

interface MapViewProps {
  shops: Shop[];
  selectedShop?: {lat: number, lng: number} | null;
  onShopClick: (id: string) => void;
}

const MapView: React.FC<MapViewProps> = ({ shops, selectedShop, onShopClick }) => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const markersRef = useRef<{[key: string]: mapboxgl.Marker}>({});
  const [mapInitialized, setMapInitialized] = useState(false);
  const [apiKey, setApiKey] = useState<string>('');
  const [inputApiKey, setInputApiKey] = useState<string>('');
  const [showKeyForm, setShowKeyForm] = useState(false);
  
  // Load API key from localStorage on component mount
  useEffect(() => {
    const storedToken = localStorage.getItem(MAPBOX_TOKEN_STORAGE_KEY);
    if (storedToken) {
      setApiKey(storedToken);
    }
  }, []);

  const handleSaveApiKey = () => {
    if (inputApiKey.trim()) {
      localStorage.setItem(MAPBOX_TOKEN_STORAGE_KEY, inputApiKey.trim());
      setApiKey(inputApiKey.trim());
      setShowKeyForm(false);
      // Reload the page to reinitialize the map with the new API key
      window.location.reload();
    }
  };

  const handleRemoveApiKey = () => {
    localStorage.removeItem(MAPBOX_TOKEN_STORAGE_KEY);
    setApiKey('');
    setInputApiKey('');
    setShowKeyForm(false);
    // Reload the page to reflect the change
    window.location.reload();
  };
  
  // Initialize map when component mounts and API key is available
  useEffect(() => {
    if (!mapContainer.current || map.current || !apiKey) return;

    mapboxgl.accessToken = apiKey;
    
    try {
      const initialLocation = shops.length > 0 
        ? { lng: shops[0].lng, lat: shops[0].lat } 
        : { lng: -74.006, lat: 40.7128 }; // Default to NYC if no shops
      
      map.current = new mapboxgl.Map({
        container: mapContainer.current,
        style: 'mapbox://styles/mapbox/streets-v11',
        center: [initialLocation.lng, initialLocation.lat],
        zoom: 12
      });

      map.current.addControl(new mapboxgl.NavigationControl(), 'top-right');
      
      map.current.on('load', () => {
        setMapInitialized(true);
      });
    } catch (error) {
      console.error("Error initializing map:", error);
      // If there's an initialization error, it might be due to an invalid API key
      localStorage.removeItem(MAPBOX_TOKEN_STORAGE_KEY);
      setApiKey('');
    }

    return () => {
      if (map.current) {
        map.current.remove();
        map.current = null;
      }
    };
  }, [apiKey, shops]);

  // Update markers when shops change
  useEffect(() => {
    if (!map.current || !mapInitialized) return;

    // Remove existing markers
    Object.values(markersRef.current).forEach(marker => marker.remove());
    markersRef.current = {};

    // Add new markers
    shops.forEach(shop => {
      // Create marker element
      const el = document.createElement('div');
      el.className = 'flex justify-center items-center';
      el.innerHTML = `<svg width="30" height="40" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 21C16.9706 17 20 13.4183 20 10C20 6.13401 16.4183 3 12 3C7.58172 3 4 6.13401 4 10C4 13.4183 7.02944 17 12 21Z" fill="#0084e6" stroke="white" stroke-width="2"/>
      </svg>`;
      
      const popup = new mapboxgl.Popup({ offset: 25 })
        .setHTML(`
          <div>
            <h3 class="font-bold">${shop.name}</h3>
            <p>${shop.type === 'rent' ? 'For Rent' : 'For Sale'}: $${shop.price.toLocaleString()}</p>
            <p>${shop.size} sq.ft</p>
          </div>
        `);

      // Create and add marker
      const marker = new mapboxgl.Marker(el)
        .setLngLat([shop.lng, shop.lat])
        .setPopup(popup)
        .addTo(map.current!);
      
      marker.getElement().addEventListener('click', () => {
        onShopClick(shop.id);
      });
      
      markersRef.current[shop.id] = marker;
    });
    
    // If we have shops, fit map to bounds of all shops
    if (shops.length > 0) {
      const bounds = new mapboxgl.LngLatBounds();
      shops.forEach(shop => {
        bounds.extend([shop.lng, shop.lat]);
      });
      
      map.current.fitBounds(bounds, {
        padding: 50,
        maxZoom: 15
      });
    }
  }, [shops, mapInitialized, onShopClick]);

  // Pan to selected shop if provided
  useEffect(() => {
    if (!map.current || !mapInitialized || !selectedShop) return;
    
    map.current.flyTo({
      center: [selectedShop.lng, selectedShop.lat],
      zoom: 16,
      essential: true
    });
  }, [selectedShop, mapInitialized]);

  return (
    <div className="relative h-full rounded-md overflow-hidden border">
      <div ref={mapContainer} className="absolute inset-0" />
      
      {!apiKey ? (
        <div className="absolute inset-0 flex items-center justify-center bg-black/70 text-white z-10 p-4 text-center">
          <div className="bg-background border rounded-lg shadow-lg p-6 max-w-md text-foreground">
            <h3 className="font-bold text-lg mb-4">Mapbox API Key Required</h3>
            <p className="mb-4">To use the map feature, please enter your Mapbox API token.</p>
            <div className="flex flex-col gap-4">
              <Input
                value={inputApiKey}
                onChange={(e) => setInputApiKey(e.target.value)}
                placeholder="Enter your Mapbox access token"
                className="w-full"
              />
              <Button onClick={handleSaveApiKey} className="bg-shopfinder-500 hover:bg-shopfinder-600">
                Save API Key
              </Button>
              <div className="text-sm text-muted-foreground mt-2">
                <p>Need a token? <a href="https://account.mapbox.com/" target="_blank" rel="noopener noreferrer" className="text-shopfinder-500 hover:underline">Sign up for free at Mapbox</a></p>
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
                <h3 className="font-medium">Mapbox API Key</h3>
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
