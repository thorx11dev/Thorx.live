import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sun, Moon, Check } from 'lucide-react';
import { useTheme, Theme } from '../hooks/useTheme';

const ThemeSwitcher = () => {
  const { theme, setTheme } = useTheme();
  const [showFeedback, setShowFeedback] = useState(false);

  const handleThemeChange = (newTheme: Theme) => {
    if (newTheme !== theme) {
      setTheme(newTheme);
      setShowFeedback(true);
      setTimeout(() => setShowFeedback(false), 1500);
    }
  };

  const themes = [
    {
      id: 'light' as Theme,
      name: 'Light',
      icon: Sun,
      preview: 'bg-white border-2 border-gray-200',
      description: 'Clean and bright interface'
    },
    {
      id: 'dark' as Theme,
      name: 'Dark',
      icon: Moon,
      preview: 'bg-gray-800 border-2 border-gray-600',
      description: 'Easy on the eyes in low light'
    }
  ];

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h4 className="font-medium text-primary mb-1">Theme Preference</h4>
          <p className="text-sm text-secondary">Choose your preferred interface theme</p>
        </div>
        <AnimatePresence>
          {showFeedback && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8, x: 20 }}
              animate={{ opacity: 1, scale: 1, x: 0 }}
              exit={{ opacity: 0, scale: 0.8, x: 20 }}
              className="flex items-center space-x-2 bg-green-50 text-green-800 px-3 py-1 rounded-full border border-green-200"
            >
              <Check className="w-3 h-3" />
              <span className="text-xs font-medium">Theme applied!</span>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <div className="grid grid-cols-2 gap-4">
        {themes.map((themeOption) => (
          <motion.div
            key={themeOption.id}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => handleThemeChange(themeOption.id)}
            className={`cursor-pointer p-4 rounded-xl border-2 transition-all duration-300 ${
              theme === themeOption.id
                ? 'border-soft-pink bg-soft-pink/10 shadow-lg'
                : 'border-border-primary hover:border-soft-pink/50 bg-secondary'
            }`}
            style={{
              boxShadow: theme === themeOption.id 
                ? "0 8px 20px rgba(250, 173, 221, 0.2)" 
                : "0 4px 12px var(--shadow-secondary)"
            }}
          >
            {/* Theme Preview */}
            <div className={`w-full h-16 rounded-lg mb-3 relative overflow-hidden ${themeOption.preview}`}>
              {/* Preview content */}
              <div className="absolute inset-2 space-y-1">
                <div className={`h-2 rounded ${themeOption.id === 'dark' ? 'bg-gray-600' : 'bg-gray-200'}`} />
                <div className={`h-1 w-3/4 rounded ${themeOption.id === 'dark' ? 'bg-gray-700' : 'bg-gray-300'}`} />
                <div className={`h-1 w-1/2 rounded ${themeOption.id === 'dark' ? 'bg-gray-700' : 'bg-gray-300'}`} />
              </div>
              
              {/* Selection indicator */}
              <AnimatePresence>
                {theme === themeOption.id && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0 }}
                    className="absolute top-2 right-2 w-5 h-5 bg-soft-pink rounded-full flex items-center justify-center"
                  >
                    <Check className="w-3 h-3 text-white" />
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Theme Info */}
            <div className="flex items-center space-x-3">
              <div className={`flex items-center justify-center w-8 h-8 rounded-lg ${
                theme === themeOption.id ? 'bg-soft-pink' : 'bg-tertiary'
              } transition-colors duration-300`}>
                <themeOption.icon className={`w-4 h-4 ${
                  theme === themeOption.id ? 'text-white' : 'text-tertiary'
                }`} />
              </div>
              <div className="flex-1">
                <div className="font-medium text-primary">{themeOption.name}</div>
                <div className="text-xs text-secondary">{themeOption.description}</div>
              </div>
            </div>

            {/* Active indicator */}
            {theme === themeOption.id && (
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: '100%' }}
                className="h-0.5 bg-soft-pink rounded-full mt-3"
              />
            )}
          </motion.div>
        ))}
      </div>

      {/* Additional Theme Info */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="p-3 bg-tertiary rounded-lg border border-border-secondary"
      >
        <div className="flex items-center space-x-2 text-sm text-secondary">
          <div className="w-2 h-2 bg-soft-pink rounded-full" />
          <span>
            Theme preference is automatically saved and will persist across sessions
          </span>
        </div>
      </motion.div>
    </div>
  );
};

export default ThemeSwitcher;