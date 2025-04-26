
import React, { useState } from 'react';
import JournalEntry from './JournalEntry';
import JournalForm from './JournalForm';
import { mockJournalEntries } from '../../utils/supabaseClient';

interface JournalEntry {
  id: string;
  date: string;
  mood: string;
  intensity: number;
  content: string;
}

const JournalList: React.FC = () => {
  const [entries, setEntries] = useState<JournalEntry[]>(mockJournalEntries);
  const [isFormOpen, setIsFormOpen] = useState(false);
  
  const handleEntryAdded = (entry: JournalEntry) => {
    setEntries(prev => [entry, ...prev]);
    setIsFormOpen(false);
  };

  return (
    <div className="page-container">
      <h2 className="text-2xl font-bold text-deepblue mb-2">Mood Journal</h2>
      <p className="text-lg text-deepblue/70 mb-6">
        Track your thoughts and feelings to identify patterns and build self-awareness.
      </p>
      
      <button
        onClick={() => setIsFormOpen(!isFormOpen)}
        className="mb-8 bg-rustred hover:bg-harmony text-white px-6 py-3 rounded-md transition-colors"
      >
        {isFormOpen ? 'Cancel' : 'Add New Journal Entry'}
      </button>
      
      {isFormOpen && (
        <JournalForm 
          onEntryAdded={handleEntryAdded}
          onCancel={() => setIsFormOpen(false)}
        />
      )}
      
      {entries.length === 0 ? (
        <div className="text-center py-10 bg-white rounded-lg shadow">
          <p className="text-gray-500">No journal entries yet. Start by adding your first entry!</p>
        </div>
      ) : (
        entries.map(entry => (
          <JournalEntry
            key={entry.id}
            id={entry.id}
            date={entry.date}
            mood={entry.mood}
            intensity={entry.intensity}
            content={entry.content}
          />
        ))
      )}
    </div>
  );
};

export default JournalList;
