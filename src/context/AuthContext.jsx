import React, { createContext, useContext, useState, useCallback, useRef } from 'react';
import { users as staticUsers } from '../data/users';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Runtime registry — starts with static demo users, new signups are added here
  const registryRef = useRef([...staticUsers]);

  const login = useCallback((email, password, injectUser = null) => {
    // If Signup passes a freshly-created user object, inject it first
    if (injectUser) {
      const exists = registryRef.current.find(u => u.email.toLowerCase() === injectUser.email.toLowerCase());
      if (!exists) registryRef.current.push(injectUser);
    }

    const user = registryRef.current.find(
      u => u.email.toLowerCase() === email.toLowerCase() && u.password === password
    );

    if (user) {
      const { password: _pw, ...safeUser } = user;
      setCurrentUser(safeUser);
      setIsAuthenticated(true);
      return { success: true, user: safeUser };
    }
    return { success: false, message: 'Invalid email or password.' };
  }, []);

  const register = useCallback((newUser) => {
    const exists = registryRef.current.find(
      u => u.email.toLowerCase() === newUser.email.toLowerCase()
    );
    if (exists) return { success: false, message: 'An account with this email already exists.' };
    registryRef.current.push(newUser);
    return { success: true };
  }, []);

  const logout = useCallback(() => {
    setCurrentUser(null);
    setIsAuthenticated(false);
  }, []);

  return (
    <AuthContext.Provider value={{ currentUser, isAuthenticated, login, logout, register }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
};
