
import React, { useState } from 'react';
import { mockMoodData, saveMood } from '../../utils/supabaseClient';
import MoodChart from './MoodChart';
import MoodForm from './MoodForm';

// Define the mood data type
interface MoodData {
  date: string;
  mood: string;
  intensity: number;
}

const MoodTracker: React.FC = () => {
  const [moodData, setMoodData] = useState<MoodData[]>(mockMoodData);
  const [showForm, setShowForm] = useState(false);
  
  // Handle new mood entry
  const handleAddMood = async (mood: string, intensity: number) => {
    try {
      // In a real app, we would save to Supabase here
      const newMoodEntry = await saveMood({ mood, intensity });
      
      // Add the new mood entry to the list
      setMoodData(prev => [...prev, newMoodEntry]);
      
      // Close the form
      setShowForm(false);
    } catch (error) {
      console.error('Error saving mood:', error);
    }
  };
  
  return (
    <div className="page-container">
      <div className="mb-6">
        <h2 className="section-title">Mood Tracker</h2>
        <p className="text-deepblue/70 mb-4">
          Track your mood over time to identify patterns and progress in your mental wellness journey.
        </p>
        
        <button
          onClick={() => setShowForm(!showForm)}
          className="btn mb-6"
        >
          {showForm ? 'Cancel' : 'Log Today\'s Mood'}
        </button>
        
        {showForm && (
          <MoodForm onSubmit={handleAddMood} />
        )}
      </div>
      
      <div className="bg-white rounded-lg shadow-md p-4">
        <h3 className="font-medium mb-4">Your Mood History</h3>
        <MoodChart moodData={moodData} />
      </div>
      
      <div className="mt-6 bg-white rounded-lg shadow-md p-4">
        <h3 className="font-medium mb-2">Insights</h3>
        <p className="text-sm text-deepblue/70">
          Tracking your mood can help you identify patterns and triggers. Try to log your mood regularly
          for the most accurate insights.
        </p>
      </div>
    </div>
  );
};

export default MoodTracker;
