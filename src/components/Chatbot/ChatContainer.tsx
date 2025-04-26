
import React, { useState, useEffect, useRef } from 'react';
import ChatMessage from './ChatMessage';
import ChatInput from './ChatInput';
import { saveChat } from '../../utils/supabaseClient';
import { sendMessageToGemini, createPersonalizedPrompt } from '../../services/geminiService';
import RecommendationPanel from '../Recommendations/RecommendationPanel';
import { toast } from "sonner";

// Define the message type
interface Message {
  role: 'user' | 'assistant';
  content: string;
  id: string;
}

// Store user context for more personalized responses
interface UserContext {
  name?: string;
  recentMoods?: string[];
  preferredTopics?: string[];
  previousInteractions?: string[];
}

const ChatContainer: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showRecommendations, setShowRecommendations] = useState(false);
  const [currentMood, setCurrentMood] = useState('');
  const chatContainerRef = useRef<HTMLDivElement>(null);
  const messageCountRef = useRef(0);
  const [userContext, setUserContext] = useState<UserContext>({
    previousInteractions: []
  });
  
  // Initialize with welcome message
  useEffect(() => {
    const initialMessage: Message = {
      role: 'assistant',
      content: 'Hello! I\'m your MindMosaic companion. How are you feeling today?',
      id: 'welcome-msg'
    };
    setMessages([initialMessage]);
  }, []);
  
  // Update user context when messages change
  useEffect(() => {
    if (messages.length > 1) {
      // Extract the last few messages for context
      const recentMessages = messages.slice(-5).map(msg => 
        `${msg.role === 'user' ? 'User' : 'Assistant'}: ${msg.content}`
      );
      
      setUserContext(prev => ({
        ...prev,
        previousInteractions: recentMessages
      }));
    }
  }, [messages]);
  
  // Detect user's mood from messages
  const detectUserMood = (content: string): string => {
    const lowerContent = content.toLowerCase();
    
    const moodPatterns = {
      anxious: ["anxious", "nervous", "worried", "stress", "panic", "anxiety"],
      sad: ["sad", "down", "depressed", "unhappy", "miserable", "lonely", "grief"],
      angry: ["angry", "mad", "frustrated", "irritated", "annoyed", "furious"],
      happy: ["happy", "good", "great", "wonderful", "excited", "joy", "pleased"],
      neutral: ["okay", "fine", "alright", "so-so", "normal"]
    };
    
    for (const [mood, keywords] of Object.entries(moodPatterns)) {
      for (const keyword of keywords) {
        if (lowerContent.includes(keyword)) {
          return mood;
        }
      }
    }
    
    return "neutral";
  };
  
  // Handle sending a new message
  const handleSendMessage = async (content: string) => {
    if (!content.trim()) return;
    
    // Add user message to chat
    const userMessage: Message = {
      role: 'user',
      content,
      id: `user-${Date.now()}`
    };
    
    setMessages(prev => [...prev, userMessage]);
    setIsLoading(true);
    
    try {
      // Detect mood from message
      const detectedMood = detectUserMood(content);
      
      // Update user context with detected mood
      const updatedMoods = userContext.recentMoods 
        ? [...userContext.recentMoods.slice(-2), detectedMood] 
        : [detectedMood];
        
      setUserContext(prev => ({
        ...prev,
        recentMoods: updatedMoods
      }));
      
      // Create personalized prompt with context
      const personalizedPrompt = createPersonalizedPrompt(content, userContext);
      
      // Get response from Gemini API
      const botResponseText = await sendMessageToGemini(personalizedPrompt);
      
      const botMessage: Message = {
        role: 'assistant',
        content: botResponseText,
        id: `assistant-${Date.now()}`
      };
      
      // Add bot message to chat
      setMessages(prev => [...prev, botMessage]);
      
      // Save both messages (would save to Supabase in a real app)
      await saveChat(userMessage);
      await saveChat(botMessage);
      
      // Increment message count
      messageCountRef.current += 2;
      
      // After a few messages, analyze mood and show recommendations
      if (messageCountRef.current >= 4 && !showRecommendations) {
        setCurrentMood(detectedMood);
        setShowRecommendations(true);
      }
    } catch (error) {
      console.error('Error processing message:', error);
      toast.error("Sorry, there was a problem connecting to the chatbot. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };
  
  // Handle closing recommendations
  const handleCloseRecommendations = () => {
    setShowRecommendations(false);
  };
  
  // Scroll to bottom when messages change
  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [messages]);
  
  return (
    <div className="flex flex-col h-[calc(100vh-12rem)]">
      <div className="flex flex-1 overflow-hidden">
        {/* Main chat container */}
        <div className="flex-1 flex flex-col">
          <div 
            ref={chatContainerRef}
            className="flex-1 overflow-y-auto p-4 bg-freshstart/30 rounded-lg"
          >
            {messages.map((message, index) => (
              <ChatMessage
                key={message.id}
                role={message.role}
                content={message.content}
                isLatest={index === messages.length - 1}
              />
            ))}
            {isLoading && (
              <div className="flex justify-start my-2">
                <div className="bot-message flex space-x-2 items-center">
                  <div className="w-2 h-2 bg-white rounded-full animate-bounce"></div>
                  <div className="w-2 h-2 bg-white rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                  <div className="w-2 h-2 bg-white rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
                </div>
              </div>
            )}
          </div>
          
          <ChatInput 
            onSendMessage={handleSendMessage} 
            isLoading={isLoading}
          />
        </div>
        
        {/* Recommendations panel (only shown after mood analysis) */}
        {showRecommendations && (
          <div className="hidden md:block w-1/3 ml-4 animate-slide-in">
            <RecommendationPanel 
              mood={currentMood} 
              onClose={handleCloseRecommendations}
            />
          </div>
        )}
      </div>
      
      {/* Mobile recommendations (shown below chat on small screens) */}
      {showRecommendations && (
        <div className="md:hidden mt-4 animate-slide-in">
          <RecommendationPanel 
            mood={currentMood} 
            onClose={handleCloseRecommendations}
          />
        </div>
      )}
    </div>
  );
};

export default ChatContainer;
