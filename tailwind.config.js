const defaultTheme = require('tailwindcss/defaultTheme')
const tailWindColors = require('tailwindcss/colors')
const defaultColors = require('./config/__DEFAULT__/colors')
const boosterColors = require('./config/booster/colors')
const emaColors = require('./config/ema/colors')
const gaSpsColors = require('./config/ga_sps_org/colors')
const promiseServesColors = require('./config/promise_serves/colors')

const colors = {
  ...defaultColors,
  ...boosterColors,
  ...emaColors,
  ...gaSpsColors,
  ...promiseServesColors,
  ...tailWindColors,
}

module.exports = {
  theme: {
    dark: 'class',
    extend: {
      aspectRatio: {
        17: '17',
        21: '21',
        22: '22',
        33: '33',
        34: '34',
        74: '74',
        76: '76',
        78: '78',
        105: '105',
        135: '135',
        205: '205',
      },
      boxShadow: {
        tag: '3px 3px 0 #004085',
        field: 'rgba(10, 10, 10, 0.1) 0px 1px 2px 0px inset',
      },
      fontSize: {
        '2xs': '.625rem', // 10px
      },
      fontFamily: {
        sans: ['Inter var', ...defaultTheme.fontFamily.sans],
        display: ['Pica'],
        mono: [
          'Roboto Mono',
          'Cousine',
          'Input Mono',
          ...defaultTheme.fontFamily.mono,
        ],
        cursive: ['Balsamiq Sans', 'cursive'],
        proto: [
          'Redacted Script',
          '"Flow Block"',
          '"Blokk Neue"',
          'Blokk',
          '"Flow Circular"',
          '"Flow Rounded"',
        ],
      },
      colors: {
        // primary: colors.burgundy,
        // primary: colors.blueGray,
        // primary: colors.jacarta,
        // primary: colors.studio,
        // primary: colors.paprika,
        // primary: colors.emerald,
        // primary: colors.oliveGreen,
        primary: colors['flame-pea'],

        // secondary: colors['silver-chalice'],
        // secondary: colors.coolGray,
        // secondary: colors['clay-creek'],
        // secondary: colors['gold-tips'],
        // secondary: colors['tory-blue'],
        // secondary: colors['cornflower-blue'],
        // secondary: colors.mineShaft,
        secondary: colors.deepTeal,

        // tertiary: colors['hokey-pokey'],
        // tertiary: colors.trueGray,
        // tertiary: colors.mineShaft,
        // tertiary: colors['deep-sea'],
        // tertiary: colors['deep-sea'],
        // tertiary: colors['picton-blue'],
        // tertiary: colors['yellow-orange'],
        // tertiary: colors.candlelight,
        tertiary: colors.peachSchnapps,

        orange: colors.amber,
        teal: colors.teal,

        rose: colors.rose,
        lime: colors.lime,
        'light-blue': colors.lightBlue,

        danger: 'var(--color-danger)',
        warning: 'var(--color-warning)',
        success: 'var(--color-success)',
        info: 'var(--color-info)',
        email: 'var(--color-emailer)',
        emailer: 'var(--color-emailer)',
        sms: 'var(--color-sms)',
        copy: 'var(--color-copy)',
        brand: '#1B2A60',
        'booster-blue': '#003E7E',
        'booster-red': '#B3282D',
        bootstrap: '#7952B3',
        buefy: '#7957D5',
        bulma: '#00D1B2',
        codeigniter: '#EE4323',
        codepen: '#000000',
        ema: '#202d56',
        facebook: '#3b5998',
        github: '#181717',
        instagram: '#E4405F',
        laravel: '#FF2D20',
        linkedin: '#0077b5',
        php: '#777BB4',
        promiseserves: '#95ba3d',
        ruby: '#CC342D',
        twitter: '#1da1f2',
        vue: '#4FC08D',
        'temperture-01': '#3eff00',
        'temperture-02': '#b0ff00',
        'temperture-03': '#FFfa00',
        'temperture-04': '#FFdc00',
        'temperture-05': '#FFbe00',
        'temperture-06': '#FFa000',
        'temperture-07': '#FF8200',
        'temperture-08': '#FF6400',
        'temperture-09': '#FF4600',
        'temperture-10': '#FF2800',
        nuxt: {
          gray: '#243746',
          lightgreen: '#41B38A',
          green: '#158876',
        },
        main: {
          DEFAULT: colors.gray[700],
          dark: '#ffffff',
        },
        // primary: {
        //   DEFAULT: '#1fb6ff',
        //   dark: '#ffffff',
        // },
        highlight: {
          DEFAULT: colors.red[700],
          dark: colors.violet[800],
        },
        'highlight-background': {
          DEFAULT: colors.yellow[400],
          dark: '#1fb6ff',
        },
      },
      fill: theme => ({
        'nuxt-gray': theme('colors.nuxt.gray'),
        'nuxt-lightgreen': theme('colors.nuxt.lightgreen'),
        'nuxt-green': theme('colors.nuxt.green'),
      }),
      stroke: theme => ({
        'nuxt-gray': theme('colors.nuxt.gray'),
        'nuxt-lightgreen': theme('colors.nuxt.lightgreen'),
        'nuxt-green': theme('colors.nuxt.green'),
      }),
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
      typography: theme => ({
        DEFAULT: {
          css: {
            color: theme('colors.gray.900'),
            a: {
              color: theme('colors.blue.700'),
              '&:hover': {
                color: theme('colors.blue.700'),
                textDecoration: 'none',
              },
            },
            'h2 a': {
              color: theme('colors.gray.900'),
              textDecoration: 'none',
            },
            '.tag a': {
              textDecoration: 'none',
            },
          },
        },

        dark: {
          css: {
            color: '#7982a9',
            a: {
              color: '#9ECE6A',
              '&:hover': {
                color: '#9ECE6A',
              },
            },

            'h2 a': {
              color: '#A9B1D6',
            },

            h1: {
              color: '#A9B1D6',
            },
            h2: {
              color: '#A9B1D6',
            },
            h3: {
              color: '#A9B1D6',
            },
            h4: {
              color: '#A9B1D6',
            },
            h5: {
              color: '#A9B1D6',
            },
            h6: {
              color: '#A9B1D6',
            },

            strong: {
              color: '#A9B1D6',
            },

            code: {
              color: '#A9B1D6',
            },

            figcaption: {
              color: theme('colors.gray.500'),
            },

            '::selection': {
              backgroundColor: '#6f7bb635',
            },
          },
        },
      }),
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
    // typography: ['responsive', 'dark'],
    extend: {
      typography: ['dark'],
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/line-clamp'),
    require('@tailwindcss/typography'),
    require('@tailwindcss/aspect-ratio'),
  ],
  configViewer: {
    baseFontSize: 16,
    typographyExample: 'Your example sentence',
    themeReplacements: {
      'var(--color-black)': '#000000',
    },
  },
  purge: {
    enabled: process.env.NODE_ENV === 'production',
    content: ['./public/index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  },
  darkMode: 'class',
}
