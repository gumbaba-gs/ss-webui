import React from 'react';
import { useTheme } from '../../context/ThemeContext/ThemeContext';

const ThemeToggle = () => {
    const { theme, toggleTheme } = useTheme();
  
  return (
    <button
      onClick={toggleTheme}
      className="p-2 rounded-full bg-accent text-white hover:bg-opacity-80 transition-colors"
    >
      {theme === 'light' ? '🌙' : '☀️'}
    </button>
  );
};

export default ThemeToggle;