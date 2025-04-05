
export const createBoundsFromCoordinates = (
  coordinates: Array<{ lat: number, lng: number }>,
  map: google.maps.Map
) => {
  if (!coordinates.length) return null;
  
  const bounds = new google.maps.LatLngBounds();
  coordinates.forEach(coord => {
    bounds.extend({ lat: coord.lat, lng: coord.lng });
  });
  
  map.fitBounds(bounds);
  
  // Don't zoom in too much
  const listener = google.maps.event.addListener(map, 'idle', () => {
    if (map.getZoom() && map.getZoom() > 16) map.setZoom(16);
    google.maps.event.removeListener(listener);
  });
  
  return bounds;
};

export const createInfoWindow = (shop: { 
  name: string; 
  type: string; 
  price: number; 
  size: number;
}) => {
  return new google.maps.InfoWindow({
    content: `
      <div>
        <h3 style="font-weight: bold;">${shop.name}</h3>
        <p>${shop.type === 'rent' ? 'For Rent' : 'For Sale'}: $${shop.price.toLocaleString()}</p>
        <p>${shop.size} sq.ft</p>
      </div>
    `
  });
};
