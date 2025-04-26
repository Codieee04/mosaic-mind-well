
import React from 'react';

interface WellnessGoalProps {
  id: string;
  title: string;
  completed: boolean;
  onToggle: (id: string) => void;
}

const WellnessGoal: React.FC<WellnessGoalProps> = ({ id, title, completed, onToggle }) => {
  return (
    <div 
      className={`flex items-center p-4 mb-2 rounded-lg transition-all ${
        completed 
          ? 'bg-green-50 border-l-4 border-green-500' 
          : 'bg-white border-l-4 border-gray-200'
      }`}
    >
      <input
        type="checkbox"
        id={`goal-${id}`}
        checked={completed}
        onChange={() => onToggle(id)}
        className="w-5 h-5 text-harmony rounded focus:ring-harmony cursor-pointer"
      />
      <label 
        htmlFor={`goal-${id}`}
        className={`ml-3 cursor-pointer ${
          completed ? 'line-through text-gray-500' : 'text-deepblue'
        }`}
      >
        {title}
      </label>
    </div>
  );
};

export default WellnessGoal;
