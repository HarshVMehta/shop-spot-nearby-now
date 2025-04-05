
import React from 'react';
import { Button } from "@/components/ui/button";
import { 
  DropdownMenu, 
  DropdownMenuTrigger, 
  DropdownMenuContent, 
  DropdownMenuRadioGroup, 
  DropdownMenuRadioItem 
} from "@/components/ui/dropdown-menu";
import { SlidersHorizontal } from 'lucide-react';

interface FilterBarProps {
  propertyType: string;
  onPropertyTypeChange: (value: string) => void;
}

const FilterBar: React.FC<FilterBarProps> = ({ propertyType, onPropertyTypeChange }) => {
  return (
    <div className="flex gap-3 p-4 overflow-x-auto bg-white shadow-sm rounded-lg">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" className="min-w-[130px] justify-between">
            {propertyType === "all" ? "All Types" : propertyType === "rent" ? "For Rent" : "For Sale"}
            <SlidersHorizontal className="ml-2 h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-[200px]">
          <DropdownMenuRadioGroup value={propertyType} onValueChange={onPropertyTypeChange}>
            <DropdownMenuRadioItem value="all">All Types</DropdownMenuRadioItem>
            <DropdownMenuRadioItem value="rent">For Rent</DropdownMenuRadioItem>
            <DropdownMenuRadioItem value="purchase">For Sale</DropdownMenuRadioItem>
          </DropdownMenuRadioGroup>
        </DropdownMenuContent>
      </DropdownMenu>
      
      <Button variant="outline" className="min-w-[130px]">
        Price Range
      </Button>
      
      <Button variant="outline" className="min-w-[130px]">
        Shop Size
      </Button>

      <Button variant="outline" className="min-w-[130px]">
        More Filters
      </Button>
    </div>
  );
};

export default FilterBar;
