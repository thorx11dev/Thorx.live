/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        'soft-pink': '#FADADD',
        'pale-blue': '#D6EAF8',
        'light-teal': '#D1F2EB',
        'muted-yellow': '#FCF3CF',
        'peach-coral': '#FFD6C0',
        'deep-navy': '#2D3A4A',
        'light-grey': '#F7F7E7', // Updated to match reference image
        'cosmic-purple': '#8B5FBF',
        'cosmic-blue': '#4A90E2',
        // Theme-aware colors using CSS variables
        'primary': 'var(--bg-primary)',
        'secondary': 'var(--bg-secondary)',
        'tertiary': 'var(--bg-tertiary)',
      },
      textColor: {
        'primary': 'var(--text-primary)',
        'secondary': 'var(--text-secondary)',
        'tertiary': 'var(--text-tertiary)',
      },
      borderColor: {
        'primary': 'var(--border-primary)',
        'secondary': 'var(--border-secondary)',
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'bounce-slow': 'bounce 3s infinite',
        'spin-slow': 'spin 8s linear infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        }
      },
      fontFamily: {
        'cosmic': ['Inter', 'system-ui', 'sans-serif'],
      },
      backdropBlur: {
        xs: '2px',
      },
      transitionProperty: {
        'theme': 'background-color, border-color, color, fill, stroke, opacity, box-shadow, transform',
      },
      transitionDuration: {
        '300': '300ms',
      },
      transitionTimingFunction: {
        'theme': 'cubic-bezier(0.4, 0, 0.2, 1)',
      }
    },
  },
  plugins: [],
};