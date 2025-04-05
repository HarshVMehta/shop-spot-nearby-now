
import { defaultLocations } from "../utils/mockData";

// In a real application, this would use a geocoding API like Mapbox Geocoding API
export const searchLocation = async (query: string): Promise<{ lat: number, lng: number } | null> => {
  // This is a mock implementation - it just returns coordinates for known cities
  // or returns null if the location isn't found
  const normalizedQuery = query.trim().toLowerCase();
  
  // Check if query matches any of our default locations (case insensitive)
  for (const [city, coords] of Object.entries(defaultLocations)) {
    if (city.toLowerCase().includes(normalizedQuery)) {
      return coords;
    }
  }
  
  // For this demo, we'll return New York if the location isn't found
  // In a real app, we would return null or throw an error
  return defaultLocations["New York"];
};
