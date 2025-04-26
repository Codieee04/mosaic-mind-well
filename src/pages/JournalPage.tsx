
import React from 'react';
import Header from '../components/Layout/Header';
import Footer from '../components/Layout/Footer';
import JournalList from '../components/Journal/JournalList';
import FloatingChatButton from '../components/Chatbot/FloatingChatButton';
import EmergencyButton from '../components/Layout/EmergencyButton';

const JournalPage = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1 bg-freshstart/30">
        <JournalList />
      </main>
      
      <Footer />
      <FloatingChatButton />
      <EmergencyButton />
    </div>
  );
};

export default JournalPage;
