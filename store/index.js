export const state = () => ({
  theme: 'ema',
  affiliate: {
    id: 1,
    pages: ['resume'],
    name: 'ga-sps',
    subdomain: '',
    theme: {
      nav: {
        class: 'bg-white text-gray-800',
      },
      logo_path: '',
      colors: {
        primary: 'paprika',
        secondary: '',
        tertiary: '',
        danger: '',
        warning: '',
        success: '',
        info: '',
      },
    },
  },
})

export const mutations = {
  SET_THEME(state, theme) {
    state.theme = theme
  },
}
