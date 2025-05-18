import React, { createContext, useContext, useState, useEffect } from 'react';

interface JournalEntry {
  date: string;
  content: string;
}

interface JournalContextType {
  journalEntries: Record<string, JournalEntry>;
  currentEntry: JournalEntry | null;
  currentDate: string;
  saveCurrentEntry: (content: string) => void;
  loadEntryByDate: (date: string) => void;
  exportEntries: () => void;
}

const JournalContext = createContext<JournalContextType | undefined>(undefined);

export const useJournal = () => {
  const context = useContext(JournalContext);
  if (!context) {
    throw new Error('useJournal must be used within a JournalProvider');
  }
  return context;
};

interface JournalProviderProps {
  children: React.ReactNode;
}

export const JournalProvider: React.FC<JournalProviderProps> = ({ children }) => {
  const [journalEntries, setJournalEntries] = useState<Record<string, JournalEntry>>({});
  const [currentEntry, setCurrentEntry] = useState<JournalEntry | null>(null);
  const [currentDate, setCurrentDate] = useState<string>(getTodayDate());

  // Get today's date in YYYY-MM-DD format
  function getTodayDate(): string {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }

  // Load journal entries from localStorage on component mount
  useEffect(() => {
    const savedEntries = localStorage.getItem('mindmirror-journal');
    if (savedEntries) {
      try {
        const parsedEntries = JSON.parse(savedEntries);
        setJournalEntries(parsedEntries);
      } catch (error) {
        console.error('Failed to parse journal entries:', error);
      }
    }
    
    // Load today's entry or create a new one
    loadEntryByDate(currentDate);
  }, []);

  // Save entry for the current date
  const saveCurrentEntry = (content: string) => {
    const updatedEntry = {
      date: currentDate,
      content
    };
    
    setCurrentEntry(updatedEntry);
    
    const updatedEntries = {
      ...journalEntries,
      [currentDate]: updatedEntry
    };
    
    setJournalEntries(updatedEntries);
    localStorage.setItem('mindmirror-journal', JSON.stringify(updatedEntries));
  };

  // Load entry for a specific date
  const loadEntryByDate = (date: string) => {
    setCurrentDate(date);
    
    const entry = journalEntries[date];
    if (entry) {
      setCurrentEntry(entry);
    } else {
      // Create a new empty entry for this date
      setCurrentEntry({
        date,
        content: ''
      });
    }
  };

  // Export all journal entries as a text file
  const exportEntries = () => {
    let exportText = '# MindMirror Journal Export\n\n';
    
    // Sort entries by date (newest first)
    const sortedDates = Object.keys(journalEntries).sort().reverse();
    
    sortedDates.forEach(date => {
      const entry = journalEntries[date];
      const formattedDate = new Date(date).toLocaleDateString('en-US', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      });
      
      exportText += `## ${formattedDate}\n\n${entry.content}\n\n---\n\n`;
    });
    
    // Create a download link
    const blob = new Blob([exportText], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `mindmirror-journal-export-${new Date().toISOString().slice(0, 10)}.txt`;
    document.body.appendChild(a);
    a.click();
    
    // Clean up
    setTimeout(() => {
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    }, 100);
  };

  return (
    <JournalContext.Provider value={{
      journalEntries,
      currentEntry,
      currentDate,
      saveCurrentEntry,
      loadEntryByDate,
      exportEntries
    }}>
      {children}
    </JournalContext.Provider>
  );
};