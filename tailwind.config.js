/** @type {import('tailwindcss').Config} */
const defaultTheme = require('tailwindcss/defaultTheme');

module.exports = {
  darkMode: 'class', // Enable dark mode based on class
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}",
    "./src/pages/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      // Colors - Mapped from CSS Variables
      colors: {
        'bg-page': 'var(--bg-page)',
        'bg-surface': 'var(--bg-surface)',
        'bg-card': 'var(--bg-card)',
        
        'text-main': 'var(--text-main)',
        'text-sec': 'var(--text-sec)',
        'border-ui': 'var(--border-ui)',
        
        'action-blue': 'var(--action-blue)',
        'brand-blue': 'var(--brand-blue)',
        'brand-navy': 'var(--brand-navy)', // Added for gradient
      },
      // Spacing System (8dp Grid)
      spacing: {
        '1': '0.25rem',  // 4px
        '2': '0.5rem',   // 8px
        '3': '0.75rem',  // 12px
        '4': '1rem',     // 16px
        '5': '1.25rem',  // 20px
        '6': '1.5rem',   // 24px
        '8': '2rem',     // 32px
        '10': '2.5rem',  // 40px
        '12': '3rem',    // 48px
        '16': '4rem',    // 64px
      },
      // Typography Scale
      fontSize: {
        'display': ['2.25rem', { lineHeight: '1.2', fontWeight: '600' }], // 36px
        'h1':      ['1.5rem', { lineHeight: '1.3', fontWeight: '500' }],   // 24px
        'h2':      ['1.25rem', { lineHeight: '1.3', fontWeight: '500' }], // 20px
        'h3':      ['1rem', { lineHeight: '1.4', fontWeight: '700' }],     // 16px (Bold)
        // Base body text is 16px (1rem) by default in Tailwind
        'sm':      ['0.875rem', { lineHeight: '1.5', fontWeight: '400' }], // 14px
        'xs':      ['0.75rem', { lineHeight: '1.5', fontWeight: '400' }], // 12px
        '2xs':     ['0.625rem', { lineHeight: '1.5', fontWeight: '400' }], // 10px
      },
      // Font Family
      fontFamily: {
        sans: ['Inter', ...defaultTheme.fontFamily.sans],
      },
      // Box Shadow
      boxShadow: {
        'sm': '0 1px 2px 0 rgb(0 0 0 / 0.05)',
        'DEFAULT': '0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)',
        'md': '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
        'lg': '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)',
      },
      borderRadius: {
        'xl': '0.75rem', // 12px
        '2xl': '1rem', // 16px
        '3xl': '1.5rem', // 24px
      }
    },
  },
  plugins: [],
}
