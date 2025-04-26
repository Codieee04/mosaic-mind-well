
import React from 'react';
import Header from '../components/Layout/Header';
import Footer from '../components/Layout/Footer';
import GoalsList from '../components/Goals/GoalsList';
import FloatingChatButton from '../components/Chatbot/FloatingChatButton';
import EmergencyButton from '../components/Layout/EmergencyButton';

const GoalsPage = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1 bg-freshstart/30">
        <GoalsList />
      </main>
      
      <Footer />
      <FloatingChatButton />
      <EmergencyButton />
    </div>
  );
};

export default GoalsPage;
