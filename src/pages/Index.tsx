
import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../App';

// Redirect from index to the auth page if not authenticated, otherwise to chat
const Index = () => {
  const { isAuthenticated } = useContext(AuthContext);
  
  if (!isAuthenticated) {
    return <Navigate to="/auth" replace />;
  }
  
  return <Navigate to="/chat" replace />;
};

export default Index;
