
import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-white border-t mt-auto py-6">
      <div className="container mx-auto px-4">
        <div className="flex flex-col sm:flex-row justify-between items-center">
          <p className="text-sm text-deepblue/70">
            © {new Date().getFullYear()} MindMosaic. A mental wellness companion.
          </p>
          
          <div className="mt-4 sm:mt-0">
            <p className="text-sm text-deepblue/70">
              If you're in crisis, please call <a href="tel:988" className="font-medium hover:underline">988</a> (US) or see our <a href="/resources" className="font-medium hover:underline">Resources</a> page
            </p>
          </div>
        </div>
        
        <div className="mt-4 text-xs text-center text-deepblue/50">
          <p>MindMosaic is not a substitute for professional mental health treatment.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
