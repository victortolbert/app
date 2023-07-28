import { addDays } from 'date-fns'
import { createStore } from 'vuex'

export default createStore({
  modules: {
  },
  state() {
    return {
      categories: [
        'sustainability',
        'nature',
        'animal welfare',
        'housing',
        'education',
        'food',
        'community',
      ],
      events: [
        {
          id: 10,
          title: 'Gratitude, Wisdom, Care, Courage, Grit, Celebration',
          date: new Date(),
          allDay: true,
        },
        {
          id: 20,
          title: 'Backlog Grooming/Story Time',
          start: addDays(new Date(), 1),
        },
        { id: 30, title: 'Sprint Planning', start: addDays(new Date(), 2) },
        { id: 40, title: 'Release day', date: '2021-01-30' },
        { id: 50, title: 'The Future of Frontend', date: '2021-02-05' },
      ],
      weekendsVisible: false,
    }
  },

  getters: {
    weekendsVisible: state => state.weekendsVisible,
  },

  mutations: {
    SET_WEEKENDS_ENABLED(state, enabled) {
      state.weekendsVisible = enabled
    },
  },

  actions: {
    setweekendsVisible({ commit }, enabled) {
      commit('SET_WEEKENDS_ENABLED', enabled)
    },
  },
})
