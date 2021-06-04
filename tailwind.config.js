module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {},
  },
  variants: {
    extend: {},
  },
  fontFamily: {
    sans: ['Montserrat', 'system-ui', '-apple-system', 'BlinkMacSystemFont',
      "Segoe UI", 'Roboto', "Helvetica Neue", 'Arial', "Noto Sans", 'sans-serif',
      "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"],
    serif: ['Merriweather', 'serif'],
  },
  plugins: [],
}
