
import React, { useState } from 'react';
import WellnessGoal from './WellnessGoal';
import { mockWellnessGoals, saveWellnessGoals } from '../../utils/supabaseClient';

interface Goal {
  id: string;
  title: string;
  completed: boolean;
}

const GoalsList: React.FC = () => {
  const [goals, setGoals] = useState<Goal[]>(mockWellnessGoals);
  const [newGoal, setNewGoal] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const completedGoals = goals.filter(goal => goal.completed);
  const progress = goals.length > 0 
    ? Math.round((completedGoals.length / goals.length) * 100) 
    : 0;
  
  const handleToggle = async (id: string) => {
    const updatedGoals = goals.map(goal =>
      goal.id === id ? { ...goal, completed: !goal.completed } : goal
    );
    
    setGoals(updatedGoals);
    
    // In a real app, we would save to Supabase here
    await saveWellnessGoals(updatedGoals);
  };
  
  const handleAddGoal = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newGoal.trim()) return;
    
    setIsSubmitting(true);
    
    try {
      const newGoalItem: Goal = {
        id: Date.now().toString(),
        title: newGoal,
        completed: false
      };
      
      const updatedGoals = [...goals, newGoalItem];
      
      // Update state
      setGoals(updatedGoals);
      
      // Clear input
      setNewGoal('');
      
      // In a real app, we would save to Supabase here
      await saveWellnessGoals(updatedGoals);
    } catch (error) {
      console.error('Error adding goal:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="page-container">
      <h2 className="text-2xl font-bold text-deepblue mb-2">Wellness Goals</h2>
      <p className="text-lg text-deepblue/70 mb-6">
        Track your daily self-care goals to build healthy habits and improve your wellbeing.
      </p>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="col-span-1 md:col-span-2">
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-lg font-semibold text-deepblue mb-4">Today's Goals</h3>
            
            {goals.length === 0 ? (
              <p className="text-gray-500 my-4">No goals yet. Add your first wellness goal below.</p>
            ) : (
              <div className="mb-4">
                {goals.map(goal => (
                  <WellnessGoal
                    key={goal.id}
                    id={goal.id}
                    title={goal.title}
                    completed={goal.completed}
                    onToggle={handleToggle}
                  />
                ))}
              </div>
            )}
            
            <form onSubmit={handleAddGoal} className="mt-6 flex items-center">
              <input
                type="text"
                value={newGoal}
                onChange={(e) => setNewGoal(e.target.value)}
                className="flex-grow px-3 py-2 border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-harmony"
                placeholder="Add a new wellness goal..."
                maxLength={100}
              />
              <button
                type="submit"
                disabled={!newGoal.trim() || isSubmitting}
                className={`px-4 py-2 rounded-r-md text-white ${
                  !newGoal.trim() || isSubmitting
                    ? 'bg-gray-300 cursor-not-allowed'
                    : 'bg-harmony hover:bg-rustred transition-colors'
                }`}
              >
                Add
              </button>
            </form>
          </div>
        </div>
        
        <div className="col-span-1">
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-lg font-semibold text-deepblue mb-4">Progress</h3>
            
            <div className="mb-2 flex justify-between">
              <span className="text-sm text-gray-600">Daily completion</span>
              <span className="text-sm font-medium text-deepblue">{progress}%</span>
            </div>
            
            <div className="w-full h-3 bg-gray-200 rounded-full overflow-hidden">
              <div 
                className="h-full bg-harmony rounded-full" 
                style={{ width: `${progress}%` }} 
              />
            </div>
            
            <div className="mt-6">
              <h4 className="text-sm font-medium text-gray-600 mb-2">Summary</h4>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Completed</span>
                  <span className="font-medium text-deepblue">{completedGoals.length}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Remaining</span>
                  <span className="font-medium text-deepblue">{goals.length - completedGoals.length}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Total goals</span>
                  <span className="font-medium text-deepblue">{goals.length}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GoalsList;
