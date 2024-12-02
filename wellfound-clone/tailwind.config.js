/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'wellfound-purple': '#4A00E0',
        'wellfound-text': '#1C1C1C',
        'wellfound-gray': '#666666',
        'wellfound-light': '#F9FAFB',
        'wellfound-border': '#E5E7EB',
      },
      boxShadow: {
        'wellfound': '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
      }
    },
  },
  plugins: [],
}

