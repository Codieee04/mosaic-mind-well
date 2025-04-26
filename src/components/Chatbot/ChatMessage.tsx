
import React, { useEffect, useRef } from 'react';

interface ChatMessageProps {
  role: 'user' | 'assistant';
  content: string;
  isLatest?: boolean;
}

const ChatMessage: React.FC<ChatMessageProps> = ({ role, content, isLatest }) => {
  const messageRef = useRef<HTMLDivElement>(null);
  
  // Scroll to the message when it's new
  useEffect(() => {
    if (isLatest && messageRef.current) {
      messageRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [isLatest]);
  
  return (
    <div 
      ref={messageRef}
      className={`${role === 'assistant' ? 'bot-message' : 'user-message'} animate-fade-in`}
    >
      {content}
    </div>
  );
};

export default ChatMessage;
