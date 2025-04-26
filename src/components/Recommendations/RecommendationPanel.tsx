
import React from 'react';
import { getRecommendations } from '../../utils/supabaseClient';

interface RecommendationPanelProps {
  mood: string;
  onClose: () => void;
}

const RecommendationPanel: React.FC<RecommendationPanelProps> = ({ mood, onClose }) => {
  const recommendations = getRecommendations(mood);
  
  // Map moods to friendly display names and colors
  const moodDisplay = {
    anxious: { name: 'Anxious', color: 'bg-blue-100 text-blue-800' },
    sad: { name: 'Sad', color: 'bg-indigo-100 text-indigo-800' },
    angry: { name: 'Frustrated', color: 'bg-red-100 text-red-800' },
    happy: { name: 'Happy', color: 'bg-green-100 text-green-800' },
    neutral: { name: 'Neutral', color: 'bg-gray-100 text-gray-800' }
  };
  
  // Use the mood display data or fallback to defaults
  const { name: displayName, color } = 
    moodDisplay[mood as keyof typeof moodDisplay] || 
    { name: 'Your Mood', color: 'bg-gray-100 text-gray-800' };
  
  return (
    <div className="bg-white rounded-lg shadow-md p-4">
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center">
          <span className={`text-sm font-medium px-2.5 py-0.5 rounded ${color}`}>
            {displayName}
          </span>
          <h3 className="text-lg font-medium ml-2">Recommendations</h3>
        </div>
        <button 
          onClick={onClose}
          className="text-gray-500 hover:text-gray-700"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
      
      <ul className="space-y-2">
        {recommendations.map((recommendation, index) => (
          <li key={index} className="bg-freshstart/30 p-3 rounded-lg">
            <p className="text-sm text-deepblue">{recommendation}</p>
          </li>
        ))}
      </ul>
      
      <div className="mt-4 pt-3 border-t border-gray-200">
        <p className="text-xs text-gray-500">
          These suggestions are based on your conversation. For persistent concerns, please consult a mental health professional.
        </p>
      </div>
    </div>
  );
};

export default RecommendationPanel;
