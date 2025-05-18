// Define types for patterns and their detection
export interface ThoughtPattern {
  type: string;
  explanation: string;
  reframe: string;
  keywords: string[];
  regex?: RegExp;
}

// Define common cognitive distortions/thought patterns
const thoughtPatterns: ThoughtPattern[] = [
  {
    type: 'All-or-Nothing Thinking',
    explanation: 'Seeing things in black-and-white categories with no middle ground.',
    reframe: 'Consider that situations usually fall somewhere in the middle. Look for partial success or the gray areas.',
    keywords: ['always', 'never', 'every time', 'completely', 'totally', 'nothing', 'everything'],
    regex: /\b(always|never|every time|completely|totally|nothing|everything)\b/i
  },
  {
    type: 'Catastrophizing',
    explanation: 'Expecting the worst possible outcome to happen.',
    reframe: 'Ask yourself what\'s most likely to happen, not just what\'s possible. What evidence suggests a less catastrophic outcome?',
    keywords: ['terrible', 'disaster', 'can\'t handle', 'awful', 'horrible', 'worst', 'catastrophe', 'end of the world'],
    regex: /\b(terrible|disaster|can't handle|awful|horrible|worst|catastrophe|end of the world)\b/i
  },
  {
    type: 'Mind Reading',
    explanation: 'Assuming you know what others are thinking without evidence.',
    reframe: 'Remember that you can\'t know what someone else is thinking without asking them. Consider alternative interpretations.',
    keywords: ['thinks I\'m', 'must think', 'knows I', 'judging me', 'think I\'m', 'they think', 'thinks that'],
    regex: /\b(thinks I'm|must think|knows I|judging me|think I'm|they think|thinks that)\b/i
  },
  {
    type: 'Emotional Reasoning',
    explanation: 'Believing something is true because it "feels" true, regardless of evidence.',
    reframe: 'Your feelings are valid, but they aren\'t always accurate reflections of reality. Look for objective evidence.',
    keywords: ['feel like', 'feels like', 'must be', 'because I feel'],
    regex: /\b(feel like|feels like|must be|because I feel)\b/i
  },
  {
    type: 'Overgeneralization',
    explanation: 'Taking one negative event as evidence of never-ending pattern of defeat.',
    reframe: 'This is just one situation. Each circumstance is different and the outcome isn\'t predetermined by past events.',
    keywords: ['this always happens', 'never works out', 'everyone', 'no one', 'every time I'],
    regex: /\b(this always happens|never works out|everyone|no one|every time I)\b/i
  },
  {
    type: 'Labeling',
    explanation: 'Attaching negative labels to yourself or others instead of describing behavior.',
    reframe: 'Focus on specific behaviors rather than applying global labels. We are all complex and not defined by single actions.',
    keywords: ['I am a', 'I\'m a', 'such a', 'loser', 'failure', 'idiot', 'stupid', 'worthless', 'useless'],
    regex: /\b(I am a|I'm a|such a|loser|failure|idiot|stupid|worthless|useless)\b/i
  },
  {
    type: 'Personalization',
    explanation: 'Taking responsibility for external events outside of your control.',
    reframe: 'Many factors contribute to outcomes, and most are not your responsibility. What parts of this situation are truly in your control?',
    keywords: ['my fault', 'because of me', 'I caused', 'I should have', 'if only I had'],
    regex: /\b(my fault|because of me|I caused|I should have|if only I had)\b/i
  },
  {
    type: 'Filtering',
    explanation: 'Focusing exclusively on negative details while ignoring positives.',
    reframe: 'Challenge yourself to find something positive or neutral in the situation. What went well or what did you learn?',
    keywords: ['but', 'except', 'only bad', 'nothing good', 'all bad'],
    regex: /\b(nothing good|only bad|all bad)\b/i
  }
];

export function detectPatterns(text: string): ThoughtPattern[] {
  if (!text || text.trim() === '') {
    return [];
  }

  const detectedPatterns: ThoughtPattern[] = [];
  const lowerText = text.toLowerCase();

  // Check for each pattern
  thoughtPatterns.forEach(pattern => {
    if (pattern.regex && pattern.regex.test(lowerText)) {
      // Don't add duplicates
      if (!detectedPatterns.some(dp => dp.type === pattern.type)) {
        detectedPatterns.push(pattern);
      }
    } else {
      // Fallback to keyword matching if regex fails
      const hasPattern = pattern.keywords.some(keyword => 
        lowerText.includes(keyword.toLowerCase())
      );
      
      if (hasPattern && !detectedPatterns.some(dp => dp.type === pattern.type)) {
        detectedPatterns.push(pattern);
      }
    }
  });

  return detectedPatterns;
}