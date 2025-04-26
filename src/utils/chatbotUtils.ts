
// Chatbot utility functions (with mock responses since we're not connecting to Gemini API yet)

// Mood detection patterns (simple keyword matching)
const moodPatterns = {
  anxious: ["anxious", "nervous", "worried", "stress", "panic", "anxiety"],
  sad: ["sad", "down", "depressed", "unhappy", "miserable", "lonely", "grief"],
  angry: ["angry", "mad", "frustrated", "irritated", "annoyed", "furious"],
  happy: ["happy", "good", "great", "wonderful", "excited", "joy", "pleased"],
  neutral: ["okay", "fine", "alright", "so-so", "normal"]
};

// Detect mood from text
export const detectMood = (text: string): string => {
  const lowerText = text.toLowerCase();
  
  for (const [mood, keywords] of Object.entries(moodPatterns)) {
    for (const keyword of keywords) {
      if (lowerText.includes(keyword)) {
        return mood;
      }
    }
  }
  
  return "neutral";
};

// Mock chatbot response function since we're not connecting to Gemini API yet
export const getMockBotResponse = (message: string): string => {
  const mood = detectMood(message);
  const lowerMessage = message.toLowerCase();
  
  // Check for greeting
  if (lowerMessage.includes("hello") || lowerMessage.includes("hi") || 
      lowerMessage.match(/^hey/) || lowerMessage === "hey") {
    return "Hello! How are you feeling today?";
  }
  
  // Check for mood-related responses
  if (mood === "anxious") {
    return "I notice you might be feeling anxious. What's on your mind right now? Remember to take deep breaths - inhale for 4 counts, hold for 7, exhale for 8.";
  }
  
  if (mood === "sad") {
    return "I'm sorry you're feeling down. Would you like to talk more about what's making you feel this way? Sometimes expressing our feelings can help lighten the burden.";
  }
  
  if (mood === "angry") {
    return "I can sense you might be frustrated. It's okay to feel angry sometimes. Would it help to talk about what triggered these feelings?";
  }
  
  if (mood === "happy") {
    return "It's wonderful that you're feeling good! What's something that contributed to your positive mood today?";
  }
  
  // Check for questions about the app
  if (lowerMessage.includes("what can you do") || lowerMessage.includes("help me")) {
    return "I'm here to listen and chat about how you're feeling, suggest coping strategies, and help you track your mood over time. You can also check out the Community section to connect with others or use the Tracker to monitor your emotional wellbeing.";
  }
  
  // Default responses for general conversation
  const defaultResponses = [
    "Tell me more about that.",
    "How long have you been feeling this way?",
    "What do you think contributed to these feelings?",
    "Is there something specific you'd like to talk about today?",
    "Have you tried any coping strategies that have helped you before?",
    "Sometimes it helps to focus on what we can control. Is there a small step you could take today?",
    "Remember that your feelings are valid, whatever they may be.",
    "I'm here to listen whenever you need to talk."
  ];
  
  // Return a random default response
  return defaultResponses[Math.floor(Math.random() * defaultResponses.length)];
};

// Mock function for analyzing chat history and determining user's mood
export const analyzeUserMood = (chatHistory: any[]): { mood: string, confidence: number } => {
  // In a real implementation, you would analyze multiple messages
  // and use AI to determine the predominant mood
  
  // For now, just look at the last user message
  const userMessages = chatHistory.filter(msg => msg.role === 'user');
  
  if (userMessages.length === 0) {
    return { mood: 'neutral', confidence: 0.5 };
  }
  
  const lastUserMessage = userMessages[userMessages.length - 1].content;
  const detectedMood = detectMood(lastUserMessage);
  
  // Mock confidence level
  const confidence = detectedMood === 'neutral' ? 0.5 : 0.8;
  
  return { mood: detectedMood, confidence };
};
