import React, { createContext, useContext, useState, useEffect } from 'react';
import { mockUsers } from '../data/mockData';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if user is logged in from localStorage
    const savedUser = localStorage.getItem('rewear_user');
    if (savedUser) {
      setCurrentUser(JSON.parse(savedUser));
    }
    setLoading(false);
  }, []);

  const login = async (email, password) => {
    // Simulate API call
    setLoading(true);
    
    // Mock authentication - in real app, this would be an API call
    const user = mockUsers.find(u => u.email === email);
    
    if (user && password === 'password') { // Mock password check
      setCurrentUser(user);
      localStorage.setItem('rewear_user', JSON.stringify(user));
      setLoading(false);
      return { success: true };
    } else {
      setLoading(false);
      return { success: false, error: 'Invalid email or password' };
    }
  };

  const register = async (userData) => {
    setLoading(true);
    
    // Simulate API call
    const newUser = {
      id: mockUsers.length + 1,
      ...userData,
      points: 100, // Starting points
      joinDate: new Date().toISOString().split('T')[0],
      avatar: "https://images.unsplash.com/photo-1535713875002-d1d0c37738de?w=150&h=150&fit=crop&crop=face"
    };
    
    // In real app, this would be saved to backend
    setCurrentUser(newUser);
    localStorage.setItem('rewear_user', JSON.stringify(newUser));
    setLoading(false);
    return { success: true };
  };

  const logout = () => {
    setCurrentUser(null);
    localStorage.removeItem('rewear_user');
  };

  const updateUser = (updatedData) => {
    const updatedUser = { ...currentUser, ...updatedData };
    setCurrentUser(updatedUser);
    localStorage.setItem('rewear_user', JSON.stringify(updatedUser));
  };

  const value = {
    currentUser,
    login,
    register,
    logout,
    updateUser,
    loading
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}; 