
import React from 'react';
import ShopCard, { Shop } from './ShopCard';

interface ShopListProps {
  shops: Shop[];
  onViewDetails: (id: string) => void;
  onShowOnMap: (lat: number, lng: number) => void;
}

const ShopList: React.FC<ShopListProps> = ({ shops, onViewDetails, onShowOnMap }) => {
  if (shops.length === 0) {
    return (
      <div className="flex items-center justify-center h-64">
        <p className="text-lg text-muted-foreground">No shops found in this area. Try changing your search.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2 gap-4">
      {shops.map((shop) => (
        <ShopCard 
          key={shop.id} 
          shop={shop} 
          onViewDetails={onViewDetails} 
          onShowOnMap={onShowOnMap} 
        />
      ))}
    </div>
  );
};

export default ShopList;
