
import React from 'react';

interface JournalEntryProps {
  id: string;
  date: string;
  mood: string;
  intensity: number;
  content: string;
}

const JournalEntry: React.FC<JournalEntryProps> = ({ 
  date, 
  mood, 
  intensity, 
  content 
}) => {
  // Format date for display
  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return new Intl.DateTimeFormat('en-US', { 
      weekday: 'short',
      month: 'short', 
      day: 'numeric' 
    }).format(date);
  };
  
  // Map moods to colors
  const getMoodColor = (mood: string) => {
    const moodColors: {[key: string]: string} = {
      anxious: 'bg-blue-100 text-blue-800',
      sad: 'bg-indigo-100 text-indigo-800',
      angry: 'bg-red-100 text-red-800',
      happy: 'bg-green-100 text-green-800',
      calm: 'bg-teal-100 text-teal-800',
      tired: 'bg-purple-100 text-purple-800',
      neutral: 'bg-gray-100 text-gray-800',
    };
    
    return moodColors[mood] || 'bg-gray-100 text-gray-800';
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-4 mb-4 transition-all hover:shadow-lg">
      <div className="flex justify-between items-start mb-3">
        <span className="font-semibold text-deepblue">
          {formatDate(date)}
        </span>
        <div className="flex items-center space-x-2">
          <span className={`text-xs font-medium px-2 py-1 rounded-full ${getMoodColor(mood)}`}>
            {mood}
          </span>
          <div className="flex items-center">
            <span className="text-xs text-gray-500">Intensity:</span>
            <div className="w-16 h-2 bg-gray-200 rounded-full ml-1">
              <div 
                className="h-full rounded-full bg-harmony" 
                style={{ width: `${intensity * 10}%` }} 
              />
            </div>
          </div>
        </div>
      </div>
      
      <p className="text-deepblue/80 whitespace-pre-wrap">{content}</p>
    </div>
  );
};

export default JournalEntry;
