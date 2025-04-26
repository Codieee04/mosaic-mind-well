
import React from 'react';
import Header from '../components/Layout/Header';
import Footer from '../components/Layout/Footer';
import CommunityWall from '../components/Community/CommunityWall';
import EmergencyButton from '../components/Layout/EmergencyButton';

const CommunityPage = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1">
        <CommunityWall />
      </main>
      
      <Footer />
      <EmergencyButton />
    </div>
  );
};

export default CommunityPage;
