
import React, { useState, useRef } from 'react';
import { isSpeechRecognitionSupported, startListening } from '../../utils/voiceUtils';

interface ChatInputProps {
  onSendMessage: (message: string) => void;
  isLoading: boolean;
}

const ChatInput: React.FC<ChatInputProps> = ({ onSendMessage, isLoading }) => {
  const [message, setMessage] = useState('');
  const [isListening, setIsListening] = useState(false);
  const recognitionRef = useRef<any>(null);
  
  const handleSend = () => {
    if (message.trim() && !isLoading) {
      onSendMessage(message);
      setMessage('');
    }
  };
  
  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };
  
  const toggleSpeechRecognition = () => {
    if (!isSpeechRecognitionSupported()) {
      alert('Speech recognition is not supported in your browser.');
      return;
    }
    
    if (isListening) {
      // Stop listening
      if (recognitionRef.current) {
        recognitionRef.current.stop();
        recognitionRef.current = null;
      }
      setIsListening(false);
    } else {
      // Start listening
      setIsListening(true);
      
      recognitionRef.current = startListening(
        // onResult callback
        (text) => {
          setMessage(prev => prev + ' ' + text);
        },
        // onEnd callback
        () => {
          setIsListening(false);
          recognitionRef.current = null;
        }
      );
    }
  };
  
  return (
    <div className="mt-4 flex items-center space-x-2">
      <button
        type="button"
        onClick={toggleSpeechRecognition}
        className={`p-2 rounded-full ${isListening ? 'bg-rustred text-white' : 'bg-gray-100 text-deepblue'}`}
        title={isListening ? 'Stop listening' : 'Start voice input'}
      >
        {isListening ? (
          // Animated microphone icon when listening
          <div className="w-6 h-6 flex items-center justify-center">
            <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
          </div>
        ) : (
          // Microphone icon when not listening
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
          </svg>
        )}
      </button>
      
      <textarea
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        onKeyDown={handleKeyPress}
        placeholder="Type your message..."
        className="input-field flex-1 resize-none h-12 py-3"
        disabled={isLoading}
      />
      
      <button
        onClick={handleSend}
        disabled={!message.trim() || isLoading}
        className={`p-2 rounded-full ${
          message.trim() && !isLoading
            ? 'bg-rustred text-white hover:bg-harmony'
            : 'bg-gray-200 text-gray-500 cursor-not-allowed'
        }`}
      >
        {isLoading ? (
          // Loading spinner
          <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
        ) : (
          // Send icon
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
          </svg>
        )}
      </button>
    </div>
  );
};

export default ChatInput;
