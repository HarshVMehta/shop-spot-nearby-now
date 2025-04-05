
import React, { useEffect, useRef } from 'react';
import { Shop } from '@/components/ShopCard';

interface MapContainerProps {
  map: google.maps.Map | null;
  onMapElementReady: (element: HTMLElement) => void;
  selectedShop?: {lat: number, lng: number} | null;
  children?: React.ReactNode;
}

const MapContainer: React.FC<MapContainerProps> = ({ 
  map,
  onMapElementReady,
  selectedShop,
  children
}) => {
  const mapContainer = useRef<HTMLDivElement>(null);
  
  // Initialize map when container is ready
  useEffect(() => {
    if (mapContainer.current) {
      onMapElementReady(mapContainer.current);
    }
  }, [onMapElementReady]);

  // Pan to selected shop if provided
  useEffect(() => {
    if (!map || !selectedShop) return;
    
    map.panTo({ lat: selectedShop.lat, lng: selectedShop.lng });
    map.setZoom(16);
  }, [selectedShop, map]);

  return (
    <div className="relative h-full rounded-md overflow-hidden border">
      <div ref={mapContainer} className="absolute inset-0" />
      {children}
    </div>
  );
};

export default MapContainer;
