export const state = () => ({
  isMenuOpen: false,
  open: false,
})

export const mutations = {
  toggleMenu(state) {
    state.isMenuOpen = !state.isMenuOpen
  },
  openMenu(state) {
    state.isMenuOpen = true
  },
  closeMenu(state) {
    state.isMenuOpen = false
  },

  toggle(state, open) {
    state.open = open !== undefined ? open : !state.open
  },

  close(state) {
    state.open = false
  },
}
