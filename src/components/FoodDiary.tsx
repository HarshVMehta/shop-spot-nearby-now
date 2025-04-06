
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FoodEntry } from "@/types/mood2food";

interface FoodDiaryProps {
  onSubmit: (foodEntry: FoodEntry) => void;
}

const FOOD_CATEGORIES = [
  "Fruits & Vegetables",
  "Proteins",
  "Grains & Starches",
  "Dairy",
  "Sweets & Desserts",
  "Fast Food",
  "Beverages",
  "Snacks",
  "Other"
];

const FoodDiary: React.FC<FoodDiaryProps> = ({ onSubmit }) => {
  const [foodName, setFoodName] = useState("");
  const [category, setCategory] = useState("");
  const [notes, setNotes] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!foodName || !category) return;

    const foodEntry: FoodEntry = {
      name: foodName,
      category,
      notes,
      timestamp: Date.now()
    };

    onSubmit(foodEntry);
    
    // Reset form
    setFoodName("");
    setCategory("");
    setNotes("");
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-xl">What did you eat?</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="food-name" className="block text-sm font-medium mb-2">
              Food or Meal Name
            </label>
            <Input
              id="food-name"
              placeholder="e.g., Sandwich, Salad, Pasta..."
              value={foodName}
              onChange={(e) => setFoodName(e.target.value)}
              required
            />
          </div>

          <div>
            <label htmlFor="food-category" className="block text-sm font-medium mb-2">
              Category
            </label>
            <Select value={category} onValueChange={setCategory}>
              <SelectTrigger id="food-category">
                <SelectValue placeholder="Select a category" />
              </SelectTrigger>
              <SelectContent>
                {FOOD_CATEGORIES.map((cat) => (
                  <SelectItem key={cat} value={cat}>
                    {cat}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <label htmlFor="food-notes" className="block text-sm font-medium mb-2">
              Notes (Optional)
            </label>
            <Textarea
              id="food-notes"
              placeholder="How did you feel while eating or after? Any cravings?"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
            />
          </div>

          <Button 
            type="submit" 
            disabled={!foodName || !category}
            className="w-full"
          >
            Log Food
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default FoodDiary;
