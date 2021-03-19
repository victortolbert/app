export const state = () => ({
  bodyClass: '',
  list: [
    {
      id: 1,
      short_name: 'lab',
      features: [
        'Tailwind CSS',
        'Tailwind UI',
        'Vue.js',
        'Nuxt.js',
        'CodeIgniter',
        'Alpine.js',
      ],
    },
    {
      id: 2,
      short_name: 'vm',
      features: ['Laravel'],
    },
    {
      id: 3,
      short_name: 'sps',
      features: ['Kirby'],
    },
  ],
})

export const mutations = {
  SET_BODY_CLASS(state, bodyClass) {
    state.bodyClass = bodyClass
  },
}
