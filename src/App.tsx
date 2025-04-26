
import React, { useEffect, useState } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Routes, Route, Navigate } from "react-router-dom";
import Index from "./pages/Index";
import ChatPage from "./pages/ChatPage";
import CommunityPage from "./pages/CommunityPage";
import TrackerPage from "./pages/TrackerPage";
import ForumPage from "./pages/ForumPage";
import JournalPage from "./pages/JournalPage";
import GoalsPage from "./pages/GoalsPage";
import Resources from "./pages/Resources";
import NotFound from "./pages/NotFound";
import AuthPage from "./pages/AuthPage";

const queryClient = new QueryClient();

// Simple auth context - would be replaced with Supabase auth
const AuthContext = React.createContext({
  isAuthenticated: false,
  setAuthenticated: (value: boolean) => {},
});

// Protected route component
const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated } = React.useContext(AuthContext);
  
  if (!isAuthenticated) {
    return <Navigate to="/auth" />;
  }
  
  return <>{children}</>;
};

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  
  useEffect(() => {
    // Check if user is authenticated from local storage
    const stored = localStorage.getItem('mindmosaic_auth');
    if (stored) {
      setIsAuthenticated(JSON.parse(stored).isAuthenticated);
    }
  }, []);
  
  const setAuthenticated = (value: boolean) => {
    setIsAuthenticated(value);
    localStorage.setItem('mindmosaic_auth', JSON.stringify({ isAuthenticated: value }));
  };

  return (
    <React.StrictMode>
      <QueryClientProvider client={queryClient}>
        <AuthContext.Provider value={{ isAuthenticated, setAuthenticated }}>
          <TooltipProvider>
            <Toaster />
            <Sonner />
            <Routes>
              {/* Public routes */}
              <Route path="/auth" element={<AuthPage />} />
              
              {/* Protected routes */}
              <Route path="/" element={
                <ProtectedRoute>
                  <Index />
                </ProtectedRoute>
              } />
              <Route path="/chat" element={
                <ProtectedRoute>
                  <ChatPage />
                </ProtectedRoute>
              } />
              <Route path="/community" element={
                <ProtectedRoute>
                  <CommunityPage />
                </ProtectedRoute>
              } />
              <Route path="/tracker" element={
                <ProtectedRoute>
                  <TrackerPage />
                </ProtectedRoute>
              } />
              <Route path="/forum" element={
                <ProtectedRoute>
                  <ForumPage />
                </ProtectedRoute>
              } />
              <Route path="/journal" element={
                <ProtectedRoute>
                  <JournalPage />
                </ProtectedRoute>
              } />
              <Route path="/goals" element={
                <ProtectedRoute>
                  <GoalsPage />
                </ProtectedRoute>
              } />
              <Route path="/resources" element={
                <ProtectedRoute>
                  <Resources />
                </ProtectedRoute>
              } />
              
              {/* Fallback */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </TooltipProvider>
        </AuthContext.Provider>
      </QueryClientProvider>
    </React.StrictMode>
  );
};

export { AuthContext };
export default App;
