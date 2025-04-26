
import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { X } from 'lucide-react';

const quotes = [
  "Breathe in peace, breathe out tension.",
  "The present moment is a gift. That's why it's called the present.",
  "You are not your thoughts. You are the awareness behind them.",
  "Peace comes from within. Do not seek it without.",
  "Every moment is a fresh beginning.",
  "Be kind to your mind.",
  "You cannot control the waves, but you can learn to surf.",
  "Your calm mind is the ultimate weapon against your challenges.",
  "Within you is a stillness and sanctuary to which you can retreat at any time.",
  "The quieter you become, the more you can hear."
];

const MindfulMinutePopup: React.FC = () => {
  const [open, setOpen] = useState(false);
  const [quote, setQuote] = useState("");
  const [breatheIn, setBreatheIn] = useState(true);

  useEffect(() => {
    // Check if this is the user's first visit of the session
    const hasSeenPopup = sessionStorage.getItem('mindful_minute_seen');
    
    if (!hasSeenPopup) {
      // Set a random quote
      const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];
      setQuote(randomQuote);
      
      // Show popup after a short delay
      const timer = setTimeout(() => {
        setOpen(true);
        sessionStorage.setItem('mindful_minute_seen', 'true');
      }, 1500);
      
      return () => clearTimeout(timer);
    }
  }, []);

  useEffect(() => {
    // Animation for breathing
    if (open) {
      const breathingInterval = setInterval(() => {
        setBreatheIn(prev => !prev);
      }, 4000);
      
      return () => clearInterval(breathingInterval);
    }
  }, [open]);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-md p-0 overflow-hidden bg-white rounded-lg">
        <div className="relative p-6">
          <button 
            onClick={() => setOpen(false)} 
            className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
          
          <h2 className="text-xl font-semibold text-deepblue text-center mb-6">
            Mindful Minute
          </h2>
          
          <div className="flex flex-col items-center justify-center">
            {/* Breathing animation */}
            <div className="mb-8 flex items-center justify-center">
              <div
                className={`w-32 h-32 rounded-full bg-harmony/20 flex items-center justify-center transition-all duration-4000 ease-in-out ${
                  breatheIn ? 'transform scale-75' : 'transform scale-100'
                }`}
              >
                <div
                  className={`w-24 h-24 rounded-full bg-harmony/40 flex items-center justify-center transition-all duration-4000 ease-in-out ${
                    breatheIn ? 'transform scale-75' : 'transform scale-100'
                  }`}
                >
                  <div
                    className={`w-16 h-16 rounded-full bg-harmony flex items-center justify-center text-white font-medium transition-all duration-4000 ease-in-out ${
                      breatheIn ? 'transform scale-75' : 'transform scale-100'
                    }`}
                  >
                    {breatheIn ? "Breathe In" : "Breathe Out"}
                  </div>
                </div>
              </div>
            </div>
            
            {/* Quote */}
            <p className="text-deepblue text-center mb-4 font-light italic">
              "{quote}"
            </p>
            
            <p className="text-gray-500 text-sm text-center">
              Take a moment to breathe and center yourself
            </p>
            
            <button
              onClick={() => setOpen(false)}
              className="mt-6 px-6 py-2 bg-harmony hover:bg-rustred text-white rounded-md transition-colors"
            >
              Continue to MindMosaic
            </button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default MindfulMinutePopup;
