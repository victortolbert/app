export const state = () => ({
  bodyClass: '',
})

export const mutations = {
  SET_CLASS(state, bodyClass) {
    state.bodyClass = bodyClass
  },
}
