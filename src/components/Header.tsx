import React from 'react';
import { Sun, Moon, Brain } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { useJournal } from '../context/JournalContext';

const Header: React.FC = () => {
  const { theme, toggleTheme } = useTheme();
  const { exportEntries } = useJournal();
  
  return (
    <header className={`sticky top-0 z-10 transition-colors duration-300 ${
      theme === 'dark' 
        ? 'bg-gray-800 text-gray-100' 
        : 'bg-white text-gray-900'
    } shadow-md`}>
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Brain className="h-6 w-6 text-blue-500" />
          <h1 className="text-xl font-bold">MindMirror</h1>
        </div>
        <div className="flex items-center space-x-4">
          <button 
            onClick={exportEntries}
            className={`px-3 py-1 rounded-md text-sm ${
              theme === 'dark'
                ? 'bg-gray-700 hover:bg-gray-600'
                : 'bg-gray-200 hover:bg-gray-300'
            } transition-colors duration-200`}
          >
            Export
          </button>
          <button 
            onClick={toggleTheme}
            className={`p-2 rounded-full ${
              theme === 'dark'
                ? 'bg-gray-700 hover:bg-gray-600'
                : 'bg-gray-200 hover:bg-gray-300'
            } transition-colors duration-200`}
            aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
          >
            {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;