const colors = require('tailwindcss/colors')

module.exports = {
  theme: {
    dark: 'class',
    extend: {
      fontSize: {
        '2xs': '.625rem', // 10px
      },
      colors: {
        // primary: {
        //   50: '#fafcf5',
        //   100: '#f4f8ec',
        //   200: '#e5eecf',
        //   300: '#d5e3b1',
        //   400: '#b5cf77',
        //   500: '#95ba3d',
        //   600: '#86a737',
        //   700: '#708c2e',
        //   800: '#597025',
        //   900: '#495b1e',
        // },
        primary: colors.coolGray,

        danger: 'var(--color-danger)',
        warning: 'var(--color-warning)',
        success: 'var(--color-success)',
        info: 'var(--color-info)',
        email: 'var(--color-emailer)',
        emailer: 'var(--color-emailer)',
        sms: 'var(--color-sms)',
        copy: 'var(--color-copy)',
        brand: '#1B2A60',
        facebook: '#3b5998',
        twitter: '#1da1f2',
        instagram: '#E4405F',
        linkedin: '#0077b5',
        github: '#181717',
        codepen: '#000000',
      },
      animation: {
        wiggle: 'wiggle 1s infinite',
      },
      keyframes: {
        wiggle: {
          '0%, 100%': {
            transform: 'scale(1.2) rotate(7deg)',
          },
          '50%': {
            transform: 'scale(0.8) rotate(-7deg)',
          },
        },
      },
      typography: {
        DEFAULT: {
          css: {
            color: '#333',
            a: {
              color: '#3182ce',
              '&:hover': {
                color: '#2c5282',
              },
            },
          },
        },
      },
    },
  },
  variants: {
    margin: ['responsive', 'last'],
    textColor: ['responsive', 'hover', 'focus', 'dark'],
    backgroundColor: [
      'responsive',
      'odd',
      'even',
      'hover',
      'focus',
      'group-hover',
      'dark',
    ],
    borderColor: ['responsive', 'hover', 'focus', 'dark'],
    borderWidth: ['responsive', 'first', 'last', 'hover', 'focus'],
    opacity: ['responsive', 'hover', 'focus', 'disabled'],
    outline: ['focus'],
    animation: ({after}) => after(['motion-safe', 'motion-reduce']),
    transitionProperty: ({after}) => after(['motion-reduce']),
    extend: {},
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/typography'),
    require('@tailwindcss/aspect-ratio'),
  ],
  configViewer: {
    themeReplacements: {
      'var(--color-black)': '#000000',
    },
  },
  purge: {
    enabled: process.env.NODE_ENV === 'production',
    content: [
      'components/**/*.vue',
      'layouts/**/*.vue',
      'pages/**/*.vue',
      'plugins/**/*.js',
      'nuxt.config.js',
    ],
  },
  darkMode: 'class',
}
