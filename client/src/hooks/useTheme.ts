import { useState, useEffect, createContext, useContext } from 'react';

export type Theme = 'light' | 'dark';

interface ThemeContextType {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

export const useThemeState = () => {
  const [theme, setThemeState] = useState<Theme>(() => {
    // For Thorx cosmic theme, default to dark mode for the best experience
    const savedTheme = localStorage.getItem('thorx_theme') as Theme;
    if (savedTheme && (savedTheme === 'light' || savedTheme === 'dark')) {
      return savedTheme;
    }
    
    // Default to dark mode for cosmic theme consistency
    return 'dark';
  });

  const setTheme = (newTheme: Theme) => {
    setThemeState(newTheme);
    localStorage.setItem('thorx_theme', newTheme);
    
    // Apply theme to document with proper cleanup and immediate effect
    const root = document.documentElement;
    root.classList.remove('light', 'dark');
    root.classList.add(newTheme);
    
    // Force immediate theme application with stronger CSS properties
    root.setAttribute('data-theme', newTheme);
    
    // Force CSS variables with maximum priority overrides
    if (newTheme === 'dark') {
      // Dark theme - force override
      root.style.setProperty('--bg-primary', '#0f172a', 'important');
      root.style.setProperty('--bg-secondary', '#1e293b', 'important');
      root.style.setProperty('--bg-tertiary', '#334155', 'important');
      root.style.setProperty('--text-primary', '#f8fafc', 'important');
      root.style.setProperty('--text-secondary', '#e2e8f0', 'important');
      root.style.setProperty('--text-tertiary', '#cbd5e1', 'important');
      root.style.setProperty('--border-primary', '#475569', 'important');
      root.style.setProperty('--border-secondary', '#334155', 'important');
      root.style.setProperty('--shadow-primary', 'rgba(0, 0, 0, 0.4)', 'important');
      root.style.setProperty('--shadow-secondary', 'rgba(0, 0, 0, 0.25)', 'important');
      root.style.setProperty('color-scheme', 'dark');
      document.body.style.setProperty('background-color', '#0f172a', 'important');
      document.body.style.setProperty('color', '#f8fafc', 'important');
    } else {
      // Light theme - force clean white override
      root.style.setProperty('--bg-primary', '#ffffff', 'important');
      root.style.setProperty('--bg-secondary', '#f8fafc', 'important');
      root.style.setProperty('--bg-tertiary', '#f1f5f9', 'important');
      root.style.setProperty('--text-primary', '#1e293b', 'important');
      root.style.setProperty('--text-secondary', '#475569', 'important');
      root.style.setProperty('--text-tertiary', '#64748b', 'important');
      root.style.setProperty('--border-primary', '#e2e8f0', 'important');
      root.style.setProperty('--border-secondary', '#f1f5f9', 'important');
      root.style.setProperty('--shadow-primary', 'rgba(30, 41, 59, 0.08)', 'important');
      root.style.setProperty('--shadow-secondary', 'rgba(30, 41, 59, 0.04)', 'important');
      root.style.setProperty('color-scheme', 'light');
      document.body.style.setProperty('background-color', '#ffffff', 'important');
      document.body.style.setProperty('color', '#1e293b', 'important');
    }
    
    // Force refresh of all elements
    const allElements = document.querySelectorAll('*');
    allElements.forEach(el => {
      if (el instanceof HTMLElement) {
        el.style.setProperty('transition', 'none', 'important');
        setTimeout(() => {
          el.style.removeProperty('transition');
        }, 1);
      }
    });
  };

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  // Apply theme on mount and prevent conflicts with enhanced stability
  useEffect(() => {
    // Force initial application with stronger overrides to prevent conflicts
    const root = document.documentElement;
    
    // Clear all possible conflicting classes first
    root.classList.remove('light', 'dark', 'system');
    root.classList.add(theme);
    root.setAttribute('data-theme', theme);
    
    // Set CSS custom properties immediately with enhanced stability
    if (theme === 'dark') {
      // Dark theme variables
      root.style.setProperty('--bg-primary', '#0f172a', 'important');
      root.style.setProperty('--bg-secondary', '#1e293b', 'important');
      root.style.setProperty('--bg-tertiary', '#334155', 'important');
      root.style.setProperty('--text-primary', '#f8fafc', 'important');
      root.style.setProperty('--text-secondary', '#e2e8f0', 'important');
      root.style.setProperty('--text-tertiary', '#cbd5e1', 'important');
      root.style.setProperty('--border-primary', '#475569', 'important');
      root.style.setProperty('--border-secondary', '#334155', 'important');
      root.style.setProperty('--shadow-primary', 'rgba(0, 0, 0, 0.4)', 'important');
      root.style.setProperty('--shadow-secondary', 'rgba(0, 0, 0, 0.25)', 'important');
      root.style.setProperty('color-scheme', 'dark');
      document.body.style.setProperty('background-color', '#0f172a', 'important');
    } else {
      // Light theme variables - Updated to match new minimal design
      root.style.setProperty('--bg-primary', '#ffffff', 'important');
      root.style.setProperty('--bg-secondary', '#f8fafc', 'important');
      root.style.setProperty('--bg-tertiary', '#f1f5f9', 'important');
      root.style.setProperty('--text-primary', '#1e293b', 'important');
      root.style.setProperty('--text-secondary', '#475569', 'important');
      root.style.setProperty('--text-tertiary', '#64748b', 'important');
      root.style.setProperty('--border-primary', '#e2e8f0', 'important');
      root.style.setProperty('--border-secondary', '#f1f5f9', 'important');
      root.style.setProperty('--shadow-primary', 'rgba(30, 41, 59, 0.08)', 'important');
      root.style.setProperty('--shadow-secondary', 'rgba(30, 41, 59, 0.04)', 'important');
      root.style.setProperty('color-scheme', 'light');
      document.body.style.setProperty('background-color', '#ffffff', 'important');
    }
    
    // Prevent any interference from other sources
    requestAnimationFrame(() => {
      root.classList.remove('light', 'dark', 'system');
      root.classList.add(theme);
    });
  }, [theme]);

  // Listen for system theme changes but respect user preference
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleChange = (e: MediaQueryListEvent) => {
      const savedTheme = localStorage.getItem('thorx_theme');
      // Only update if user hasn't set a preference
      if (!savedTheme) {
        setTheme(e.matches ? 'dark' : 'light');
      }
    };

    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, [setTheme]);

  return {
    theme,
    setTheme,
    toggleTheme
  };
};

export { ThemeContext };
export type { ThemeContextType };