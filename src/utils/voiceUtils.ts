
// Voice utility functions using the Web Speech API

// Check if browser supports speech synthesis
export const isSpeechSynthesisSupported = () => {
  return 'speechSynthesis' in window;
};

// Check if browser supports speech recognition
export const isSpeechRecognitionSupported = () => {
  return 'SpeechRecognition' in window || 'webkitSpeechRecognition' in window;
};

// Text-to-speech function
export const speak = (text: string) => {
  if (!isSpeechSynthesisSupported()) {
    console.error('Speech synthesis not supported in this browser.');
    return;
  }

  // Create speech synthesis utterance
  const utterance = new SpeechSynthesisUtterance(text);
  
  // Get all available voices
  const voices = window.speechSynthesis.getVoices();
  
  // Try to find a female US English voice
  const femaleUSVoice = voices.find(voice => 
    voice.lang.includes('en-US') && voice.name.includes('Female')
  );
  
  // Set the voice (use the female US voice if found, otherwise use default)
  if (femaleUSVoice) {
    utterance.voice = femaleUSVoice;
  }
  
  // Additional settings
  utterance.rate = 1; // Speed: 0.1 to 10
  utterance.pitch = 1; // Pitch: 0 to 2
  utterance.volume = 1; // Volume: 0 to 1
  
  // Speak the text
  window.speechSynthesis.speak(utterance);
};

// Define a SpeechRecognition type to solve type issues
interface SpeechRecognitionType extends EventTarget {
  lang: string;
  continuous: boolean;
  interimResults: boolean;
  start: () => void;
  stop: () => void;
  onresult: (event: any) => void;
  onend: () => void;
  onerror: (event: any) => void;
}

// Speech-to-text function
export const startListening = (
  onResult: (text: string) => void,
  onEnd: () => void
) => {
  if (!isSpeechRecognitionSupported()) {
    console.error('Speech recognition not supported in this browser.');
    return null;
  }
  
  // Initialize speech recognition with proper type handling
  const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
  const recognition = new SpeechRecognition() as SpeechRecognitionType;
  
  // Configure recognition
  recognition.lang = 'en-US';
  recognition.continuous = false;
  recognition.interimResults = false;
  
  // Set up event handlers
  recognition.onresult = (event) => {
    const transcript = event.results[0][0].transcript;
    onResult(transcript);
  };
  
  recognition.onend = () => {
    onEnd();
  };
  
  recognition.onerror = (event) => {
    console.error('Speech recognition error:', event.error);
    onEnd();
  };
  
  // Start listening
  recognition.start();
  
  // Return the recognition object so it can be stopped if needed
  return recognition;
};

// Stop speech-to-text
export const stopListening = (recognition: SpeechRecognitionType | null) => {
  if (recognition) {
    recognition.stop();
  }
};
