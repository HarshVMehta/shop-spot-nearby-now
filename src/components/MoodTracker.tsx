
import React, { useState } from "react";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MoodEntry } from "@/types/mood2food";

interface MoodTrackerProps {
  onSubmit: (moodEntry: MoodEntry) => void;
}

const MOOD_OPTIONS = [
  "Happy", "Content", "Excited", "Energetic",
  "Calm", "Tired", "Bored", "Stressed",
  "Anxious", "Sad", "Angry", "Frustrated"
];

const MoodTracker: React.FC<MoodTrackerProps> = ({ onSubmit }) => {
  const [selectedMood, setSelectedMood] = useState<string>("");
  const [intensity, setIntensity] = useState<number>(5);
  const [notes, setNotes] = useState<string>("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedMood) return;

    const moodEntry: MoodEntry = {
      mood: selectedMood,
      intensity,
      notes,
      timestamp: Date.now()
    };

    onSubmit(moodEntry);
    
    // Reset form
    setSelectedMood("");
    setIntensity(5);
    setNotes("");
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-xl">How are you feeling?</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">Select your mood:</label>
            <div className="grid grid-cols-3 gap-2">
              {MOOD_OPTIONS.map((mood) => (
                <Button
                  key={mood}
                  type="button"
                  variant={selectedMood === mood ? "default" : "outline"}
                  onClick={() => setSelectedMood(mood)}
                  className="h-auto py-2"
                >
                  {mood}
                </Button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">
              Intensity: {intensity}/10
            </label>
            <Slider
              value={[intensity]}
              onValueChange={(value) => setIntensity(value[0])}
              min={1}
              max={10}
              step={1}
            />
          </div>

          <div>
            <label htmlFor="mood-notes" className="block text-sm font-medium mb-2">
              Notes: (Optional)
            </label>
            <Textarea
              id="mood-notes"
              placeholder="What's making you feel this way?"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              className="min-h-[100px]"
            />
          </div>

          <Button 
            type="submit" 
            disabled={!selectedMood}
            className="w-full"
          >
            Log Mood
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default MoodTracker;
