import { useState, useEffect } from 'react';
import { BsSun, BsMoonStars } from 'react-icons/bs';
import { MdComputer } from 'react-icons/md';
import { motion } from 'framer-motion';
import './ThemeSwitch.css';

const ThemeSwitch: React.FC<{ onThemeChange: (theme: 'light' | 'dark') => void }> = ({ 
  onThemeChange 
}) => {
  // Local state for selected mode - initialized to 'system'
  const [selectedMode, setSelectedMode] = useState<'light' | 'system' | 'dark'>('system');
  
  useEffect(() => {
    // When system is chosen, check the PC's theme
    // Otherwise, set the chosen theme directly (light/dark)
    if (selectedMode === 'system') {
      const isDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      onThemeChange(isDark ? 'dark' : 'light');
    } else {
      onThemeChange(selectedMode);
    }
  }, [selectedMode, onThemeChange]);

  // Add event listener for system theme changes
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    
    const handleChange = (e: MediaQueryListEvent) => {
      if (selectedMode === 'system') {
        onThemeChange(e.matches ? 'dark' : 'light');
      }
    };
    
    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, [selectedMode, onThemeChange]);

  const getPositionX = () => {
    // Calculate slider position based on mode
    switch (selectedMode) {
      case 'light': return 4;
      case 'system': return 40;
      case 'dark': return 76;
      default: return 40;
    }
  };
  
  // Function to determine color based on active/inactive state
  const getButtonClass = (mode: 'light' | 'system' | 'dark') => {
    return `theme-icon-button ${selectedMode === mode ? 'active' : ''}`;
  };

  return (
    <div className="theme-switch-container">
      <motion.div
        className="theme-switch-slider"
        initial={false}
        transition={{ 
          type: "spring", 
          stiffness: 800, 
          damping: 35,
          duration: 0.1
        }}
        animate={{ 
          x: getPositionX()
        }}
      />
      
      <div className="theme-switch-buttons">
        <button
          className={getButtonClass('light')}
          onClick={() => setSelectedMode('light')}
          aria-label="Light mode"
        >
          <BsSun />
        </button>
        <button
          className={getButtonClass('system')}
          onClick={() => setSelectedMode('system')}
          aria-label="System mode"
        >
          <MdComputer />
        </button>
        <button
          className={getButtonClass('dark')}
          onClick={() => setSelectedMode('dark')}
          aria-label="Dark mode"
        >
          <BsMoonStars />
        </button>
      </div>
    </div>
  );
};

export default ThemeSwitch; 