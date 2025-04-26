
# Integrating Gemini API with MindMosaic

This guide will walk you through how to connect Google's Gemini API to your MindMosaic application for enhanced chatbot capabilities.

## Prerequisites

1. A Google Cloud account
2. API key for Gemini API
3. Node.js and Express.js installed

## Step 1: Set Up Your Backend Server

First, you need to create a simple Express server to handle the Gemini API calls:

```javascript
// backend/server.js
const express = require('express');
const cors = require('cors');
const { GoogleGenerativeAI } = require('@google/generative-ai');
require('dotenv').config();

// Initialize Express app
const app = express();
app.use(cors());
app.use(express.json());

// Initialize Gemini API
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// Chat endpoint
app.post('/api/chat', async (req, res) => {
  try {
    const { messages, userData } = req.body;
    
    // Format the conversation history for Gemini
    const formattedHistory = messages.map(msg => ({
      role: msg.role === 'user' ? 'user' : 'model',
      parts: [{ text: msg.content }]
    }));
    
    // Add user data context if available
    let systemPrompt = "You are MindMosaic's supportive mental wellness companion. ";
    
    if (userData) {
      // Add mood history context if available
      if (userData.moodHistory && userData.moodHistory.length > 0) {
        systemPrompt += "Based on the user's mood history: ";
        userData.moodHistory.forEach(entry => {
          systemPrompt += `${entry.date}: ${entry.mood} (intensity: ${entry.intensity}), `;
        });
      }
      
      // Add journal context if available
      if (userData.recentJournalEntries && userData.recentJournalEntries.length > 0) {
        systemPrompt += "Recent journal entries: ";
        userData.recentJournalEntries.forEach(entry => {
          systemPrompt += `${entry.date}: ${entry.content.substring(0, 100)}..., `;
        });
      }
    }
    
    // Add final instructions
    systemPrompt += "Provide supportive, empathetic responses. Don't diagnose but do suggest healthy coping strategies. Keep responses concise (3-5 sentences max).";
    
    // Create a chat model
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });
    
    // Start a chat session
    const chat = model.startChat({
      history: formattedHistory,
      generationConfig: {
        maxOutputTokens: 500,
        temperature: 0.7,
      },
      safetySettings: [
        {
          category: "HARM_CATEGORY_HARASSMENT",
          threshold: "BLOCK_MEDIUM_AND_ABOVE"
        },
        {
          category: "HARM_CATEGORY_HATE_SPEECH",
          threshold: "BLOCK_MEDIUM_AND_ABOVE"
        },
        {
          category: "HARM_CATEGORY_SEXUALLY_EXPLICIT",
          threshold: "BLOCK_MEDIUM_AND_ABOVE"
        },
        {
          category: "HARM_CATEGORY_DANGEROUS_CONTENT",
          threshold: "BLOCK_MEDIUM_AND_ABOVE"
        }
      ],
      systemInstruction: systemPrompt
    });

    // Generate response
    const result = await chat.sendMessage(messages[messages.length - 1].content);
    const response = result.response.text();
    
    res.json({ 
      role: 'assistant',
      content: response,
      id: Date.now().toString()
    });
  } catch (error) {
    console.error('Error with Gemini API:', error);
    res.status(500).json({ 
      error: 'Failed to process with Gemini API', 
      details: error.message 
    });
  }
});

// Start server
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
```

## Step 2: Set Up Environment Variables

Create a `.env` file in your backend directory:

```
GEMINI_API_KEY=your_gemini_api_key_here
PORT=3001
```

## Step 3: Install Required Packages

In your backend directory:

```bash
npm init -y
npm install express cors dotenv @google/generative-ai
```

## Step 4: Update the Frontend to Use the API

Replace the mock chat functionality in your frontend code. Here's how to modify the ChatContainer component:

```typescript
// src/components/Chatbot/ChatContainer.tsx

// Add this import
import { useState, useEffect, useRef } from 'react';

// Update the handleSendMessage function
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
    // Get user data for context
    const userData = {
      moodHistory: [], // You can populate this from your mood tracker data
      recentJournalEntries: [] // You can populate this from your journal entries
    };
    
    // Call the backend API with all message history for context
    const response = await fetch('http://localhost:3001/api/chat', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        messages: [...messages, userMessage],
        userData
      }),
    });
    
    if (!response.ok) {
      throw new Error('Failed to get response from chatbot API');
    }
    
    const botMessage: Message = await response.json();
    
    // Add bot message to chat
    setMessages(prev => [...prev, botMessage]);
    
    // Save messages to Supabase
    await saveChat(userMessage);
    await saveChat(botMessage);
    
    // Increment message count
    messageCountRef.current += 2;
    
    // After a few messages, analyze mood and show recommendations
    if (messageCountRef.current >= 4 && !showRecommendations) {
      const newMessages = [...messages, userMessage, botMessage];
      const { mood } = analyzeUserMood(newMessages);
      setCurrentMood(mood);
      setShowRecommendations(true);
    }
  } catch (error) {
    console.error('Error processing message:', error);
    
    // Show an error message to the user
    const errorMessage: Message = {
      role: 'assistant',
      content: 'I apologize, but I encountered an error processing your message. Please try again later.',
      id: `error-${Date.now()}`
    };
    
    setMessages(prev => [...prev, errorMessage]);
  } finally {
    setIsLoading(false);
  }
};
```

## Step 5: Update chatbotUtils.ts

You can enhance the `analyzeUserMood` function to use Gemini API for more accurate mood detection:

```typescript
// src/utils/chatbotUtils.ts

// Add a new function to analyze mood with Gemini
export const analyzeMoodWithGemini = async (messages: Message[]): Promise<{ mood: string, confidence: number }> => {
  try {
    // Extract just the recent user messages for analysis
    const userMessages = messages
      .filter(msg => msg.role === 'user')
      .slice(-3)  // Last 3 user messages
      .map(msg => msg.content)
      .join('\n');
    
    const response = await fetch('http://localhost:3001/api/analyze-mood', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ text: userMessages }),
    });
    
    if (!response.ok) {
      throw new Error('Failed to analyze mood');
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error analyzing mood:', error);
    // Fallback to the simple keyword-based analysis
    return analyzeUserMood(messages);
  }
};
```

## Step 6: Add the Mood Analysis Endpoint to Your Backend

```javascript
// backend/server.js
// Add this endpoint

app.post('/api/analyze-mood', async (req, res) => {
  try {
    const { text } = req.body;
    
    // Create a model
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });
    
    // Create a prompt that asks Gemini to analyze the mood
    const prompt = `
    Analyze the following text and determine the primary emotional state of the person.
    Choose ONE of these categories: anxious, sad, angry, happy, calm, tired, neutral.
    Also rate the intensity of the emotion on a scale of 1-10.
    Format your answer as JSON like this: {"mood": "category", "confidence": number}
    
    Text to analyze:
    ${text}
    `;
    
    const result = await model.generateContent(prompt);
    const response = result.response.text();
    
    // Extract JSON from the response
    const jsonMatch = response.match(/\{.*\}/s);
    if (jsonMatch) {
      const moodData = JSON.parse(jsonMatch[0]);
      res.json(moodData);
    } else {
      throw new Error('Could not extract valid mood data from response');
    }
  } catch (error) {
    console.error('Error analyzing mood with Gemini API:', error);
    res.status(500).json({ 
      mood: 'neutral', 
      confidence: 0.5,
      error: error.message
    });
  }
});
```

## Step 7: Set Up CORS for Local Development

If you're running the frontend and backend on different ports during development:

```javascript
// backend/server.js
// Update the CORS configuration

app.use(cors({
  origin: 'http://localhost:5173', // Your Vite development server
  methods: ['GET', 'POST'],
  allowedHeaders: ['Content-Type']
}));
```

## Step 8: Run Both Servers

1. In one terminal, start your backend:
```bash
cd backend
node server.js
```

2. In another terminal, start your frontend:
```bash
npm run dev
```

## Advanced Features

### Personalizing Responses Based on User History

To make Gemini's responses more personalized:

1. Create a function in your frontend to fetch user data:

```typescript
// src/utils/userDataUtils.ts

import { mockMoodData, mockJournalEntries } from './supabaseClient';

export const getUserContextData = async (userId: string) => {
  // In a real app, you would fetch this data from Supabase
  // For now, we'll use mock data
  
  return {
    moodHistory: mockMoodData.slice(-5), // Last 5 mood entries
    recentJournalEntries: mockJournalEntries.slice(-2) // Last 2 journal entries
  };
};
```

2. Update your chat component to include this data when sending messages:

```typescript
// In handleSendMessage
const userData = await getUserContextData('current-user-id');

// Then include this in your API call
```

### Adding Mood Analysis to Journal Entries

You can use Gemini to suggest mood categories for journal entries:

```javascript
// backend/server.js
// Add an endpoint for analyzing journal entries

app.post('/api/analyze-journal', async (req, res) => {
  try {
    const { text } = req.body;
    
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });
    
    const prompt = `
    Read this journal entry and provide:
    1. The primary mood (choose one: anxious, sad, angry, happy, calm, tired, neutral)
    2. Three key themes or topics mentioned
    3. One gentle self-care suggestion based on the content
    
    Format as JSON: {
      "detectedMood": "mood",
      "themes": ["theme1", "theme2", "theme3"],
      "suggestion": "suggestion text"
    }
    
    Journal entry:
    ${text}
    `;
    
    const result = await model.generateContent(prompt);
    const response = result.response.text();
    
    // Extract JSON from the response
    const jsonMatch = response.match(/\{.*\}/s);
    if (jsonMatch) {
      const analysisData = JSON.parse(jsonMatch[0]);
      res.json(analysisData);
    } else {
      throw new Error('Could not extract valid analysis data from response');
    }
  } catch (error) {
    console.error('Error analyzing journal with Gemini API:', error);
    res.status(500).json({ 
      detectedMood: 'neutral',
      themes: ["journaling", "reflection", "self-care"],
      suggestion: "Consider taking a few deep breaths and being kind to yourself today.",
      error: error.message
    });
  }
});
```

## Security Considerations

1. Always keep your API key secure and never expose it in frontend code
2. Use environment variables for sensitive information
3. Implement rate limiting to prevent abuse
4. Consider adding authentication to your API endpoints
5. Filter and sanitize user input before sending it to Gemini API

## Production Deployment

For production, you'll want to:

1. Deploy your Express backend to a service like Heroku, Vercel, or Google Cloud
2. Update your frontend to use the production API URL
3. Set up proper error handling and logging
4. Consider adding a caching layer for frequent requests
5. Implement proper user authentication and data privacy measures

## Troubleshooting

If you encounter issues:

1. Check your API key and ensure it's valid
2. Verify network requests in the browser dev tools
3. Check server logs for detailed error information
4. Make sure your Gemini API quota hasn't been exceeded
5. Test the API independently using a tool like Postman

Good luck with your Gemini API integration! This should give MindMosaic powerful AI capabilities to better support users' mental wellness journeys.
