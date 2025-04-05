
import { useState, useEffect } from 'react';
import { Loader } from '@googlemaps/js-api-loader';

// Storage key for Google Maps API token
export const GOOGLE_MAPS_API_KEY_STORAGE = 'shopfinder_google_maps_api_key';

export const useGoogleMaps = () => {
  const [map, setMap] = useState<google.maps.Map | null>(null);
  const [apiKey, setApiKey] = useState<string>('');
  const [mapInitialized, setMapInitialized] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Load API key from localStorage on component mount
  useEffect(() => {
    const storedToken = localStorage.getItem(GOOGLE_MAPS_API_KEY_STORAGE);
    if (storedToken) {
      setApiKey(storedToken);
    }
  }, []);

  const initializeMap = async (
    mapElement: HTMLElement, 
    initialLocation: { lat: number, lng: number }
  ) => {
    if (!apiKey) return;
    
    try {
      const loader = new Loader({
        apiKey,
        version: 'weekly',
      });
      
      await loader.load();
      
      const newMap = new google.maps.Map(mapElement, {
        center: { lat: initialLocation.lat, lng: initialLocation.lng },
        zoom: 12,
        mapTypeId: google.maps.MapTypeId.ROADMAP,
        mapTypeControl: true,
        streetViewControl: true,
        zoomControl: true,
        fullscreenControl: true
      });
      
      setMap(newMap);
      setMapInitialized(true);
      return newMap;
    } catch (err) {
      console.error("Error initializing map:", err);
      setError("Failed to initialize Google Maps");
      localStorage.removeItem(GOOGLE_MAPS_API_KEY_STORAGE);
      setApiKey('');
      return null;
    }
  };

  const saveApiKey = (newApiKey: string) => {
    if (newApiKey.trim()) {
      localStorage.setItem(GOOGLE_MAPS_API_KEY_STORAGE, newApiKey.trim());
      setApiKey(newApiKey.trim());
      return true;
    }
    return false;
  };

  const removeApiKey = () => {
    localStorage.removeItem(GOOGLE_MAPS_API_KEY_STORAGE);
    setApiKey('');
    setMap(null);
    setMapInitialized(false);
  };

  return {
    map,
    apiKey,
    mapInitialized,
    error,
    initializeMap,
    saveApiKey,
    removeApiKey
  };
};
