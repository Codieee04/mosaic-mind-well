
import React from 'react';
import Header from '../components/Layout/Header';
import Footer from '../components/Layout/Footer';
import MoodTracker from '../components/Tracker/MoodTracker';
import EmergencyButton from '../components/Layout/EmergencyButton';

const TrackerPage = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1">
        <MoodTracker />
      </main>
      
      <Footer />
      <EmergencyButton />
    </div>
  );
};

export default TrackerPage;
