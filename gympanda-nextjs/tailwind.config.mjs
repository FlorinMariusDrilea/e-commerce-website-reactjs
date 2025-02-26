/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx}',  // Ensure this is set to the correct app directory path
    './pages/**/*.{js,ts,jsx,tsx}', // Also include the pages directory if using it
    './components/**/*.{js,ts,jsx,tsx}',  // Optional: if you have components in a components folder
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}