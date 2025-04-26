
# MindMosaic - Mental Wellness Web Application

MindMosaic is a calm, professional, and beginner-friendly mental wellness web application designed to provide emotional support, track moods, and foster community sharing in a safe environment.

## Features

- **AI Chatbot**: Have conversational check-ins about your emotional state
- **Mood Detection**: Get personalized recommendations based on your mood
- **Voice Support**: Use speech-to-text for input and text-to-speech for responses
- **Community Wall**: Share and view anonymous posts from community members
- **Mood Tracker**: Track your emotional state over time with visual charts
- **Emergency Support**: Quick access to crisis resources

## Tech Stack

- **Frontend**: React 18 with TypeScript, Vite, Tailwind CSS
- **UI Components**: Custom components with shadcn/ui
- **Charts**: Recharts for mood visualization
- **Voice**: Web Speech API for accessibility
- **Routing**: React Router

## Project Structure

- `/src/components/` - Reusable UI components
  - `/Chatbot/` - Chatbot interface components
  - `/Community/` - Community wall components
  - `/Layout/` - Header, footer, and common layout elements
  - `/Recommendations/` - Mood-based recommendation components
  - `/Tracker/` - Mood tracking and visualization components
- `/src/pages/` - Main application pages
- `/src/utils/` - Utility functions for voice, chatbot, and data

## Getting Started

1. Clone the repository
2. Install dependencies:
   ```
   npm install
   ```
3. Start the development server:
   ```
   npm run dev
   ```
4. Open your browser and visit `http://localhost:8080`

## Customizing the Application

### Adding New Mood Types

To add new mood types, update the following files:
- `src/utils/chatbotUtils.ts` - Add mood detection patterns
- `src/utils/supabaseClient.ts` - Add recommendations for the new mood
- `src/components/Tracker/MoodForm.tsx` - Add the mood to the options list
- `src/components/Community/PostForm.tsx` - Add the mood to the options list

### Modifying the Chatbot Responses

To change how the chatbot responds to different inputs:
- Update the `getMockBotResponse` function in `src/utils/chatbotUtils.ts`
- When connecting to a real AI API like Gemini, replace this function with API calls

### Customizing the Design

The application uses a calming color palette defined in:
- `tailwind.config.ts` - Custom color definitions
- `src/index.css` - Global styles and theme variables

## Browser Compatibility

This application uses the Web Speech API for voice features, which has varying support across browsers:
- Chrome/Edge: Full support
- Firefox: Partial support (some voice features may not work)
- Safari: Limited support

## Important Notes

- This application is a prototype and not a substitute for professional mental health treatment
- The chatbot uses mock responses and simulated mood detection
- In a production environment, connect to Supabase for data persistence and a real AI API for chatbot responses

## License

This project is intended for educational purposes.

