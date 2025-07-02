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
    // Check localStorage first, then system preference
    const savedTheme = localStorage.getItem('thorx_theme') as Theme;
    if (savedTheme && (savedTheme === 'light' || savedTheme === 'dark')) {
      return savedTheme;
    }
    
    // Check system preference
    if (typeof window !== 'undefined' && window.matchMedia) {
      return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    }
    
    return 'light';
  });

  const setTheme = (newTheme: Theme) => {
    setThemeState(newTheme);
    localStorage.setItem('thorx_theme', newTheme);
    
    // Apply theme to document
    const root = document.documentElement;
    root.classList.remove('light', 'dark');
    root.classList.add(newTheme);
    
    // Update CSS custom properties for smooth transitions
    if (newTheme === 'dark') {
      root.style.setProperty('--bg-primary', '#121212');
      root.style.setProperty('--bg-secondary', '#1e1e1e');
      root.style.setProperty('--bg-tertiary', '#2a2a2a');
      root.style.setProperty('--text-primary', '#ffffff');
      root.style.setProperty('--text-secondary', 'rgba(255, 255, 255, 0.7)');
      root.style.setProperty('--text-tertiary', 'rgba(255, 255, 255, 0.5)');
      root.style.setProperty('--border-primary', 'rgba(255, 255, 255, 0.1)');
      root.style.setProperty('--border-secondary', 'rgba(255, 255, 255, 0.05)');
      root.style.setProperty('--shadow-primary', 'rgba(0, 0, 0, 0.3)');
      root.style.setProperty('--shadow-secondary', 'rgba(0, 0, 0, 0.2)');
    } else {
      root.style.setProperty('--bg-primary', '#FAFAFA');
      root.style.setProperty('--bg-secondary', '#ffffff');
      root.style.setProperty('--bg-tertiary', '#f8f9fa');
      root.style.setProperty('--text-primary', '#2D3A4A');
      root.style.setProperty('--text-secondary', 'rgba(45, 58, 74, 0.7)');
      root.style.setProperty('--text-tertiary', 'rgba(45, 58, 74, 0.5)');
      root.style.setProperty('--border-primary', 'rgba(214, 234, 248, 0.2)');
      root.style.setProperty('--border-secondary', 'rgba(214, 234, 248, 0.1)');
      root.style.setProperty('--shadow-primary', 'rgba(45, 58, 74, 0.08)');
      root.style.setProperty('--shadow-secondary', 'rgba(45, 58, 74, 0.05)');
    }
  };

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  // Apply theme on mount
  useEffect(() => {
    setTheme(theme);
  }, []);

  // Listen for system theme changes
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleChange = (e: MediaQueryListEvent) => {
      const savedTheme = localStorage.getItem('thorx_theme');
      if (!savedTheme) {
        setTheme(e.matches ? 'dark' : 'light');
      }
    };

    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  return {
    theme,
    setTheme,
    toggleTheme
  };
};

export { ThemeContext };
export type { ThemeContextType };