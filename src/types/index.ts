
// Message types for chatbot
export interface Message {
  role: 'user' | 'assistant';
  content: string;
  id: string;
}

// Mood data for tracking
export interface MoodData {
  date: string;
  mood: string;
  intensity: number;
}

// Community post
export interface Post {
  id: string;
  content: string;
  mood: string;
  createdAt: string;
}

// Web Speech API types
export interface SpeechRecognition extends EventTarget {
  continuous: boolean;
  interimResults: boolean;
  lang: string;
  start: () => void;
  stop: () => void;
  abort: () => void;
  onresult: (event: any) => void;
  onerror: (event: any) => void;
  onend: () => void;
}

declare global {
  interface Window {
    SpeechRecognition: new () => SpeechRecognition;
    webkitSpeechRecognition: new () => SpeechRecognition;
  }
}
