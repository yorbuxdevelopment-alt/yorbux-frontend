/** @type {import('tailwindcss').Config} */
import defaultTheme from 'tailwindcss/defaultTheme';

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}",
    "./src/pages/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'main-bg': 'var(--color-main-bg)',
        'card-bg': 'var(--color-card-bg)',
        'chat-bubble': 'var(--color-chat-bubble)',
        'border-color': 'var(--color-border-line)',
        'main-text': 'var(--color-main-text)',
        'sec-text': 'var(--color-sec-text)',
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
        '20': '5rem',    // 80px
        '24': '6rem',    // 96px
      },
      // Typography Scale
      fontSize: {
        'caption':    ['0.75rem', { lineHeight: '1.5', fontWeight: '400' }], // 12px
        'body-sm':    ['0.875rem', { lineHeight: '1.5', fontWeight: '400' }], // 14px
        'body':       ['1rem', { lineHeight: '1.5', fontWeight: '400' }],     // 16px (Base)
        'h4':         ['1rem', { lineHeight: '1.4', fontWeight: '500' }],     // 16px
        'h3':         ['1.125rem', { lineHeight: '1.4', fontWeight: '500' }], // 18px
        'h2':         ['1.25rem', { lineHeight: '1.3', fontWeight: '500' }], // 20px
        'h1':         ['1.5rem', { lineHeight: '1.3', fontWeight: '500' }],   // 24px
        'display-md': ['1.875rem', { lineHeight: '1.2', fontWeight: '600' }], // 30px
        'display-lg': ['2.25rem', { lineHeight: '1.2', fontWeight: '600' }], // 36px
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
      }
    },
  },
  plugins: [],
}