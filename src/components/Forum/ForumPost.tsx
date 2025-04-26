
import React, { useState } from 'react';
import { saveForumComment, supabase } from '../../utils/supabaseClient';

interface Comment {
  id: string;
  content: string;
  author: string;
  createdAt: string;
}

interface ForumPostProps {
  id: string;
  title: string;
  content: string;
  author: string;
  createdAt: string;
  comments: Comment[];
  onCommentAdded: (postId: string, comment: Comment) => void;
}

const ForumPost: React.FC<ForumPostProps> = ({ 
  id, 
  title, 
  content, 
  author, 
  createdAt, 
  comments,
  onCommentAdded
}) => {
  const [showComments, setShowComments] = useState(false);
  const [newComment, setNewComment] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Format date for display
  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return new Intl.DateTimeFormat('en-US', { 
      month: 'short', 
      day: 'numeric',
      year: 'numeric'
    }).format(date);
  };

  const handleAddComment = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newComment.trim()) return;
    
    setIsSubmitting(true);
    
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        console.error('User not authenticated');
        setIsSubmitting(false);
        return;
      }
      
      const commentData = {
        postId: id,
        content: newComment,
        author: 'anonymous' + Math.floor(Math.random() * 1000)
      };
      
      const savedComment = await saveForumComment(commentData, user.id);
      
      onCommentAdded(id, savedComment);
      
      setNewComment('');
      
      if (!showComments) {
        setShowComments(true);
      }
    } catch (error) {
      console.error('Error adding comment:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-6 animate-fade-in">
      <h3 className="text-lg font-semibold text-deepblue mb-2">{title}</h3>
      <p className="text-deepblue/80 mb-4">{content}</p>
      
      <div className="flex justify-between items-center text-sm text-gray-500 mb-4">
        <span>{author}</span>
        <span>{formatDate(createdAt)}</span>
      </div>
      
      <div className="border-t pt-4">
        <button
          onClick={() => setShowComments(!showComments)}
          className="text-sm text-harmony hover:text-rustred transition-colors mb-4"
        >
          {showComments ? 'Hide' : 'Show'} {comments.length} {comments.length === 1 ? 'comment' : 'comments'}
        </button>
        
        {showComments && comments.map(comment => (
          <div key={comment.id} className="bg-freshstart/20 p-3 rounded-md mb-3">
            <p className="text-deepblue mb-1">{comment.content}</p>
            <div className="flex justify-between items-center text-xs text-gray-500">
              <span>{comment.author}</span>
              <span>{formatDate(comment.createdAt)}</span>
            </div>
          </div>
        ))}
        
        <form onSubmit={handleAddComment} className="mt-4">
          <div className="mb-3">
            <label htmlFor={`comment-${id}`} className="block text-sm font-medium text-gray-700 mb-1">
              Add a supportive comment
            </label>
            <textarea
              id={`comment-${id}`}
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-harmony"
              rows={2}
              placeholder="Share your thoughts or advice..."
            />
          </div>
          
          <button
            type="submit"
            disabled={!newComment.trim() || isSubmitting}
            className={`px-4 py-2 rounded-md text-white ${
              !newComment.trim() || isSubmitting
                ? 'bg-gray-300 cursor-not-allowed'
                : 'bg-harmony hover:bg-rustred transition-colors'
            }`}
          >
            {isSubmitting ? 'Posting...' : 'Post Comment'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ForumPost;
