
import React, { useState, useEffect } from "react";
import { Navbar } from "@/components/Navbar";
import Footer from "@/components/Footer";
import MoodTracker from "@/components/MoodTracker";
import FoodDiary from "@/components/FoodDiary";
import InsightsPanel from "@/components/InsightsPanel";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { MoodEntry, FoodEntry } from "@/types/mood2food";

const Mood2Food = () => {
  const { toast } = useToast();
  const [moodEntries, setMoodEntries] = useState<MoodEntry[]>(() => {
    const savedEntries = localStorage.getItem('moodEntries');
    return savedEntries ? JSON.parse(savedEntries) : [];
  });
  
  const [foodEntries, setFoodEntries] = useState<FoodEntry[]>(() => {
    const savedEntries = localStorage.getItem('foodEntries');
    return savedEntries ? JSON.parse(savedEntries) : [];
  });

  // Save to localStorage whenever entries change
  useEffect(() => {
    localStorage.setItem('moodEntries', JSON.stringify(moodEntries));
  }, [moodEntries]);

  useEffect(() => {
    localStorage.setItem('foodEntries', JSON.stringify(foodEntries));
  }, [foodEntries]);

  const handleMoodSubmit = (moodEntry: MoodEntry) => {
    setMoodEntries([...moodEntries, moodEntry]);
    toast({
      title: "Mood logged!",
      description: `You're feeling ${moodEntry.mood} (${moodEntry.intensity}/10)`,
    });
  };

  const handleFoodSubmit = (foodEntry: FoodEntry) => {
    setFoodEntries([...foodEntries, foodEntry]);
    toast({
      title: "Food logged!",
      description: `Added ${foodEntry.name} to your food diary`,
    });
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Mood2Food Tracker</h1>
          <p className="text-gray-600">
            Track your mood and food intake to discover how they affect each other.
          </p>
        </div>

        <Tabs defaultValue="log">
          <TabsList className="grid w-full grid-cols-3 mb-8">
            <TabsTrigger value="log">Log Entry</TabsTrigger>
            <TabsTrigger value="history">History</TabsTrigger>
            <TabsTrigger value="insights">Insights</TabsTrigger>
          </TabsList>
          
          <TabsContent value="log" className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <MoodTracker onSubmit={handleMoodSubmit} />
              <FoodDiary onSubmit={handleFoodSubmit} />
            </div>
          </TabsContent>
          
          <TabsContent value="history" className="space-y-8">
            <h2 className="text-xl font-semibold mb-4">Your Recent Entries</h2>
            
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-medium mb-2">Mood Entries</h3>
                {moodEntries.length > 0 ? (
                  <div className="space-y-2">
                    {[...moodEntries].reverse().slice(0, 10).map((entry, index) => (
                      <div key={index} className="bg-white p-4 rounded-lg border shadow-sm">
                        <div className="flex justify-between items-center">
                          <div>
                            <p className="font-medium">{entry.mood} ({entry.intensity}/10)</p>
                            <p className="text-gray-600 text-sm">{entry.notes}</p>
                          </div>
                          <p className="text-sm text-gray-500">
                            {new Date(entry.timestamp).toLocaleString()}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-gray-500">No mood entries yet.</p>
                )}
              </div>
              
              <div>
                <h3 className="text-lg font-medium mb-2">Food Entries</h3>
                {foodEntries.length > 0 ? (
                  <div className="space-y-2">
                    {[...foodEntries].reverse().slice(0, 10).map((entry, index) => (
                      <div key={index} className="bg-white p-4 rounded-lg border shadow-sm">
                        <div className="flex justify-between items-center">
                          <div>
                            <p className="font-medium">{entry.name}</p>
                            <p className="text-gray-600 text-sm">{entry.category}</p>
                            <p className="text-gray-600 text-sm">{entry.notes}</p>
                          </div>
                          <p className="text-sm text-gray-500">
                            {new Date(entry.timestamp).toLocaleString()}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-gray-500">No food entries yet.</p>
                )}
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="insights">
            <InsightsPanel moodEntries={moodEntries} foodEntries={foodEntries} />
          </TabsContent>
        </Tabs>
      </main>
      <Footer />
    </div>
  );
};

export default Mood2Food;
