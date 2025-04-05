
import React, { useEffect, useRef, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { Shop } from './ShopCard';

// Temporary access token - in production, this should be secured properly
const MAPBOX_TOKEN = 'YOUR_MAPBOX_TOKEN_HERE';

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
  
  // Initialize map when component mounts
  useEffect(() => {
    if (!mapContainer.current || map.current) return;

    mapboxgl.accessToken = MAPBOX_TOKEN;
    
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

    return () => {
      if (map.current) {
        map.current.remove();
        map.current = null;
      }
    };
  }, []);

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
      {MAPBOX_TOKEN === 'YOUR_MAPBOX_TOKEN_HERE' && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/70 text-white z-10 p-4 text-center">
          <div>
            <p className="font-bold mb-2">Mapbox Token Required</p>
            <p>Please replace 'YOUR_MAPBOX_TOKEN_HERE' in the MapView component with your Mapbox access token.</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default MapView;
