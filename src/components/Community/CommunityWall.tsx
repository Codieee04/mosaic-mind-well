
import React, { useState } from 'react';
import { mockCommunityPosts, savePost } from '../../utils/supabaseClient';
import CommunityPost from './CommunityPost';
import PostForm from './PostForm';

// Define the post type
interface Post {
  id: string;
  content: string;
  mood: string;
  createdAt: string;
}

const CommunityWall: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>(mockCommunityPosts);
  const [isFormOpen, setIsFormOpen] = useState(false);
  
  // Handle new post submission
  const handleNewPost = async (content: string, mood: string) => {
    try {
      // In a real app, we would save to Supabase here
      const newPost = await savePost({ content, mood });
      
      // Add the new post to the list
      setPosts(prev => [newPost, ...prev]);
      
      // Close the form
      setIsFormOpen(false);
    } catch (error) {
      console.error('Error creating post:', error);
    }
  };
  
  return (
    <div className="page-container">
      <div className="mb-6">
        <h2 className="section-title">Community Sharing</h2>
        <p className="text-deepblue/70 mb-4">
          A safe space to share your thoughts and experiences anonymously. 
          What you share may help others feel less alone.
        </p>
        
        <button
          onClick={() => setIsFormOpen(!isFormOpen)}
          className="btn mb-6"
        >
          {isFormOpen ? 'Cancel' : 'Share Your Thoughts'}
        </button>
        
        {isFormOpen && (
          <PostForm onSubmit={handleNewPost} />
        )}
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {posts.map(post => (
          <CommunityPost
            key={post.id}
            content={post.content}
            mood={post.mood}
            createdAt={post.createdAt}
          />
        ))}
      </div>
      
      {posts.length === 0 && (
        <div className="text-center py-10">
          <p className="text-gray-500">No posts yet. Be the first to share!</p>
        </div>
      )}
    </div>
  );
};

export default CommunityWall;
