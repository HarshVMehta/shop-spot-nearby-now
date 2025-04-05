
// Type definitions for Google Maps JavaScript API
declare namespace google {
  namespace maps {
    class Map {
      constructor(mapDiv: Element, opts?: MapOptions);
      setCenter(latLng: LatLng | LatLngLiteral): void;
      setZoom(zoom: number): void;
      panTo(latLng: LatLng | LatLngLiteral): void;
      fitBounds(bounds: LatLngBounds | LatLngBoundsLiteral, padding?: number | Padding): void;
      getZoom(): number;
    }
    
    class Marker {
      constructor(opts?: MarkerOptions);
      setMap(map: Map | null): void;
      addListener(eventName: string, handler: (...args: any[]) => void): MapsEventListener;
      getPosition(): LatLng;
      setPosition(latLng: LatLng | LatLngLiteral): void;
    }
    
    class LatLng {
      constructor(lat: number, lng: number);
      lat(): number;
      lng(): number;
    }
    
    class LatLngBounds {
      constructor(sw?: LatLng | LatLngLiteral, ne?: LatLng | LatLngLiteral);
      extend(latLng: LatLng | LatLngLiteral): LatLngBounds;
    }
    
    class InfoWindow {
      constructor(opts?: InfoWindowOptions);
      open(map: Map, anchor?: Marker): void;
      setContent(content: string | Element): void;
      close(): void;
    }
    
    interface InfoWindowOptions {
      content?: string | Element;
      disableAutoPan?: boolean;
      maxWidth?: number;
      pixelOffset?: Size;
      position?: LatLng | LatLngLiteral;
      zIndex?: number;
    }
    
    interface MarkerOptions {
      position: LatLng | LatLngLiteral;
      map?: Map;
      title?: string;
      icon?: string | Icon | Symbol;
      label?: string | MarkerLabel;
      draggable?: boolean;
      clickable?: boolean;
      visible?: boolean;
      zIndex?: number;
    }
    
    interface Icon {
      url: string;
      size?: Size;
      scaledSize?: Size;
      origin?: Point;
      anchor?: Point;
      labelOrigin?: Point;
    }
    
    interface Symbol {
      path: string | SymbolPath;
      fillColor?: string;
      fillOpacity?: number;
      scale?: number;
      strokeColor?: string;
      strokeOpacity?: number;
      strokeWeight?: number;
    }
    
    enum SymbolPath {
      CIRCLE,
      FORWARD_CLOSED_ARROW,
      FORWARD_OPEN_ARROW,
      BACKWARD_CLOSED_ARROW,
      BACKWARD_OPEN_ARROW
    }
    
    interface MarkerLabel {
      text: string;
      color?: string;
      fontFamily?: string;
      fontSize?: string;
      fontWeight?: string;
    }
    
    interface MapOptions {
      center?: LatLng | LatLngLiteral;
      zoom?: number;
      mapTypeId?: string | MapTypeId;
      disableDefaultUI?: boolean;
      draggable?: boolean;
      zoomControl?: boolean;
      mapTypeControl?: boolean;
      scaleControl?: boolean;
      streetViewControl?: boolean;
      fullscreenControl?: boolean;
    }
    
    enum MapTypeId {
      ROADMAP,
      SATELLITE,
      HYBRID,
      TERRAIN
    }
    
    interface LatLngLiteral {
      lat: number;
      lng: number;
    }
    
    interface LatLngBoundsLiteral {
      east: number;
      north: number;
      south: number;
      west: number;
    }
    
    interface Padding {
      top: number;
      right: number;
      bottom: number;
      left: number;
    }
    
    interface Point {
      x: number;
      y: number;
    }
    
    interface Size {
      height: number;
      width: number;
    }
    
    interface MapsEventListener {
      remove(): void;
    }
    
    const event: {
      addListener(instance: any, eventName: string, handler: (...args: any[]) => void): MapsEventListener;
      removeListener(listener: MapsEventListener): void;
    };
  }
}

