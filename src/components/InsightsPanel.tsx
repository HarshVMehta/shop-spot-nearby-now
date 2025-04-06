
import React, { useMemo } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { MoodEntry, FoodEntry } from "@/types/mood2food";

interface InsightsPanelProps {
  moodEntries: MoodEntry[];
  foodEntries: FoodEntry[];
}

// Mood-boosting food recommendations
const MOOD_FOOD_RECOMMENDATIONS = {
  "Stressed": {
    foods: ["Dark Chocolate", "Blueberries", "Almonds", "Green Tea", "Avocados"],
    reasoning: "Foods rich in antioxidants and healthy fats can help reduce stress hormones and inflammation."
  },
  "Sad": {
    foods: ["Salmon", "Eggs", "Bananas", "Walnuts", "Greek Yogurt"],
    reasoning: "Foods high in vitamin D, omega-3 fatty acids and B vitamins can boost serotonin levels."
  },
  "Tired": {
    foods: ["Oatmeal", "Sweet Potatoes", "Quinoa", "Lentils", "Oranges"],
    reasoning: "Complex carbohydrates and vitamin C provide sustained energy and fight fatigue."
  },
  "Anxious": {
    foods: ["Turkey", "Chamomile Tea", "Asparagus", "Kiwi", "Brazil Nuts"],
    reasoning: "Foods high in tryptophan, magnesium and selenium can calm the nervous system."
  }
};

const InsightsPanel: React.FC<InsightsPanelProps> = ({ moodEntries, foodEntries }) => {
  const mostFrequentMood = useMemo(() => {
    if (moodEntries.length === 0) return null;
    
    const moodCounts: Record<string, number> = {};
    moodEntries.forEach(entry => {
      moodCounts[entry.mood] = (moodCounts[entry.mood] || 0) + 1;
    });
    
    return Object.entries(moodCounts).sort((a, b) => b[1] - a[1])[0][0];
  }, [moodEntries]);

  const recentMoods = useMemo(() => {
    if (moodEntries.length === 0) return [];
    return [...moodEntries].sort((a, b) => b.timestamp - a.timestamp).slice(0, 5);
  }, [moodEntries]);

  const foodRecommendations = useMemo(() => {
    if (!mostFrequentMood) return null;
    
    // Find the closest mood match in our recommendations
    const stressfulMoods = ["Stressed", "Anxious", "Frustrated"];
    const sadMoods = ["Sad", "Down", "Depressed"];
    const tiredMoods = ["Tired", "Exhausted", "Fatigued", "Bored"];
    
    let recommendationKey = "Stressed"; // Default
    
    if (stressfulMoods.includes(mostFrequentMood)) {
      recommendationKey = "Stressed";
    } else if (sadMoods.includes(mostFrequentMood)) {
      recommendationKey = "Sad";
    } else if (tiredMoods.includes(mostFrequentMood)) {
      recommendationKey = "Tired";
    } else if (mostFrequentMood === "Anxious") {
      recommendationKey = "Anxious";
    }
    
    return {
      mood: mostFrequentMood,
      ...MOOD_FOOD_RECOMMENDATIONS[recommendationKey as keyof typeof MOOD_FOOD_RECOMMENDATIONS]
    };
  }, [mostFrequentMood]);

  if (moodEntries.length < 3 || foodEntries.length < 3) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Not enough data yet</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-600">
            Log at least 3 mood entries and 3 food entries to see insights about your mood and eating patterns.
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-8">
      <Card>
        <CardHeader>
          <CardTitle>Your Mood Patterns</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="mb-4">
            {mostFrequentMood ? (
              `Your most frequent mood is "${mostFrequentMood}". This mood appears in ${
                moodEntries.filter(entry => entry.mood === mostFrequentMood).length
              } out of ${moodEntries.length} entries.`
            ) : (
              "No mood patterns detected yet."
            )}
          </p>
          
          <h4 className="font-medium mb-2">Recent mood trend:</h4>
          <div className="flex flex-wrap gap-2">
            {recentMoods.map((entry, index) => (
              <div key={index} className="bg-gray-100 rounded-full px-3 py-1 text-sm">
                {entry.mood} ({entry.intensity}/10)
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {foodRecommendations && (
        <Card>
          <CardHeader>
            <CardTitle>Food Recommendations for Your Mood</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="mb-4">Based on your frequent "{foodRecommendations.mood}" mood, here are some foods that might help:</p>
            
            <ul className="list-disc pl-5 mb-4 space-y-1">
              {foodRecommendations.foods.map((food, index) => (
                <li key={index}>{food}</li>
              ))}
            </ul>
            
            <p className="text-sm text-gray-600">{foodRecommendations.reasoning}</p>
          </CardContent>
        </Card>
      )}

      <Card>
        <CardHeader>
          <CardTitle>Patterns & Tips</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <h4 className="font-medium mb-1">General Insights:</h4>
            <p className="text-gray-600">
              Track more entries to receive personalized insights about how specific foods affect your mood, and which moods trigger specific eating habits.
            </p>
          </div>
          
          <div>
            <h4 className="font-medium mb-1">Tips for Better Mood & Food Balance:</h4>
            <ul className="list-disc pl-5 space-y-1">
              <li>Try to eat regular meals to stabilize blood sugar</li>
              <li>Stay hydrated throughout the day</li>
              <li>Include protein with every meal to maintain energy levels</li>
              <li>Limit processed foods and sugar which can cause mood crashes</li>
              <li>Consider mindful eating - focus on your food while eating</li>
            </ul>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default InsightsPanel;
