
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import SignInForm from '../components/Auth/SignInForm';
import SignUpForm from '../components/Auth/SignUpForm';
import SplashScreen from '../components/Auth/SplashScreen';
import { toast } from "sonner";

// This is a mock auth context that would be replaced with real auth
// when Supabase is connected
const mockAuth = {
  isAuthenticated: false,
  setAuthenticated: (value: boolean) => {
    localStorage.setItem('mindmosaic_auth', JSON.stringify({ isAuthenticated: value }));
  },
  getAuthState: () => {
    const stored = localStorage.getItem('mindmosaic_auth');
    if (stored) {
      return JSON.parse(stored).isAuthenticated;
    }
    return false;
  }
};

const AuthPage = () => {
  const [showSignUp, setShowSignUp] = useState(false);
  const [showSplash, setShowSplash] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    // Check if user is already authenticated
    if (mockAuth.getAuthState()) {
      navigate('/chat');
    }
    
    // Show splash screen for 3 seconds
    const splashTimer = setTimeout(() => {
      setShowSplash(false);
    }, 3000);
    
    return () => clearTimeout(splashTimer);
  }, [navigate]);

  const handleSignIn = (email: string, password: string) => {
    console.log('Sign in with:', email, password);
    // This would normally authenticate with Supabase
    mockAuth.setAuthenticated(true);
    navigate('/chat');
  };

  const handleSignUp = (email: string, password: string, name: string) => {
    console.log('Sign up with:', email, password, name);
    // This would normally create an account with Supabase
    mockAuth.setAuthenticated(true);
    navigate('/chat');
  };

  const handleGoogleAuth = () => {
    console.log('Google auth initiated');
    // This would normally trigger Google OAuth with Supabase
    toast.info('Google authentication would be triggered here');
    // For now, we'll simulate successful auth
    setTimeout(() => {
      mockAuth.setAuthenticated(true);
      navigate('/chat');
    }, 1000);
  };

  if (showSplash) {
    return <SplashScreen />;
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-freshstart/30 p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-deepblue mb-2">MindMosaic</h1>
          <p className="text-lg text-gray-600">Your Mental Wellness Companion</p>
        </div>
        
        {showSignUp ? (
          <SignUpForm 
            onToggleForm={() => setShowSignUp(false)}
            onSignUp={handleSignUp}
            onGoogleSignUp={handleGoogleAuth}
          />
        ) : (
          <SignInForm 
            onToggleForm={() => setShowSignUp(true)}
            onSignIn={handleSignIn}
            onGoogleSignIn={handleGoogleAuth}
          />
        )}
      </div>
    </div>
  );
};

export default AuthPage;
