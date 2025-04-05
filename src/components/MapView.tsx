
import React, { useEffect, useState } from 'react';
import { Shop } from './ShopCard';
import { Button } from './ui/button';
import MapContainer from './maps/MapContainer';
import MapMarkers from './maps/MapMarkers';
import ApiKeyForm from './maps/ApiKeyForm';
import { useGoogleMaps } from '@/hooks/useGoogleMaps';

interface MapViewProps {
  shops: Shop[];
  selectedShop?: {lat: number, lng: number} | null;
  onShopClick: (id: string) => void;
}

const MapView: React.FC<MapViewProps> = ({ shops, selectedShop, onShopClick }) => {
  const [showKeyForm, setShowKeyForm] = useState(false);
  const {
    map,
    apiKey,
    mapInitialized,
    initializeMap,
    saveApiKey,
    removeApiKey
  } = useGoogleMaps();

  const handleMapElementReady = (mapElement: HTMLElement) => {
    if (!apiKey || map) return;
    
    const initialLocation = shops.length > 0 
      ? { lng: shops[0].lng, lat: shops[0].lat } 
      : { lng: -74.006, lat: 40.7128 }; // Default to NYC if no shops
    
    initializeMap(mapElement, initialLocation);
  };

  return (
    <MapContainer 
      map={map}
      onMapElementReady={handleMapElementReady}
      selectedShop={selectedShop}
    >
      {mapInitialized && (
        <MapMarkers 
          map={map} 
          shops={shops}
          onShopClick={onShopClick}
        />
      )}
      
      {!apiKey ? (
        <div className="absolute inset-0 flex items-center justify-center bg-black/70 text-white z-10 p-4 text-center">
          <div className="bg-background border rounded-lg shadow-lg p-6 max-w-md text-foreground">
            <h3 className="font-bold text-lg mb-4">Google Maps API Key Required</h3>
            <p className="mb-4">To use the map feature, please enter your Google Maps API key.</p>
            <ApiKeyForm
              apiKey=""
              onSave={saveApiKey}
              onRemove={removeApiKey}
              onCancel={() => setShowKeyForm(false)}
            />
            <div className="text-sm text-muted-foreground mt-2">
              <p>Need an API key? <a href="https://developers.google.com/maps/documentation/javascript/get-api-key" target="_blank" rel="noopener noreferrer" className="text-shopfinder-500 hover:underline">Get one from Google Maps Platform</a></p>
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
            <ApiKeyForm
              apiKey={apiKey}
              onSave={saveApiKey}
              onRemove={removeApiKey}
              onCancel={() => setShowKeyForm(false)}
            />
          )}
        </div>
      )}
    </MapContainer>
  );
};

export default MapView;
