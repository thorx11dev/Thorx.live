import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';

// Immediately apply dark theme to prevent white flash
const applyImmediateDarkTheme = () => {
  const root = document.documentElement;
  const body = document.body;
  
  // Apply dark theme classes and attributes
  root.classList.add('dark');
  root.setAttribute('data-theme', 'dark');
  body.classList.add('dark');
  
  // Set background immediately
  root.style.backgroundColor = '#0f172a';
  body.style.backgroundColor = '#0f172a';
  
  // Hide loading fallback
  const loadingFallback = document.querySelector('.loading-fallback');
  if (loadingFallback) {
    (loadingFallback as HTMLElement).style.display = 'none';
  }
};

// Apply theme before React renders
applyImmediateDarkTheme();

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>
);
