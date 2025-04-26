
import React, { useState } from 'react';

interface MoodFormProps {
  onSubmit: (mood: string, intensity: number) => void;
}

const MoodForm: React.FC<MoodFormProps> = ({ onSubmit }) => {
  const [mood, setMood] = useState('neutral');
  const [intensity, setIntensity] = useState(5);
  
  // Available mood options
  const moodOptions = [
    { value: 'anxious', label: 'Anxious' },
    { value: 'sad', label: 'Sad' },
    { value: 'angry', label: 'Frustrated' },
    { value: 'happy', label: 'Happy' },
    { value: 'calm', label: 'Calm' },
    { value: 'tired', label: 'Tired' },
    { value: 'neutral', label: 'Neutral' }
  ];
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(mood, intensity);
  };
  
  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-md p-4 mb-6 animate-fade-in">
      <div className="mb-4">
        <label htmlFor="mood" className="block text-sm font-medium text-deepblue mb-1">
          How are you feeling today?
        </label>
        <select
          id="mood"
          value={mood}
          onChange={(e) => setMood(e.target.value)}
          className="input-field"
        >
          {moodOptions.map(option => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>
      
      <div className="mb-4">
        <label htmlFor="intensity" className="block text-sm font-medium text-deepblue mb-1">
          Intensity: {intensity}
        </label>
        <input
          type="range"
          id="intensity"
          min="1"
          max="10"
          value={intensity}
          onChange={(e) => setIntensity(parseInt(e.target.value))}
          className="w-full"
        />
        <div className="flex justify-between text-xs text-gray-500">
          <span>Low</span>
          <span>High</span>
        </div>
      </div>
      
      <div className="flex justify-end">
        <button type="submit" className="btn">
          Save Mood
        </button>
      </div>
    </form>
  );
};

export default MoodForm;
