import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { useJournal } from '../context/JournalContext';

interface CalendarViewProps {
  onSelectDate: (date: string) => void;
}

const CalendarView: React.FC<CalendarViewProps> = ({ onSelectDate }) => {
  const { theme } = useTheme();
  const { journalEntries } = useJournal();
  const [currentDate, setCurrentDate] = useState(new Date());
  const [daysWithEntries, setDaysWithEntries] = useState<Set<string>>(new Set());
  
  useEffect(() => {
    // Extract dates from entries to highlight in calendar
    const entriesSet = new Set(Object.keys(journalEntries));
    setDaysWithEntries(entriesSet);
  }, [journalEntries]);

  const getDaysInMonth = (year: number, month: number) => {
    return new Date(year, month + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (year: number, month: number) => {
    return new Date(year, month, 1).getDay();
  };

  const handlePrevMonth = () => {
    setCurrentDate(prev => {
      const prevMonth = new Date(prev);
      prevMonth.setMonth(prevMonth.getMonth() - 1);
      return prevMonth;
    });
  };

  const handleNextMonth = () => {
    setCurrentDate(prev => {
      const nextMonth = new Date(prev);
      nextMonth.setMonth(nextMonth.getMonth() + 1);
      return nextMonth;
    });
  };

  const formatDateString = (year: number, month: number, day: number) => {
    return `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
  };

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();
  const daysInMonth = getDaysInMonth(year, month);
  const firstDay = getFirstDayOfMonth(year, month);
  const monthName = currentDate.toLocaleString('default', { month: 'long' });

  const renderCalendarDays = () => {
    const days = [];
    const today = new Date();
    const isCurrentMonth = today.getMonth() === month && today.getFullYear() === year;
    const currentDay = today.getDate();

    // Fill in days from previous month
    for (let i = 0; i < firstDay; i++) {
      days.push(<div key={`empty-${i}`} className="h-8 w-8"></div>);
    }

    // Fill in days of current month
    for (let day = 1; day <= daysInMonth; day++) {
      const dateString = formatDateString(year, month, day);
      const hasEntry = daysWithEntries.has(dateString);
      
      days.push(
        <button
          key={`day-${day}`}
          onClick={() => onSelectDate(dateString)}
          className={`h-8 w-8 rounded-full flex items-center justify-center transition-colors duration-200 
            ${isCurrentMonth && day === currentDay ? 'bg-blue-500 text-white' : ''}
            ${hasEntry ? 
              theme === 'dark' ? 'text-blue-400 font-bold' : 'text-blue-600 font-bold' 
              : ''}
            ${theme === 'dark' ? 'hover:bg-gray-700' : 'hover:bg-gray-200'}
          `}
        >
          {day}
        </button>
      );
    }

    return days;
  };

  const dayLabels = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];

  return (
    <div className={`p-2 rounded-md ${
      theme === 'dark' ? 'bg-gray-700' : 'bg-gray-100'
    }`}>
      <div className="flex justify-between items-center mb-2">
        <button 
          onClick={handlePrevMonth}
          className={`p-1 rounded-full ${
            theme === 'dark' ? 'hover:bg-gray-600' : 'hover:bg-gray-200'
          }`}
        >
          <ChevronLeft size={16} />
        </button>
        <div className="font-medium">
          {monthName} {year}
        </div>
        <button 
          onClick={handleNextMonth}
          className={`p-1 rounded-full ${
            theme === 'dark' ? 'hover:bg-gray-600' : 'hover:bg-gray-200'
          }`}
        >
          <ChevronRight size={16} />
        </button>
      </div>
      
      <div className="grid grid-cols-7 gap-1 mb-1">
        {dayLabels.map(day => (
          <div key={day} className="h-8 w-8 flex items-center justify-center text-xs font-medium text-gray-500">
            {day}
          </div>
        ))}
      </div>
      
      <div className="grid grid-cols-7 gap-1">
        {renderCalendarDays()}
      </div>
    </div>
  );
};

export default CalendarView;