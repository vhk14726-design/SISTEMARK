
import React, { useState, useEffect } from 'react';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import { User } from './types';

const App: React.FC = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState<User | null>(null);

  // Check for persistent session
  useEffect(() => {
    const savedUser = localStorage.getItem('nexus_user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
      setIsLoggedIn(true);
    }
  }, []);

  const handleLogin = (username: string) => {
    const newUser: User = {
      username: username,
      email: `${username}@nexus.ai`,
      avatar: `https://picsum.photos/seed/${username}/200`,
      lastLogin: new Date().toISOString()
    };
    setUser(newUser);
    setIsLoggedIn(true);
    localStorage.setItem('nexus_user', JSON.stringify(newUser));
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUser(null);
    localStorage.removeItem('nexus_user');
  };

  return (
    <div className="min-h-screen bg-[#0f172a] text-slate-200">
      {isLoggedIn && user ? (
        <Dashboard user={user} onLogout={handleLogout} />
      ) : (
        <Login onLogin={handleLogin} />
      )}
    </div>
  );
};

export default App;
