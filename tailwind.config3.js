const colors = require('tailwindcss/colors')

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
        // secondary: {
        //   50: '#fef6f5',
        //   100: '#fdeeeb',
        //   200: '#f9d4cc',
        //   300: '#f6bbae',
        //   400: '#ef8771',
        //   500: '#E85434',
        //   600: '#d14c2f',
        //   700: '#ae3f27',
        //   800: '#8b321f',
        //   900: '#722919',
        // },

        // primary: {
        //   50: '#f5fbf7',
        //   100: '#eaf8f0',
        //   200: '#cbedd8',
        //   300: '#abe1c1',
        //   400: '#6ccb93',
        //   500: '#2DB564',
        //   600: '#29a35a',
        //   700: '#22884b',
        //   800: '#1b6d3c',
        //   900: '#165931',
        // },
        // secondary: {
        //   50: '#f5f9fd',
        //   100: '#eaf3fc',
        //   200: '#cbe1f7',
        //   300: '#abcff2',
        //   400: '#6daae8',
        //   500: '#2E86DE',
        //   600: '#2979c8',
        //   700: '#2365a7',
        //   800: '#1c5085',
        //   900: '#17426d',
        // },

        primary: {
          50: '#fbfbf7',
          100: '#f7f8ef',
          200: '#ececd7',
          300: '#e0e1be',
          400: '#c9cb8e',
          500: '#b2b45d',
          600: '#a0a254',
          700: '#868746',
          800: '#6b6c38',
          900: '#57582e',
        },

        secondary: {
          50: '#f5f5f5',
          100: '#ebebeb',
          200: '#cccccc',
          300: '#adadad',
          400: '#707070',
          500: '#323232',
          600: '#2d2d2d',
          700: '#262626',
          800: '#1e1e1e',
          900: '#191919',
        },

        tertiary: {
          50: '#fffbf5',
          100: '#fff6eb',
          200: '#fee9cd',
          300: '#fddbaf',
          400: '#fcc174',
          500: '#FAA638',
          600: '#e19532',
          700: '#bc7d2a',
          800: '#966422',
          900: '#7b511b',
        },

        // tertiary: colors.amber,
        orange: colors.amber,

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
        laravel: '#FF2D20',
        promiserves: '#95ba3d',
        php: '#777BB4',
        ema: '#202d56',
        bootstrap: '#7952B3',
        buefy: '##7957D5',
        bulma: '#00D1B2',
        codeigniter: '#EE4323',
        vue: '#4FC08D',
        nuxt: {
          gray: '#243746',
          lightgreen: '#41B38A',
          green: '#158876',
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
      // typography: {
      //   DEFAULT: {
      //     css: {
      //       color: '#333',
      //       a: {
      //         color: '#3182ce',
      //         '&:hover': {
      //           color: '#2c5282',
      //         },
      //       },
      //     },
      //   },
      // },
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
    // typography: theme => ({
    //   default: {
    //     css: {
    //       color: theme('colors.gray.900'),

    //       a: {
    //         color: theme('colors.blue.500'),
    //         '&:hover': {
    //           color: theme('colors.blue.700'),
    //         },
    //       },
    //     },
    //   },

    //   dark: {
    //     css: {
    //       color: theme('colors.gray.100'),

    //       a: {
    //         color: theme('colors.blue.100'),
    //         '&:hover': {
    //           color: theme('colors.blue.100'),
    //         },
    //       },
    //     },
    //   },
    // }),
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
