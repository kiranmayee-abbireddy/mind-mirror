import React, { useEffect, useState } from 'react';
import { useTheme } from '../context/ThemeContext';
import { useJournal } from '../context/JournalContext';
import PatternDetector from './PatternDetector';
import { Save } from 'lucide-react';

const JournalEditor: React.FC = () => {
  const { theme } = useTheme();
  const { currentEntry, saveCurrentEntry, currentDate } = useJournal();
  const [content, setContent] = useState('');
  const [formattedDate, setFormattedDate] = useState('');
  
  useEffect(() => {
    setContent(currentEntry?.content || '');
    
    // Format the date to be more readable
    if (currentDate) {
      const date = new Date(currentDate);
      setFormattedDate(date.toLocaleDateString('en-US', { 
        weekday: 'long', 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
      }));
    }
  }, [currentEntry, currentDate]);

  const handleContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setContent(e.target.value);
  };

  const handleSave = () => {
    saveCurrentEntry(content);
  };

  return (
    <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4">
      <div className={`flex-grow md:w-2/3 p-5 rounded-lg transition-colors duration-300 ${
        theme === 'dark' ? 'bg-gray-800' : 'bg-white shadow-md'
      }`}>
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">{formattedDate || 'Today'}</h2>
          <button
            onClick={handleSave}
            className={`flex items-center space-x-2 px-3 py-2 rounded-md transition-colors duration-200 ${
              theme === 'dark'
                ? 'bg-blue-600 hover:bg-blue-700 text-white'
                : 'bg-blue-500 hover:bg-blue-600 text-white'
            }`}
          >
            <Save size={16} />
            <span>Save</span>
          </button>
        </div>
        
        <div className="mb-4">
          <textarea
            value={content}
            onChange={handleContentChange}
            className={`w-full h-80 p-4 rounded-md border transition-colors duration-300 ${
              theme === 'dark' 
                ? 'bg-gray-700 border-gray-600 text-white' 
                : 'bg-gray-50 border-gray-300 text-gray-900'
            } focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
            placeholder="Start journaling your thoughts here..."
          />
        </div>
      </div>
      
      <PatternDetector 
        content={content} 
      />
    </div>
  );
};

export default JournalEditor;