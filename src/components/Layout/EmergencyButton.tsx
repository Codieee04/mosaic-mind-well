
import React, { useState } from 'react';

const EmergencyButton = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  
  return (
    <div className="fixed bottom-4 right-4 z-50">
      {isExpanded ? (
        <div className="bg-white rounded-lg shadow-lg p-4 animate-fade-in">
          <h3 className="text-lg font-medium mb-3">Need immediate help?</h3>
          
          <div className="space-y-2">
            <a 
              href="tel:988" 
              className="btn bg-destructive hover:bg-destructive/90 w-full flex items-center justify-center"
            >
              Call 988 Crisis Line
            </a>
            
            <a 
              href="sms:988" 
              className="btn bg-deepblue hover:bg-deepblue/90 w-full flex items-center justify-center"
            >
              Text 988 Crisis Line
            </a>
            
            <button 
              onClick={() => setIsExpanded(false)}
              className="btn bg-gray-200 text-deepblue hover:bg-gray-300 w-full"
            >
              Close
            </button>
          </div>
          
          <p className="text-xs text-gray-500 mt-2">
            988 is available 24/7 for mental health crises (US only)
          </p>
        </div>
      ) : (
        <button 
          onClick={() => setIsExpanded(true)}
          className="emergency-button"
        >
          Need Help Now?
        </button>
      )}
    </div>
  );
};

export default EmergencyButton;
