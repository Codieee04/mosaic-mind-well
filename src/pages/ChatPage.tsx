
import React from 'react';
import Header from '../components/Layout/Header';
import Footer from '../components/Layout/Footer';
import EmergencyButton from '../components/Layout/EmergencyButton';
import FloatingChatButton from '../components/Chatbot/FloatingChatButton';
import MindfulMinutePopup from '../components/MindfulMinute/MindfulMinutePopup';

const ChatPage = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1 container mx-auto px-4 py-6">
        <h1 className="text-3xl font-semibold text-deepblue mb-6">Welcome to MindMosaic</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
          <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
            <h2 className="text-xl font-semibold text-harmony mb-4">Your Mental Wellness Journey</h2>
            <p className="text-deepblue/80 mb-4">
              MindMosaic is your companion for emotional wellbeing. Track your moods, journal your thoughts, 
              and connect with our supportive community.
            </p>
            <p className="text-deepblue/80">
              Need someone to talk to? Click the chat button in the bottom right corner to connect with
              our AI companion anytime.
            </p>
          </div>
          
          <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
            <h2 className="text-xl font-semibold text-harmony mb-4">Getting Started</h2>
            <ul className="space-y-2 text-deepblue/80">
              <li className="flex items-start">
                <span className="inline-block w-5 h-5 bg-rustred rounded-full text-white flex items-center justify-center mr-2 mt-0.5">1</span>
                <span>Track your daily mood in the Tracker section</span>
              </li>
              <li className="flex items-start">
                <span className="inline-block w-5 h-5 bg-rustred rounded-full text-white flex items-center justify-center mr-2 mt-0.5">2</span>
                <span>Set wellness goals and mark your daily achievements</span>
              </li>
              <li className="flex items-start">
                <span className="inline-block w-5 h-5 bg-rustred rounded-full text-white flex items-center justify-center mr-2 mt-0.5">3</span>
                <span>Journal your thoughts to build self-awareness</span>
              </li>
              <li className="flex items-start">
                <span className="inline-block w-5 h-5 bg-rustred rounded-full text-white flex items-center justify-center mr-2 mt-0.5">4</span>
                <span>Connect with the community for support and inspiration</span>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="bg-freshstart/50 rounded-lg p-6 border border-harmony/30">
          <h2 className="text-xl font-semibold text-deepblue mb-4">Wellness Tips</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-white p-4 rounded-lg">
              <h3 className="font-medium text-harmony mb-2">Mindful Breathing</h3>
              <p className="text-sm text-deepblue/70">
                Take 5 minutes to focus on your breath. Breathe in for 4 seconds, 
                hold for 7 seconds, and exhale for 8 seconds.
              </p>
            </div>
            <div className="bg-white p-4 rounded-lg">
              <h3 className="font-medium text-harmony mb-2">Daily Movement</h3>
              <p className="text-sm text-deepblue/70">
                Even a short 10-minute walk can boost your mood and energy levels.
                Try to move your body every day.
              </p>
            </div>
            <div className="bg-white p-4 rounded-lg">
              <h3 className="font-medium text-harmony mb-2">Digital Detox</h3>
              <p className="text-sm text-deepblue/70">
                Take regular breaks from screens. Set aside some time each day to 
                disconnect and engage with the physical world around you.
              </p>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
      <FloatingChatButton />
      <EmergencyButton />
      <MindfulMinutePopup />
    </div>
  );
};

export default ChatPage;
