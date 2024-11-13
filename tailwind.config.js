module.exports = {
  content: [
    "./pages/**/*.{js,jsx}",
    "./components/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#1C1C1C',   // Almost black
        secondary: '#D4AF37', // Gold
        accent: '#848484',    // Silver
        background: '#F5F5F5', // Light gray
        text: '#333333',      // Dark gray
      },
      fontFamily: {
        heading: ['Playfair Display', 'serif'],
        body: ['Inter', 'sans-serif'],
      },
    },
  },
  plugins: [require('@tailwindcss/typography'),],
}