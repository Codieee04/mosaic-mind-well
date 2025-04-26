import React, { useEffect, useState } from 'react';
import Header from '../components/Layout/Header';
import Footer from '../components/Layout/Footer';
import FloatingChatButton from '../components/Chatbot/FloatingChatButton';
import EmergencyButton from '../components/Layout/EmergencyButton';
import { saveForumPost, loadForumPosts, saveForumComment, loadForumComments, supabase } from '../utils/supabaseClient';

const ForumPage = () => {
  const [posts, setPosts] = useState<any[]>([]);
  const [newPostTitle, setNewPostTitle] = useState('');
  const [newPostContent, setNewPostContent] = useState('');
  const [comments, setComments] = useState<Record<string, any[]>>({});
  const [newComment, setNewComment] = useState<Record<string, string>>({});

  useEffect(() => {
    const fetchPosts = async () => {
      const data = await loadForumPosts();
      setPosts(data || []);
    };
    fetchPosts();
  }, []);

  const handlePostForum = async () => {
    if (!newPostTitle.trim() || !newPostContent.trim()) return;

    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return;

    await saveForumPost({ title: newPostTitle, content: newPostContent }, user.id);
    setPosts(prev => [...prev, { title: newPostTitle, content: newPostContent, created_at: new Date().toISOString() }]);
    setNewPostTitle('');
    setNewPostContent('');
  };

  const handlePostComment = async (postId: string) => {
    if (!newComment[postId]?.trim()) return;

    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return;

    await saveForumComment({ postId, content: newComment[postId] }, user.id);
    const updatedComments = await loadForumComments(postId);
    setComments(prev => ({ ...prev, [postId]: updatedComments || [] }));
    setNewComment(prev => ({ ...prev, [postId]: '' }));
  };

  const handleLoadComments = async (postId: string) => {
    const data = await loadForumComments(postId);
    setComments(prev => ({ ...prev, [postId]: data || [] }));
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1 bg-freshstart/30 container mx-auto px-4 py-6">
        <h1 className="text-3xl font-semibold text-deepblue mb-6">Community Forum</h1>

        {/* Post a New Forum Message */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <input
            type="text"
            value={newPostTitle}
            onChange={(e) => setNewPostTitle(e.target.value)}
            placeholder="Post Title"
            className="w-full border rounded px-4 py-2 mb-4"
          />
          <textarea
            value={newPostContent}
            onChange={(e) => setNewPostContent(e.target.value)}
            placeholder="What's on your mind?"
            className="w-full border rounded px-4 py-2 mb-4 h-28"
          ></textarea>

          <button
            onClick={handlePostForum}
            className="bg-rustred text-white px-6 py-2 rounded hover:bg-harmony transition"
          >
            Post to Forum
          </button>
        </div>

        {/* List of Forum Posts */}
        <div className="space-y-8">
          {posts.length > 0 ? (
            posts.map((post, index) => (
              <div key={index} className="bg-white rounded-lg shadow-md p-6">
                <h2 className="text-xl font-semibold text-harmony mb-2">{post.title}</h2>
                <p className="text-deepblue/80 mb-4">{post.content}</p>
                <p className="text-sm text-gray-500">{new Date(post.created_at).toLocaleDateString()}</p>

                {/* Comments Section */}
                <div className="mt-4">
                  <button
                    onClick={() => handleLoadComments(post.id)}
                    className="text-sm text-harmony hover:underline mb-2"
                  >
                    Load Comments
                  </button>

                  {comments[post.id] && comments[post.id].length > 0 && (
                    <div className="space-y-2 mt-2">
                      {comments[post.id].map((comment, cIndex) => (
                        <div key={cIndex} className="bg-freshstart/30 p-2 rounded">
                          <p className="text-deepblue/80">{comment.content}</p>
                          <p className="text-xs text-gray-400">{new Date(comment.created_at).toLocaleDateString()}</p>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* New Comment Input */}
                  <div className="flex items-center mt-2">
                    <input
                      type="text"
                      value={newComment[post.id] || ''}
                      onChange={(e) => setNewComment(prev => ({ ...prev, [post.id]: e.target.value }))}
                      placeholder="Write a comment..."
                      className="flex-1 border rounded-l px-3 py-2"
                    />
                    <button
                      onClick={() => handlePostComment(post.id)}
                      className="bg-harmony text-white px-4 py-2 rounded-r hover:bg-rustred transition"
                    >
                      Comment
                    </button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p className="text-gray-400">No forum posts yet.</p>
          )}
        </div>
      </main>

      <Footer />
      <FloatingChatButton />
      <EmergencyButton />
    </div>
  );
};

export default ForumPage;
