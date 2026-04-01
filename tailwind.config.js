/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'bg-page': 'var(--bg-page)',
        'bg-surface': 'var(--bg-surface)',
        'bg-card': 'var(--bg-card)',
        'text-main': 'var(--text-main)',
        'text-sec': 'var(--text-sec)',
        'border-ui': 'var(--border-ui)',
        'action-blue': 'var(--action-blue)',
        'brand-blue': 'var(--brand-blue)',
        'brand-navy': 'var(--brand-navy)',
        'sidebar-active-bg': 'var(--sidebar-active-bg)',
        'sidebar-active-text-color': 'var(--sidebar-active-text-color)',
        'chat-active-bg': 'var(--chat-active-bg)',
      },
      fontFamily: {
        sans: ['Inter', ...defaultTheme.fontFamily.sans],
      },
      // ... other theme extensions
    },
  },
  plugins: [],
}