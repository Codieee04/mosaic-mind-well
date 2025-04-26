
import React, { useState } from 'react';
import { saveJournalEntry } from '../../utils/supabaseClient';

interface JournalFormProps {
  onEntryAdded: (entry: any) => void;
  onCancel: () => void;
}

const JournalForm: React.FC<JournalFormProps> = ({ onEntryAdded, onCancel }) => {
  const [mood, setMood] = useState('neutral');
  const [intensity, setIntensity] = useState(5);
  const [content, setContent] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // Available mood options
  const moodOptions = [
    { value: 'anxious', label: 'Anxious' },
    { value: 'sad', label: 'Sad' },
    { value: 'angry', label: 'Angry' },
    { value: 'happy', label: 'Happy' },
    { value: 'calm', label: 'Calm' },
    { value: 'tired', label: 'Tired' },
    { value: 'neutral', label: 'Neutral' }
  ];
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!content.trim()) return;
    
    setIsSubmitting(true);
    
    try {
      // In a real app, we would save to Supabase here
      const entryData = {
        mood,
        intensity,
        content
      };
      
      const savedEntry = await saveJournalEntry(entryData);
      
      // Add new entry to the list
      onEntryAdded(savedEntry);
      
      // Reset form (not needed since we'll close it)
    } catch (error) {
      console.error('Error saving journal entry:', error);
    } finally {
      setIsSubmitting(false);
    }
  };
  
  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-md p-6 mb-6 animate-fade-in">
      <h3 className="text-lg font-semibold text-deepblue mb-4">New Journal Entry</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <div>
          <label htmlFor="mood" className="block text-sm font-medium text-gray-700 mb-1">
            How are you feeling today?
          </label>
          <select
            id="mood"
            value={mood}
            onChange={(e) => setMood(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-harmony"
          >
            {moodOptions.map(option => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
        
        <div>
          <label htmlFor="intensity" className="block text-sm font-medium text-gray-700 mb-1">
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
            <span>Mild</span>
            <span>Intense</span>
          </div>
        </div>
      </div>
      
      <div className="mb-6">
        <label htmlFor="content" className="block text-sm font-medium text-gray-700 mb-1">
          Journal Entry
        </label>
        <textarea
          id="content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-harmony"
          rows={6}
          placeholder="Write your thoughts, feelings, and reflections here..."
          required
        />
      </div>
      
      <div className="flex justify-end space-x-4">
        <button
          type="button"
          onClick={onCancel}
          className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 transition-colors"
        >
          Cancel
        </button>
        
        <button
          type="submit"
          disabled={!content.trim() || isSubmitting}
          className={`px-6 py-2 rounded-md text-white ${
            !content.trim() || isSubmitting
              ? 'bg-gray-300 cursor-not-allowed'
              : 'bg-harmony hover:bg-rustred transition-colors'
          }`}
        >
          {isSubmitting ? 'Saving...' : 'Save Entry'}
        </button>
      </div>
    </form>
  );
};

export default JournalForm;
