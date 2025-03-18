import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent } from "../components/Card";
import { Button } from "../components/Button";
import { LogOut, Trash2, PlusCircle, Heart, MessageCircle, Send, Bookmark } from "lucide-react";
import { postApi, authApi } from "../services/api";
import "../styles/HomePage.css";

export default function HomePage() {
  const navigate = useNavigate();
  const [posts, setPosts] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      // Check if user is logged in
      const userJson = localStorage.getItem("user");
      if (!userJson) {
        navigate("/login");
        return;
      }
      
      setCurrentUser(JSON.parse(userJson));
      
      try {
        // Fetch posts from API
        const response = await postApi.getAll();
        setPosts(response.data);
      } catch (err) {
        console.error("Error fetching posts:", err);
        setError("Could not load posts. Please try again later.");
        
        // If unauthorized, redirect to login
        if (err.response?.status === 401) {
          localStorage.removeItem("access_token");
          localStorage.removeItem("refresh_token");
          localStorage.removeItem("user");
          navigate("/login");
        }
      } finally {
        setLoading(false);
      }
    };
    
    fetchData();
  }, [navigate]);

  const handleLogout = async () => {
    try {
      const refreshToken = localStorage.getItem("refresh_token");
      if (refreshToken) {
        await authApi.logout(refreshToken);
      }
    } catch (error) {
      console.error("Logout error:", error);
    } finally {
      // Clear local storage regardless of API response
      localStorage.removeItem("access_token");
      localStorage.removeItem("refresh_token");
      localStorage.removeItem("user");
      navigate("/login");
    }
  };

  const handleAddPost = async () => {
    const title = prompt("Enter Post Title:");
    const content = prompt("Enter Post Content:");
    if (!title || !content) return;

    try {
      const response = await postApi.create({ title, content });
      setPosts([response.data, ...posts]);
    } catch (err) {
      console.error("Error creating post:", err);
      alert("Failed to create post. Please try again.");
    }
  };

  const handleDeletePost = async (id, authorId) => {
    // Check if the current user is the author
    if (currentUser.id !== authorId) {
      alert("You can only delete your own posts!");
      return;
    }

    try {
      await postApi.delete(id);
      setPosts(posts.filter(post => post.id !== id));
    } catch (err) {
      console.error("Error deleting post:", err);
      alert("Failed to delete post. Please try again.");
    }
  };

  const handleLike = (postId) => {
    // This would connect to a like API in a real app
    console.log(`Liked post ${postId}`);
    // For now, we'll just update the UI
    setPosts(posts.map(post => 
      post.id === postId ? {...post, likes: (post.likes || 0) + 1} : post
    ));
  };

  if (loading) return <div className="loading-container"><div className="loading-spinner"></div></div>;
  if (error) return <div className="error">{error}</div>;

  return (
    <div className="instagram-container">
      {/* Instagram-style header */}
      <header className="instagram-header">
        <div className="instagram-logo">Blogstagram</div>
        <div className="instagram-actions">
          <Button className="instagram-action-button" onClick={handleAddPost}>
            <PlusCircle size={24} />
          </Button>
          <Button className="instagram-action-button" onClick={handleLogout}>
            <LogOut size={24} />
          </Button>
        </div>
      </header>

      {/* Instagram-style main content */}
      <main className="instagram-content">
        {/* Stories row - placeholder */}
        <div className="instagram-stories">
          <div className="story-circle">
            <div className="story-avatar">{currentUser?.username?.charAt(0).toUpperCase()}</div>
            <span className="story-username">Your Story</span>
          </div>
          {/* Placeholder for more stories */}
        </div>

        {/* Posts feed */}
        <div className="instagram-feed">
          {posts.length > 0 ? (
            posts.map((post) => (
              <Card key={post.id} className="instagram-post">
                <div className="post-header">
                  <div className="post-user">
                    <div className="user-avatar">{post.author_username?.charAt(0).toUpperCase()}</div>
                    <span className="username">{post.author_username}</span>
                  </div>
                  {currentUser.id === post.author && (
                    <Button className="post-more-options" onClick={() => handleDeletePost(post.id, post.author)}>
                      <Trash2 size={18} />
                    </Button>
                  )}
                </div>
                
                <div className="post-content">
                  <h3 className="post-title">{post.title}</h3>
                  <p className="post-text">{post.content}</p>
                </div>
                
                <div className="post-actions">
                  <div className="post-actions-left">
                    <Button className="post-action-button" onClick={() => handleLike(post.id)}>
                      <Heart size={24} />
                    </Button>
                    <Button className="post-action-button">
                      <MessageCircle size={24} />
                    </Button>
                    <Button className="post-action-button">
                      <Send size={24} />
                    </Button>
                  </div>
                  <Button className="post-action-button">
                    <Bookmark size={24} />
                  </Button>
                </div>
                
                <div className="post-stats">
                  <span className="post-likes">{post.likes || 0} likes</span>
                </div>
                
                <div className="post-comments">
                  {/* Placeholder for comments */}
                </div>
              </Card>
            ))
          ) : (
            <div className="no-posts">
              <p>No posts available.</p>
              <Button className="create-first-post" onClick={handleAddPost}>Create your first post</Button>
            </div>
          )}
        </div>
      </main>

      {/* Instagram-style bottom navigation */}
      <nav className="instagram-bottom-nav">
        <Button className="nav-button active">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
            <polyline points="9 22 9 12 15 12 15 22"></polyline>
          </svg>
        </Button>
        <Button className="nav-button">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="11" cy="11" r="8"></circle>
            <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
          </svg>
        </Button>
        <Button className="nav-button">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M2 12a5 5 0 0 1 5-5h10a5 5 0 0 1 5 5v6a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2v-6z"></path>
            <rect x="2" y="7" width="20" height="5"></rect>
            <circle cx="12" cy="15" r="1"></circle>
          </svg>
        </Button>
        <Button className="nav-button">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
          </svg>
        </Button>
        <Button className="nav-button">
          <div className="profile-avatar">{currentUser?.username?.charAt(0).toUpperCase()}</div>
        </Button>
      </nav>
    </div>
  );
}