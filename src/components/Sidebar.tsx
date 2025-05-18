import React, { useState } from 'react';
import { Calendar } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { useJournal } from '../context/JournalContext';
import CalendarView from './CalendarView';

const Sidebar: React.FC = () => {
  const { theme } = useTheme();
  const { loadEntryByDate } = useJournal();
  const [showCalendar, setShowCalendar] = useState(false);
  
  return (
    <div className={`p-4 mb-4 md:mb-0 rounded-lg ${
      theme === 'dark' 
        ? 'bg-gray-800' 
        : 'bg-white shadow-md'
    }`}>
      <div className="flex flex-col space-y-4">
        <button
          onClick={() => setShowCalendar(!showCalendar)}
          className={`flex items-center space-x-2 p-2 rounded-md transition-colors duration-200 ${
            theme === 'dark'
              ? 'hover:bg-gray-700'
              : 'hover:bg-gray-100'
          }`}
        >
          <Calendar size={18} />
          <span>Past Entries</span>
        </button>
        
        {showCalendar && (
          <div className="mt-2 transition-all duration-300 ease-in-out">
            <CalendarView onSelectDate={loadEntryByDate} />
          </div>
        )}
      </div>
    </div>
  );
};

export default Sidebar;