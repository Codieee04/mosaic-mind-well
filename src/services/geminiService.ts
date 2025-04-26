
// Gemini API service for chat functionality

interface GeminiResponse {
  reply: string;
}

interface GeminiRequestContent {
  parts: { text: string }[];
}

interface GeminiRequest {
  contents: GeminiRequestContent[];
}

// The API key is hardcoded here for demonstration purposes
// In a production environment, this would be stored in a server-side environment variable
const GEMINI_API_KEY = "AIzaSyCPdZLsmYegdBnAWNgIxbUU5Xy6ZVZ28Wo";
const GEMINI_API_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${GEMINI_API_KEY}`;

/**
 * Send a message to the Gemini API and get a response
 * @param message - The user's message to send to Gemini
 * @returns The reply from Gemini
 */
export const sendMessageToGemini = async (message: string): Promise<string> => {
  try {
    const request: GeminiRequest = {
      contents: [
        {
          parts: [{ text: message }]
        }
      ]
    };

    const response = await fetch(GEMINI_API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(request)
    });

    if (!response.ok) {
      throw new Error(`Gemini API error: ${response.status}`);
    }

    const data = await response.json();
    
    // Extract the text from the response
    if (data.candidates && 
        data.candidates[0] && 
        data.candidates[0].content && 
        data.candidates[0].content.parts && 
        data.candidates[0].content.parts[0]) {
      return data.candidates[0].content.parts[0].text;
    } else {
      console.error("Unexpected Gemini API response format:", data);
      return "I'm sorry, I couldn't process that request. Please try again.";
    }
  } catch (error) {
    console.error("Error calling Gemini API:", error);
    return "Sorry, I'm having trouble connecting right now. Please try again later.";
  }
};

// For user personalization, we'll need to add context to our Gemini requests
// This function creates a prompt with user context for more personalized responses
export const createPersonalizedPrompt = (
  message: string,
  userContext?: {
    name?: string;
    recentMoods?: string[];
    preferredTopics?: string[];
    previousInteractions?: string[];
  }
): string => {
  let contextPrompt = "";
  
  if (userContext) {
    if (userContext.name) {
      contextPrompt += `The user's name is ${userContext.name}. `;
    }
    
    if (userContext.recentMoods && userContext.recentMoods.length > 0) {
      contextPrompt += `Recently, they have been feeling ${userContext.recentMoods.join(', ')}. `;
    }
    
    if (userContext.preferredTopics && userContext.preferredTopics.length > 0) {
      contextPrompt += `They're interested in ${userContext.preferredTopics.join(', ')}. `;
    }
    
    if (userContext.previousInteractions && userContext.previousInteractions.length > 0) {
      contextPrompt += `Recent conversation history: ${userContext.previousInteractions.join(' ')} `;
    }
    
    // Add more specific context for the mental health focus
    contextPrompt += "You are a supportive, empathetic mental wellness assistant. Provide compassionate, thoughtful responses ";
    contextPrompt += "focused on mental wellbeing. Never provide medical advice, and always encourage seeking professional help for serious concerns. ";
    contextPrompt += "Maintain a calm, supportive tone. ";
    
    return `${contextPrompt}\n\nUser message: ${message}`;
  }
  
  return message;
};
