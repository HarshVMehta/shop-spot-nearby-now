
export interface MoodEntry {
  mood: string;
  intensity: number;
  notes: string;
  timestamp: number;
}

export interface FoodEntry {
  name: string;
  category: string;
  notes: string;
  timestamp: number;
  moodBefore?: string;
  moodAfter?: string;
}

export interface MoodFoodInsight {
  mood: string;
  commonFoods: string[];
  correlation: number;
}

export interface FoodRecommendation {
  mood: string;
  foods: string[];
  reasoning: string;
}
