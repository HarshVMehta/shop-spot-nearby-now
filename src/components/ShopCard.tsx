
import React from 'react';
import { MapPin, DollarSign } from 'lucide-react';
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export interface Shop {
  id: string;
  name: string;
  address: string;
  price: number;
  size: number;
  type: 'rent' | 'purchase';
  image: string;
  lat: number;
  lng: number;
}

interface ShopCardProps {
  shop: Shop;
  onViewDetails: (id: string) => void;
  onShowOnMap: (lat: number, lng: number) => void;
}

const ShopCard: React.FC<ShopCardProps> = ({ shop, onViewDetails, onShowOnMap }) => {
  return (
    <Card className="overflow-hidden transition-transform hover:shadow-lg animate-fade-in">
      <div className="relative h-48 w-full overflow-hidden bg-muted">
        <img
          src={shop.image}
          alt={shop.name}
          className="object-cover w-full h-full"
        />
        <Badge className="absolute top-2 right-2 bg-shopfinder-500">
          {shop.type === 'rent' ? 'For Rent' : 'For Sale'}
        </Badge>
      </div>
      <CardContent className="p-4">
        <div className="mb-2">
          <h3 className="text-lg font-semibold line-clamp-1">{shop.name}</h3>
          <div className="flex items-center text-sm text-muted-foreground mt-1">
            <MapPin className="h-4 w-4 mr-1" />
            <span className="line-clamp-1">{shop.address}</span>
          </div>
        </div>
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center">
            <DollarSign className="h-4 w-4 text-shopfinder-500" />
            <span className="font-bold text-lg">
              {shop.price.toLocaleString()}
              <span className="text-sm font-normal text-muted-foreground ml-1">
                {shop.type === 'rent' ? '/month' : ''}
              </span>
            </span>
          </div>
          <div className="text-sm text-muted-foreground">
            {shop.size} sq.ft
          </div>
        </div>
        <div className="flex gap-2">
          <Button 
            variant="outline" 
            className="flex-1"
            onClick={() => onShowOnMap(shop.lat, shop.lng)}
          >
            View on Map
          </Button>
          <Button 
            className="flex-1 bg-shopfinder-500 hover:bg-shopfinder-600" 
            onClick={() => onViewDetails(shop.id)}
          >
            Details
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default ShopCard;
