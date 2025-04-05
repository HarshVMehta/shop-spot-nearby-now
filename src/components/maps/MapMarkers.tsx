
import { useEffect, useRef } from 'react';
import { Shop } from '@/components/ShopCard';
import { createBoundsFromCoordinates, createInfoWindow } from '@/utils/mapUtils';

interface MapMarkersProps {
  map: google.maps.Map | null;
  shops: Shop[];
  onShopClick: (id: string) => void;
}

const MapMarkers: React.FC<MapMarkersProps> = ({ map, shops, onShopClick }) => {
  const markersRef = useRef<{[key: string]: google.maps.Marker}>({});
  
  // Update markers when shops or map changes
  useEffect(() => {
    if (!map) return;

    // Remove existing markers
    Object.values(markersRef.current).forEach(marker => marker.setMap(null));
    markersRef.current = {};

    // Add new markers
    shops.forEach(shop => {
      const infoWindow = createInfoWindow(shop);
      
      // Create and add marker
      const marker = new google.maps.Marker({
        position: { lat: shop.lat, lng: shop.lng },
        map: map,
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
        infoWindow.open(map, marker);
        onShopClick(shop.id);
      });
      
      markersRef.current[shop.id] = marker;
    });
    
    // If we have shops, fit map to bounds of all shops
    if (shops.length > 0) {
      createBoundsFromCoordinates(
        shops.map(shop => ({ lat: shop.lat, lng: shop.lng })),
        map
      );
    }
  }, [shops, map, onShopClick]);

  return null; // This is a non-visual component
};

export default MapMarkers;
