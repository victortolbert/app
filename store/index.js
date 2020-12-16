export const state = () => ({
  isMenuOpen: false,
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
}
