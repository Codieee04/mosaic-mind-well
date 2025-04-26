
import React from 'react';

interface CommunityPostProps {
  content: string;
  mood: string;
  createdAt: string;
}

const CommunityPost: React.FC<CommunityPostProps> = ({ content, mood, createdAt }) => {
  // Format date for display
  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return new Intl.DateTimeFormat('en-US', { 
      month: 'short', 
      day: 'numeric' 
    }).format(date);
  };
  
  // Map moods to colors
  const getMoodColor = (mood: string) => {
    const moodColors = {
      anxious: 'bg-blue-100 text-blue-800',
      sad: 'bg-indigo-100 text-indigo-800',
      angry: 'bg-red-100 text-red-800',
      happy: 'bg-green-100 text-green-800',
      grateful: 'bg-yellow-100 text-yellow-800',
      hopeful: 'bg-teal-100 text-teal-800',
      tired: 'bg-purple-100 text-purple-800'
    };
    
    return moodColors[mood as keyof typeof moodColors] || 'bg-gray-100 text-gray-800';
  };
  
  return (
    <div className="card hover:shadow-lg transition-shadow duration-300">
      <div className="flex justify-between items-start mb-3">
        <span className={`text-xs font-medium px-2 py-1 rounded ${getMoodColor(mood)}`}>
          {mood}
        </span>
        <span className="text-xs text-gray-500">
          {formatDate(createdAt)}
        </span>
      </div>
      
      <p className="text-deepblue">{content}</p>
    </div>
  );
};

export default CommunityPost;
