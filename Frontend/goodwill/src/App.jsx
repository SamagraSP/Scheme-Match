import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Dashboard from './pages/Dashboard';
import Hero from './documents/Hero';
import Login from './documents/Login';
import Register from './documents/Register';

const PageWrapper = ({ children }) => (
  <main className="mx-auto max-w-7xl px-4 pb-24 pt-6 sm:px-6 lg:px-8">
    {children}
  </main>
);

const App = () => {
  const [theme, setTheme] = useState(() => localStorage.getItem('schemeMatchTheme') || 'light');

  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark');
  }, [theme]);

  const toggleTheme = () => {
    const nextTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(nextTheme);
    localStorage.setItem('schemeMatchTheme', nextTheme);
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-950 transition-colors duration-500 dark:bg-slate-950 dark:text-slate-100">
      <Router>
        <Navbar theme={theme} onToggleTheme={toggleTheme} />
        <Routes>
          <Route path="/" element={<Hero />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/dashboard" element={<PageWrapper><Dashboard /></PageWrapper>} />
        </Routes>
        <Footer />
      </Router>
    </div>
  );
};

export default App;