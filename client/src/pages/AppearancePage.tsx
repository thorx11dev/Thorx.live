import React from 'react';
import { Palette, Sun, Moon, Monitor } from 'lucide-react';
import { useTheme } from '../hooks/useTheme';

const AppearancePage: React.FC = () => {
  const { theme, setTheme } = useTheme();

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900 pt-20 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white dark:bg-slate-800 rounded-lg shadow-lg p-6">
          <div className="flex items-center space-x-3 mb-6">
            <Palette className="w-6 h-6 text-purple-600" />
            <h1 className="text-2xl font-bold text-slate-900 dark:text-slate-100">
              Appearance
            </h1>
          </div>
          
          <div className="space-y-6">
            <div className="p-4 bg-slate-50 dark:bg-slate-700 rounded-lg">
              <h3 className="font-semibold text-slate-900 dark:text-slate-100 mb-4">
                Theme Selection
              </h3>
              <div className="grid grid-cols-3 gap-4">
                <button
                  onClick={() => setTheme('light')}
                  className={`p-4 rounded-lg border-2 transition-colors ${
                    theme === 'light'
                      ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
                      : 'border-slate-300 dark:border-slate-600 hover:border-slate-400 dark:hover:border-slate-500'
                  }`}
                >
                  <Sun className="w-6 h-6 mx-auto mb-2 text-yellow-500" />
                  <span className="text-sm font-medium text-slate-900 dark:text-slate-100">
                    Light
                  </span>
                </button>
                
                <button
                  onClick={() => setTheme('dark')}
                  className={`p-4 rounded-lg border-2 transition-colors ${
                    theme === 'dark'
                      ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
                      : 'border-slate-300 dark:border-slate-600 hover:border-slate-400 dark:hover:border-slate-500'
                  }`}
                >
                  <Moon className="w-6 h-6 mx-auto mb-2 text-blue-500" />
                  <span className="text-sm font-medium text-slate-900 dark:text-slate-100">
                    Dark
                  </span>
                </button>
                
                <button
                  className="p-4 rounded-lg border-2 border-slate-300 dark:border-slate-600 hover:border-slate-400 dark:hover:border-slate-500 transition-colors opacity-50 cursor-not-allowed"
                  disabled
                >
                  <Monitor className="w-6 h-6 mx-auto mb-2 text-slate-400" />
                  <span className="text-sm font-medium text-slate-400">
                    System
                  </span>
                </button>
              </div>
            </div>
            
            <div className="p-4 bg-slate-50 dark:bg-slate-700 rounded-lg">
              <h3 className="font-semibold text-slate-900 dark:text-slate-100 mb-4">
                Display Settings
              </h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-slate-600 dark:text-slate-400">
                    Compact Mode
                  </span>
                  <button className="bg-slate-300 dark:bg-slate-600 text-slate-700 dark:text-slate-300 px-3 py-1 rounded-lg text-sm">
                    Off
                  </button>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-slate-600 dark:text-slate-400">
                    Animations
                  </span>
                  <button className="bg-blue-600 text-white px-3 py-1 rounded-lg text-sm">
                    On
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AppearancePage;