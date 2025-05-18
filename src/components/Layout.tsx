import React from 'react';
import Header from './Header';
import Sidebar from './Sidebar';
import { useTheme } from '../context/ThemeContext';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const { theme } = useTheme();
  
  return (
    <div className={`min-h-screen transition-colors duration-300 ${
      theme === 'dark' 
        ? 'bg-gray-900 text-gray-100' 
        : 'bg-gray-50 text-gray-900'
    }`}>
      <Header />
      <div className="container mx-auto px-4 flex flex-col md:flex-row">
        <div className="md:w-1/4 lg:w-1/5">
          <Sidebar />
        </div>
        <main className="flex-grow md:w-3/4 lg:w-4/5 p-4">
          {children}
        </main>
      </div>
    </div>
  );
};

export default Layout;