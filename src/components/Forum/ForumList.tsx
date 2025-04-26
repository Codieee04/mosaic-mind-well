
import React, { useState } from 'react';
import ForumPost from './ForumPost';
import { mockForumPosts, saveForumPost } from '../../utils/supabaseClient';

interface Comment {
  id: string;
  content: string;
  author: string;
  createdAt: string;
}

interface Post {
  id: string;
  title: string;
  content: string;
  author: string;
  createdAt: string;
  comments: Comment[];
}

const ForumList: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>(mockForumPosts);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [newPost, setNewPost] = useState({
    title: '',
    content: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setNewPost(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPost.title.trim() || !newPost.content.trim()) return;
    
    setIsSubmitting(true);
    
    try {
      // In a real app, we would save to Supabase here
      const postData = {
        ...newPost,
        author: 'anonymous' + Math.floor(Math.random() * 1000)
      };
      
      const savedPost = await saveForumPost(postData);
      
      // Add new post to the list
      setPosts(prev => [savedPost, ...prev]);
      
      // Reset form
      setNewPost({
        title: '',
        content: ''
      });
      
      // Close form
      setIsFormOpen(false);
    } catch (error) {
      console.error('Error creating post:', error);
    } finally {
      setIsSubmitting(false);
    }
  };
  
  const handleCommentAdded = (postId: string, comment: Comment) => {
    setPosts(prevPosts => 
      prevPosts.map(post => 
        post.id === postId 
          ? { ...post, comments: [...post.comments, comment] } 
          : post
      )
    );
  };

  return (
    <div className="page-container">
      <h2 className="text-2xl font-bold text-deepblue mb-6">Mental Health Forum</h2>
      <p className="text-lg text-deepblue/70 mb-6">
        A safe space to share your thoughts, ask questions, and support each other.
        All posts are anonymous and focused on creating a positive community.
      </p>
      
      <button
        onClick={() => setIsFormOpen(!isFormOpen)}
        className="mb-8 bg-rustred hover:bg-harmony text-white px-6 py-3 rounded-md transition-colors"
      >
        {isFormOpen ? 'Cancel' : 'Start a New Discussion'}
      </button>
      
      {isFormOpen && (
        <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-md p-6 mb-8 animate-fade-in">
          <h3 className="text-lg font-semibold text-deepblue mb-4">Create a New Discussion</h3>
          
          <div className="mb-4">
            <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
              Title
            </label>
            <input
              type="text"
              id="title"
              name="title"
              value={newPost.title}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-harmony"
              placeholder="What would you like to discuss?"
              maxLength={100}
              required
            />
          </div>
          
          <div className="mb-6">
            <label htmlFor="content" className="block text-sm font-medium text-gray-700 mb-1">
              Content
            </label>
            <textarea
              id="content"
              name="content"
              value={newPost.content}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-harmony"
              rows={4}
              placeholder="Share your thoughts, experiences, or questions..."
              required
            />
          </div>
          
          <div className="flex justify-end">
            <button
              type="submit"
              disabled={!newPost.title.trim() || !newPost.content.trim() || isSubmitting}
              className={`px-6 py-2 rounded-md text-white ${
                !newPost.title.trim() || !newPost.content.trim() || isSubmitting
                  ? 'bg-gray-300 cursor-not-allowed'
                  : 'bg-harmony hover:bg-rustred transition-colors'
              }`}
            >
              {isSubmitting ? 'Posting...' : 'Post Discussion'}
            </button>
          </div>
        </form>
      )}
      
      {posts.length === 0 ? (
        <div className="text-center py-10 bg-white rounded-lg shadow">
          <p className="text-gray-500">No discussions yet. Be the first to start one!</p>
        </div>
      ) : (
        posts.map(post => (
          <ForumPost
            key={post.id}
            id={post.id}
            title={post.title}
            content={post.content}
            author={post.author}
            createdAt={post.createdAt}
            comments={post.comments}
            onCommentAdded={handleCommentAdded}
          />
        ))
      )}
    </div>
  );
};

export default ForumList;
