
// This is a placeholder for the Supabase client
// Replace with actual Supabase setup when connected

// Mock data for development
export const mockChatHistory = [
  { role: 'assistant', content: 'Hello! How are you feeling today?', id: '1' },
  { role: 'user', content: 'I\'m feeling a bit anxious today.', id: '2' },
  { role: 'assistant', content: 'I\'m sorry to hear that. Would you like to talk about what\'s making you feel anxious?', id: '3' },
];

export const mockMoodData = [
  { date: '2023-04-20', mood: 'anxious', intensity: 7 },
  { date: '2023-04-21', mood: 'calm', intensity: 6 },
  { date: '2023-04-22', mood: 'happy', intensity: 8 },
  { date: '2023-04-23', mood: 'sad', intensity: 4 },
  { date: '2023-04-24', mood: 'anxious', intensity: 5 },
  { date: '2023-04-25', mood: 'calm', intensity: 7 },
  { date: '2023-04-26', mood: 'happy', intensity: 9 },
];

export const mockCommunityPosts = [
  { 
    id: '1', 
    content: 'I finally took a walk outside today after weeks of anxiety keeping me indoors. Small steps.', 
    mood: 'hopeful', 
    createdAt: '2023-04-25' 
  },
  { 
    id: '2', 
    content: 'Having trouble sleeping lately. Any tips from the community?', 
    mood: 'tired', 
    createdAt: '2023-04-24' 
  },
  { 
    id: '3', 
    content: 'Just wanted to share that my therapy session today was really productive. Feeling grateful.', 
    mood: 'grateful', 
    createdAt: '2023-04-23' 
  },
  { 
    id: '4', 
    content: 'Started journaling this week and it\'s already helping with my anxiety.', 
    mood: 'calm', 
    createdAt: '2023-04-22' 
  },
];

export const mockRecommendations = {
  anxious: [
    'Try deep breathing: Inhale for 4 counts, hold for 7, exhale for 8',
    'Go for a short walk outside if possible',
    'Listen to calming music or nature sounds',
    'Practice progressive muscle relaxation'
  ],
  sad: [
    'Reach out to a supportive friend or family member',
    'Watch a comforting movie or show',
    'Practice self-compassion by writing down three things you appreciate about yourself',
    'Create something - art, music, writing - to express your feelings'
  ],
  stressed: [
    'Take a break and stretch for 5 minutes',
    'Write down what is worrying you to get it out of your head',
    'Make yourself a soothing cup of tea',
    'Try a guided meditation focused on stress relief'
  ],
  angry: [
    'Physical activity can help process anger - try a brisk walk or jumping jacks',
    'Write down your thoughts without censoring',
    'Practice "square breathing" - equal counts of inhale, hold, exhale, hold',
    'Remove yourself from the situation if possible and return when calmer'
  ],
  happy: [
    'Savor this feeling - write down what contributed to your happiness',
    'Share your good mood with someone else through a kind gesture',
    'Take a photo to capture this moment',
    'Express gratitude for three things in your life right now'
  ]
};

// Mock wellness goals data
export const mockWellnessGoals = [
  { id: '1', title: 'Drink 8 glasses of water', completed: false },
  { id: '2', title: 'Meditate for 10 minutes', completed: false },
  { id: '3', title: 'Take a 15-minute walk', completed: false },
  { id: '4', title: 'Practice deep breathing', completed: false },
  { id: '5', title: 'Write in journal', completed: false },
];

// Mock journal entries
export const mockJournalEntries = [
  { 
    id: '1', 
    date: '2023-04-26',
    mood: 'calm',
    intensity: 7,
    content: 'Today was relatively peaceful. I managed my stress better by taking short breaks throughout the day.'
  },
  { 
    id: '2', 
    date: '2023-04-25',
    mood: 'anxious',
    intensity: 6,
    content: 'Feeling a bit overwhelmed with work deadlines. Going to try some breathing exercises tonight.'
  }
];

// Mock forum data with comments
export const mockForumPosts = [
  {
    id: '1',
    title: 'How do you manage work anxiety?',
    content: 'I\'ve been struggling with anxiety at work lately. What strategies have worked for you?',
    author: 'anonymous1',
    createdAt: '2023-04-25',
    comments: [
      {
        id: '101',
        content: 'I find that taking short walks during breaks helps me reset my mind.',
        author: 'anonymous2',
        createdAt: '2023-04-25'
      },
      {
        id: '102',
        content: 'Meditation has been a game-changer for me. Even just 5 minutes makes a difference.',
        author: 'anonymous3',
        createdAt: '2023-04-26'
      }
    ]
  },
  {
    id: '2',
    title: 'Dealing with social anxiety during meetings',
    content: 'Does anyone have tips for managing anxiety during video calls and meetings?',
    author: 'anonymous4',
    createdAt: '2023-04-24',
    comments: [
      {
        id: '201',
        content: 'I prepare talking points beforehand to feel more confident.',
        author: 'anonymous5',
        createdAt: '2023-04-24'
      }
    ]
  }
];

// Simulated Supabase client functions
export const saveChat = async (message: { role: 'user' | 'assistant', content: string }) => {
  console.log('Saving chat message:', message);
  // Would normally save to Supabase
  return { ...message, id: Date.now().toString() };
};

export const saveMood = async (moodData: { mood: string, intensity: number }) => {
  console.log('Saving mood data:', moodData);
  // Would normally save to Supabase
  return { ...moodData, date: new Date().toISOString().split('T')[0] };
};

export const savePost = async (post: { content: string, mood: string }) => {
  console.log('Saving community post:', post);
  // Would normally save to Supabase
  return { 
    ...post, 
    id: Date.now().toString(),
    createdAt: new Date().toISOString().split('T')[0]
  };
};

export const saveForumPost = async (post: { title: string, content: string, author: string }) => {
  console.log('Saving forum post:', post);
  return {
    ...post,
    id: Date.now().toString(),
    createdAt: new Date().toISOString().split('T')[0],
    comments: []
  };
};

export const saveForumComment = async (comment: { postId: string, content: string, author: string }) => {
  console.log('Saving forum comment:', comment);
  return {
    ...comment,
    id: Date.now().toString(),
    createdAt: new Date().toISOString().split('T')[0]
  };
};

export const saveJournalEntry = async (entry: { mood: string, intensity: number, content: string }) => {
  console.log('Saving journal entry:', entry);
  return {
    ...entry,
    id: Date.now().toString(),
    date: new Date().toISOString().split('T')[0]
  };
};

export const saveWellnessGoals = async (goals: Array<{ id: string, title: string, completed: boolean }>) => {
  console.log('Saving wellness goals:', goals);
  return goals;
};

// Function to get recommendations based on mood
export const getRecommendations = (mood: string) => {
  const defaultMood = 'anxious';
  return mockRecommendations[mood as keyof typeof mockRecommendations] || 
         mockRecommendations[defaultMood];
};
