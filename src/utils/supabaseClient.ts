import { createClient } from '@supabase/supabase-js';

// --- Supabase Connection ---
const supabaseUrl = 'https://sesefkntidgstshdprcf.supabase.co'; // replace this
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNlc2Vma250aWRnc3RzaGRwcmNmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDU2NjYzMDcsImV4cCI6MjA2MTI0MjMwN30.LqCDLQKmbh56hOHBsTqr2fPDVMbtjJ5C2EBchGVe1gc'; // replace this
export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// --- Save Chat Message ---
export const saveChat = async (message: { role: 'user' | 'assistant', content: string }, userId: string) => {
  const { data, error } = await supabase.from('chat_history').insert([
    { user_id: userId, message: message.content, sender: message.role }
  ]);
  if (error) console.error('Save Chat Error:', error.message);
  return data;
};

// --- Load Chat History ---
export const loadChatHistory = async (userId: string) => {
  const { data, error } = await supabase
    .from('chat_history')
    .select('*')
    .eq('user_id', userId)
    .order('timestamp', { ascending: true });
  if (error) console.error('Load Chat History Error:', error.message);
  return data;
};

// --- Save Mood ---
export const saveMood = async (moodData: { mood: string; notes?: string }, userId: string) => {
  const { data, error } = await supabase.from('mood_tracker').insert([
    { user_id: userId, mood: moodData.mood, notes: moodData.notes || '' }
  ]);
  if (error) console.error('Save Mood Error:', error.message);
  return data;
};

// --- Load Mood History ---
export const loadMoodHistory = async (userId: string) => {
  const { data, error } = await supabase
    .from('mood_tracker')
    .select('*')
    .eq('user_id', userId)
    .order('date', { ascending: false });
  if (error) console.error('Load Mood History Error:', error.message);
  return data;
};

// --- Save Journal Entry ---
export const saveJournalEntry = async (entry: { content: string }, userId: string) => {
  const { data, error } = await supabase.from('journals').insert([
    { user_id: userId, entry: entry.content }
  ]);
  if (error) console.error('Save Journal Error:', error.message);
  return data;
};

// --- Load Journal Entries ---
export const loadJournalEntries = async (userId: string) => {
  const { data, error } = await supabase
    .from('journals')
    .select('*')
    .eq('user_id', userId)
    .order('created_at', { ascending: false });
  if (error) console.error('Load Journal Entries Error:', error.message);
  return data;
};

// --- Save Forum Post ---
export const saveForumPost = async (post: { title: string; content: string }, userId: string) => {
  const { data, error } = await supabase.from('forum_posts').insert([
    { user_id: userId, title: post.title, content: post.content }
  ]);
  if (error) console.error('Save Forum Post Error:', error.message);
  return data;
};

// --- Load Forum Posts ---
export const loadForumPosts = async () => {
  const { data, error } = await supabase
    .from('forum_posts')
    .select('*')
    .order('created_at', { ascending: false });
  if (error) console.error('Load Forum Posts Error:', error.message);
  return data;
};

// --- Save Forum Comment ---
export const saveForumComment = async (comment: { postId: string; content: string }, userId: string) => {
  const { data, error } = await supabase.from('forum_comments').insert([
    { post_id: comment.postId, user_id: userId, content: comment.content }
  ]);
  if (error) console.error('Save Forum Comment Error:', error.message);
  return data;
};

// --- Load Forum Comments ---
export const loadForumComments = async (postId: string) => {
  const { data, error } = await supabase
    .from('forum_comments')
    .select('*')
    .eq('post_id', postId)
    .order('created_at', { ascending: true });
  if (error) console.error('Load Forum Comments Error:', error.message);
  return data;
};

// Save a community post to Supabase
export const savePost = async (post: { content: string, mood: string }, userId: string) => {
  const { data, error } = await supabase
    .from('community_posts')
    .insert([{ 
      content: post.content, 
      mood: post.mood, 
      user_id: userId, 
      created_at: new Date().toISOString() 
    }])
    .select()
    .single();

  if (error) {
    console.error('Error saving post:', error.message);
    throw error;
  }

  return data;
};

// Load community posts from Supabase
export const loadCommunityPosts = async () => {
  const { data, error } = await supabase
    .from('community_posts')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error loading community posts:', error.message);
    return [];
  }

  return data;
};
// Save a mood tracker entry
export const saveMoodTrackerEntry = async (moodData: { mood: string, intensity: number }, userId: string) => {
  const { data, error } = await supabase
    .from('mood_tracker')
    .insert([{ 
      mood: moodData.mood, 
      intensity: moodData.intensity, 
      user_id: userId, 
      date: new Date().toISOString().split('T')[0] 
    }])
    .select()
    .single();

  if (error) {
    console.error('Error saving mood entry:', error.message);
    throw error;
  }

  return data;
};

// Load mood tracker data
export const loadMoodTrackerData = async () => {
  const { data, error } = await supabase
    .from('mood_tracker')
    .select('*')
    .order('date', { ascending: false });

  if (error) {
    console.error('Error loading mood tracker data:', error.message);
    return [];
  }

  return data;
};
// Load Wellness Goals
export const loadWellnessGoals = async () => {
  const { data, error } = await supabase
    .from('wellness_goals')
    .select('*')
    .order('id');

  if (error) {
    console.error('Error loading wellness goals:', error.message);
    return [];
  }

  return data;
};

// Save Wellness Goals
export const saveWellnessGoals = async (goals: Array<{ id: string; title: string; completed: boolean }>, userId: string) => {
  const { error } = await supabase
    .from('wellness_goals')
    .upsert(
      goals.map(goal => ({
        id: goal.id,
        title: goal.title,
        completed: goal.completed,
        user_id: userId,
      }))
    );

  if (error) {
    console.error('Error saving wellness goals:', error.message);
  }
};
