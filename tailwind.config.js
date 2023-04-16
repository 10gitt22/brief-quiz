/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
    './ui/**/*.{js,ts,jsx,tsx}',
    './app/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        'app-primary': 'var(--app-primary)',
        'app-black': 'var(--app-black)',
        'app-white': 'var(--app-white)',
      },
      fontSize: {
        h1: '60px',
      },
      height: {
        header: 'var(--header-height)',
        input: 'var(--input-height)',
        button: 'var(--button-height)',
      },
      borderRadius: {
        input: 'var(--border-radius)',
        button: 'var(--border-radius)',
      },
    },
  },
  plugins: [],
};
