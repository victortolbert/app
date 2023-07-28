import defaultTheme from 'tailwindcss/defaultTheme'
import headlessUi from '@headlessui/tailwindcss'
import heroPatterns from 'tailwind-heropatterns'
import aspectRatio from '@tailwindcss/aspect-ratio'

import type { Config } from 'tailwindcss'

export default <Partial<Config>>{
  theme: {
    extend: {
      colors: {
        brand: {
          DEFAULT: '#002894',
          50: '#edf5fa',
          100: '#dcebf5',
          200: '#accbe6',
          300: '#7fa8d4',
          400: '#3667b5',
          500: '#002894',
          600: '#002185',
          700: '#001a6e',
          800: '#001359',
          900: '#000d42',
          950: '#00072b',
        },
        secondary: {
          DEFAULT: '#ee7d1e',
          50: '#fef9f4',
          100: '#fdf2e9',
          200: '#fbdfc7',
          300: '#f8cba5',
          400: '#f3a462',
          500: '#ee7d1e',
          600: '#d6711b',
          700: '#b35e17',
          800: '#8f4b12',
          900: '#753d0f',
        },
        vueGreen: 'rgb(66,185,131)',
        vueGreenHover: 'rgb(50,161,111)',
        vueBlue: 'rgb(98,136,241)',
      },

      boxShadow: {
        field: 'rgba(10, 10, 10, 0.1) 0px 1px 2px 0px inset',
        px: '0 0 0 1px rgba(0, 0, 0, 0.5)',
      },
      fontFamily: {
        sans: ['Inter var', 'Inter', ...defaultTheme.fontFamily.sans],
        serif: [...defaultTheme.fontFamily.serif],
        display: ['Bungee', 'Pica'],
        mono: ['Space Mono', 'Fira Code', ...defaultTheme.fontFamily.mono],
        mockup: ['Balsamiq Sans', 'cursive'],
        proto: [
          'Flow Circular',
          'Redacted Script',
          'Flow Block',
          'Blokk Neue',
          'Blokk',
          'Flow Rounded',
          'cursive',
        ],
      },
      fontSize: {
        '2xs': ['0.625rem', '0.875rem'],
      },
      gridTemplateColumns: {
        24: 'repeat(24, minmax(1rem, 1fr))',
      },
      gridColumn: {
        'span-13': 'span 13 / span 13',
        'span-14': 'span 14 / span 14',
        'span-15': 'span 15 / span 15',
        'span-16': 'span 16 / span 16',
        'span-17': 'span 17 / span 17',
        'span-18': 'span 18 / span 18',
        'span-19': 'span 19 / span 19',
        'span-20': 'span 20 / span 20',
        'span-21': 'span 21 / span 21',
        'span-22': 'span 22 / span 22',
        'span-23': 'span 23 / span 23',
        'span-24': 'span 24 / span 24',
      },
      maxWidth: {
        '8xl': '90rem',
      },
      animation: {
        'wiggle': 'wiggle 1s infinite',
        'flash-code': 'flash-code 1s forwards',
        'flash-code-slow': 'flash-code 2s forwards',
      },
      keyframes: {
        'flash-code': {
          '0%': { backgroundColor: 'rgb(125 211 252 / 0.1)' },
          '100%': { backgroundColor: 'transparent' },
        },
        'wiggle': {
          '0%, 100%': {
            transform: 'scale(1.2) rotate(7deg)',
          },
          '50%': {
            transform: 'scale(0.8) rotate(-7deg)',
          },
        },
      },
      transitionTimingFunction: {
        'in-expo': 'cubic-bezier(0.95, 0.05, 0.795, 0.035)',
        'out-expo': 'cubic-bezier(0.19, 1, 0.22, 1)',
        'in-quad': 'cubic-bezier(.55, .085, .68, .53)',
        'out-quad': 'cubic-bezier(.25, .46, .45, .94)',
      },
      aspectRatio: {
        auto: 'auto',
        square: '1 / 1',
        video: '16 / 9',
        1: '1',
        2: '2',
        3: '3',
        4: '4',
        5: '5',
        6: '6',
        7: '7',
        8: '8',
        9: '9',
        10: '10',
        11: '11',
        12: '12',
        13: '13',
        14: '14',
        15: '15',
        16: '16',
      },
    },
  },
  plugins: [
    aspectRatio,
    headlessUi,
    heroPatterns({
      patterns: [],
      // The foreground colors of the pattern
      colors: {
        'default': '#9C92AC',
        'blue-dark': '#000044', // also works with rgb(0,0,205)
      },

      // The foreground opacity
      opacity: {
        default: '0.4',
        100: '1.0',
      },
    }),
  ],
}
