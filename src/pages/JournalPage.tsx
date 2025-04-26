import React, { useEffect, useState } from 'react';
import { saveJournalEntry, loadJournalEntries, supabase } from '../utils/supabaseClient';
import Header from '../components/Layout/Header';
import Footer from '../components/Layout/Footer';
import FloatingChatButton from '../components/Chatbot/FloatingChatButton';
import EmergencyButton from '../components/Layout/EmergencyButton';

const JournalPage = () => {
  const [journalText, setJournalText] = useState('');
  const [journals, setJournals] = useState<any[]>([]);
  const [isFormOpen, setIsFormOpen] = useState(true);

  useEffect(() => {
    const fetchJournals = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        const entries = await loadJournalEntries(user.id);
        setJournals(entries || []);
      }
    };
    fetchJournals();
  }, []);

  const handleSaveJournal = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const newEntry = await saveJournalEntry({ content: journalText }, user.id);

      if (newEntry) {
        setJournals(prev => [newEntry, ...prev]);  // Add the new entry into local state
        setJournalText('');
      }

      setIsFormOpen(false); // Close the form after save
    } catch (error) {
      console.error('Error saving journal:', error);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1 bg-freshstart/30 container mx-auto px-4 py-6">
        <h1 className="text-3xl font-semibold text-deepblue mb-6">Journal Your Thoughts</h1>

        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <textarea
            value={journalText}
            onChange={(e) => setJournalText(e.target.value)}
            placeholder="Write about your day..."
            className="w-full h-32 border rounded p-4 mb-4"
          ></textarea>

          <button
            onClick={handleSaveJournal}
            className="bg-rustred text-white px-6 py-2 rounded hover:bg-harmony transition"
          >
            Save Journal
          </button>
        </div>

        <div>
          <h2 className="text-2xl font-semibold text-harmony mb-4">Previous Journal Entries</h2>

          {journals.length > 0 ? (
            <div className="space-y-4">
              {journals.map((entry, index) => (
                <div key={index} className="bg-white p-4 rounded shadow">
                  <p className="text-sm text-gray-500">{new Date(entry.created_at).toLocaleDateString()}</p>
                  <p className="text-deepblue mt-2">{entry.content}</p>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-400">No journal entries yet.</p>
          )}
        </div>
      </main>
      
      <Footer />
      <FloatingChatButton />
      <EmergencyButton />
    </div>
  );
};

export default JournalPage;
