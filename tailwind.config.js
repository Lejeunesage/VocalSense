/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts}",
  ],
  theme: {
    extend: {},
    colors: {
      primary: '#123e67',
      white: 'white',
      gray: '#d1d5db',
      red: 'red'
      // ...
    }
  },
  plugins: [
    // require('@tailwindcss/forms'),
  ],
}

