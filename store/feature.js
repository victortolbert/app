export const namespaced = true

export const state = () => ({
  flags: {},
})

export const getters = {
  isEnabled: ({flags}) => flag => {
    return !!flags[flag]
  },
}
export const mutations = {
  SET_FLAGS: (state, flags) => {
    state.flags = flags
  },
}

export default {
  namespaced,
  state,
  getters,
  mutations,
}
