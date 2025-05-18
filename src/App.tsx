import React from 'react';
import { ThemeProvider } from './context/ThemeContext';
import Layout from './components/Layout';
import JournalEditor from './components/JournalEditor';
import { JournalProvider } from './context/JournalContext';

function App() {
  return (
    <ThemeProvider>
      <JournalProvider>
        <Layout>
          <JournalEditor />
        </Layout>
      </JournalProvider>
    </ThemeProvider>
  );
}

export default App;