
import React, { useState } from 'react';

interface PostFormProps {
  onSubmit: (content: string, mood: string) => void;
}

const PostForm: React.FC<PostFormProps> = ({ onSubmit }) => {
  const [content, setContent] = useState('');
  const [mood, setMood] = useState('neutral');
  const [error, setError] = useState('');
  
  // Available mood options
  const moodOptions = [
    { value: 'anxious', label: 'Anxious' },
    { value: 'sad', label: 'Sad' },
    { value: 'angry', label: 'Frustrated' },
    { value: 'happy', label: 'Happy' },
    { value: 'grateful', label: 'Grateful' },
    { value: 'hopeful', label: 'Hopeful' },
    { value: 'tired', label: 'Tired' },
    { value: 'neutral', label: 'Neutral' }
  ];
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate form
    if (content.trim().length < 5) {
      setError('Please share at least a few words.');
      return;
    }
    
    // Submit the post
    onSubmit(content, mood);
    
    // Reset form
    setContent('');
    setMood('neutral');
    setError('');
  };
  
  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-md p-4 mb-6 animate-fade-in">
      <div className="mb-4">
        <label htmlFor="content" className="block text-sm font-medium text-deepblue mb-1">
          Share your thoughts or experience
        </label>
        <textarea
          id="content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="input-field h-24"
          placeholder="What's on your mind? Your post will be anonymous."
        ></textarea>
        {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
      </div>
      
      <div className="mb-4">
        <label htmlFor="mood" className="block text-sm font-medium text-deepblue mb-1">
          How are you feeling?
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
      
      <div className="flex justify-end">
        <button type="submit" className="btn">
          Share Anonymously
        </button>
      </div>
      
      <p className="text-xs text-gray-500 mt-2">
        Your post will be shared anonymously. Please be respectful and supportive of others.
      </p>
    </form>
  );
};

export default PostForm;
