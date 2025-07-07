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
    
    // Apply theme to document with controlled cleanup
    const root = document.documentElement;
    root.classList.remove('light', 'dark');
    root.classList.add(newTheme);
    
    // Set data-theme attribute for CSS targeting
    root.setAttribute('data-theme', newTheme);
    
    // Let CSS handle the styling - remove direct JS style manipulation
    // This prevents conflicts with the CSS theme system
  };

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  // Apply theme on mount with CSS-only approach for stability
  useEffect(() => {
    const root = document.documentElement;
    
    // Clear all theme classes to prevent conflicts
    root.classList.remove('light', 'dark');
    
    // Apply the new theme class - let CSS handle all styling
    root.classList.add(theme);
    root.setAttribute('data-theme', theme);
    
    // Remove any inline styles that might conflict with CSS
    root.style.removeProperty('--bg-primary');
    root.style.removeProperty('--bg-secondary');
    root.style.removeProperty('--bg-tertiary');
    root.style.removeProperty('--text-primary');
    root.style.removeProperty('--text-secondary');
    root.style.removeProperty('--text-tertiary');
    root.style.removeProperty('--border-primary');
    root.style.removeProperty('--border-secondary');
    root.style.removeProperty('--shadow-primary');
    root.style.removeProperty('--shadow-secondary');
    root.style.removeProperty('color-scheme');
    document.body.style.removeProperty('background-color');
    
    // Force CSS reflow to ensure theme is applied immediately
    void root.offsetHeight;
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