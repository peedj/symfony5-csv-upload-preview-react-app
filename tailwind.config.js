const colors = require('tailwindcss/colors');

module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    darkMode: false, // or 'media' or 'class'
    screens: {
      sm: '480px',
      md: '768px',
      lg: '976px',
      xl: '1440px',
    },
    colors: {
      gray: colors.coolGray,
      blue: colors.lightBlue,
      red: colors.rose,
      white: colors.white,
      teal: colors.teal,
    },
    fontFamily: {
      sans: ['Graphik', 'sans-serif'],
      serif: ['Merriweather', 'serif'],
    },
    extend: {
      spacing: {
        '128': '32rem',
        '144': '36rem',
      },
      borderRadius: {
        '4xl': '2rem',
      },
      border: {
        '5': '5px',
      }
    },
    gradientColorStops: theme => ({
      ...theme('colors'),
    }),
    fill: theme => ({
      'white': theme('colors.white'),
      'red': theme('colors.red.500'),
      'gray': theme('colors.gray.500'),
      'blue': theme('colors.blue.500'),
    }),
    backgroundPosition: {
      'move': '100px 100px',
    }
  },
  variants: {
    extend: {
      transitionTimingFunction: ['hover', 'focus', 'responsive'],
      backgroundPosition: ['hover', 'focus'],
    }
  },
  plugins: [],
}
