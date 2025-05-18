import React from 'react';
import { useTheme } from '../context/ThemeContext';
import { detectPatterns } from '../services/patternDetection';

interface PatternDetectorProps {
  content: string;
}

const PatternDetector: React.FC<PatternDetectorProps> = ({ content }) => {
  const { theme } = useTheme();
  const patterns = detectPatterns(content);
  
  if (!content.trim()) {
    return (
      <div className={`md:w-1/3 p-5 rounded-lg transition-colors duration-300 ${
        theme === 'dark' ? 'bg-gray-800' : 'bg-white shadow-md'
      }`}>
        <h3 className="text-lg font-semibold mb-3">Thought Patterns</h3>
        <p className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>
          As you journal, I'll detect patterns in your thinking and offer gentle reframing suggestions.
        </p>
      </div>
    );
  }
  
  return (
    <div className={`md:w-1/3 p-5 rounded-lg transition-colors duration-300 ${
      theme === 'dark' ? 'bg-gray-800' : 'bg-white shadow-md'
    }`}>
      <h3 className="text-lg font-semibold mb-3">Thought Patterns</h3>
      
      {patterns.length > 0 ? (
        <div className="space-y-4">
          {patterns.map((pattern, index) => (
            <div 
              key={index}
              className={`p-3 rounded-md transition-all duration-300 transform hover:scale-102 ${
                theme === 'dark' 
                  ? 'bg-gray-700 hover:bg-gray-650' 
                  : 'bg-gray-100 hover:bg-gray-200'
              }`}
            >
              <h4 className={`font-medium mb-1 ${
                theme === 'dark' ? 'text-yellow-300' : 'text-yellow-600'
              }`}>
                {pattern.type}
              </h4>
              <p className="text-sm mb-2">{pattern.explanation}</p>
              <div className={`text-sm p-2 rounded ${
                theme === 'dark' 
                  ? 'bg-blue-900/30 text-blue-300' 
                  : 'bg-blue-50 text-blue-700'
              }`}>
                <span className="font-medium">Try this instead:</span> {pattern.reframe}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>
          No negative thought patterns detected. Great job with your positive thinking!
        </p>
      )}
    </div>
  );
};

export default PatternDetector;