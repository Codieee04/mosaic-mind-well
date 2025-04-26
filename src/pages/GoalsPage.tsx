import React, { useEffect, useState } from 'react';
import { loadWellnessGoals, saveWellnessGoals, supabase } from '../utils/supabaseClient';

interface Goal {
  id: string;
  title: string;
  completed: boolean;
}

const GoalsList: React.FC = () => {
  const [goals, setGoals] = useState<Goal[]>([]);

  useEffect(() => {
    const fetchGoals = async () => {
      const data = await loadWellnessGoals();
      setGoals(data || []);
    };
    fetchGoals();
  }, []);

  const handleToggleGoal = async (goalId: string) => {
    const updatedGoals = goals.map(goal =>
      goal.id === goalId ? { ...goal, completed: !goal.completed } : goal
    );
    setGoals(updatedGoals);

    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return;

    await saveWellnessGoals(updatedGoals, user.id);
  };

  return (
    <div className="page-container">
      <h2 className="section-title mb-6">Wellness Goals</h2>
      <div className="space-y-4">
        {goals.map(goal => (
          <div key={goal.id} className="flex items-center space-x-3">
            <input 
              type="checkbox"
              checked={goal.completed}
              onChange={() => handleToggleGoal(goal.id)}
              className="w-5 h-5 text-rustred border-gray-300 rounded focus:ring-harmony"
            />
            <span className={`text-deepblue ${goal.completed ? 'line-through opacity-50' : ''}`}>
              {goal.title}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default GoalsList;
