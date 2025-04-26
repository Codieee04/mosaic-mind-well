
import React, { useState } from 'react';
import { MessageCircle, X } from 'lucide-react';
import { Dialog, DialogContent, DialogTitle } from '@/components/ui/dialog';
import ChatContainer from './ChatContainer';

const FloatingChatButton: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Floating button */}
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 bg-rustred hover:bg-harmony text-white rounded-full p-4 shadow-lg transition-transform duration-300 hover:scale-110 z-50"
        aria-label="Open chat"
      >
        <MessageCircle className="w-6 h-6" />
      </button>

      {/* Chat dialog */}
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="sm:max-w-[600px] h-[80vh] p-0 bg-freshstart overflow-hidden" aria-describedby="chat-description">
          <DialogTitle className="sr-only">Chat with MindMosaic</DialogTitle>
          <div id="chat-description" className="sr-only">
            Chat with the MindMosaic AI companion about your mental wellness
          </div>
          <div className="flex flex-col h-full">
            <div className="bg-harmony text-white p-4 flex justify-between items-center">
              <h2 className="font-semibold text-lg">MindMosaic Companion</h2>
              <button 
                onClick={() => setIsOpen(false)} 
                className="text-white hover:text-gray-200 transition-colors"
                aria-label="Close chat"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="flex-grow overflow-hidden p-4">
              <ChatContainer />
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default FloatingChatButton;
