import Vue from 'vue'
import groupBy from 'lodash.groupby'
import axios from 'axios'
import {addDays} from 'date-fns'

// import camelcaseKeys from 'camelcase-keys'
import snakecaseKeys from 'snakecase-keys'

const getEventIndexById = (state, eventId) =>
  state.events.findIndex(event => event.id.toString() === eventId.toString())

export const state = () => ({
  count: 0,
  counter: 0,
  visits: [],
  open: false,
  isMenuOpen: false,
  activeTab: 0,
  activeEventName: 'Active Event Name',
  projects: ['app', 'cms', 'lab', 'psv1', 'tdx'],
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
    {id: 30, title: 'Sprint Planning', start: addDays(new Date(), 2)},
    {id: 40, title: 'Release day', date: '2021-01-30'},
    {id: 50, title: 'The Future of Frontend', date: '2021-02-05'},
  ],
  quotes: [
    {
      id: 1,
      text: 'A goal should scare you a little and excite you a lot.',
      attribution: 'Joe Vitale',
    },
    {
      id: 2,
      text:
        'There is a destiny that makes us brothers; none goes his way alone. What we put into the lives of others, comes back into our own.',
      attribution: 'Edwin Markham',
    },
    {
      id: 3,
      text: 'Simplicity is the ultimate sophistication',
      attribution: 'Leonardo da Vinci',
      created_at: '',
      source: {
        title:
          'Presentation Zen: Simple Ideas on Presentation Design and Delivery',
        author: 'Gar Reynolds',
      },
    },
    {
      id: 4,
      text: 'Invention requires a long term willingness to be misunderstood',
      attribution: 'Jeff Bezos',
      created_at: '',
      source: {
        title: '',
        author: '',
        url: '',
      },
    },
  ],
  todos: [
    {
      id: 1,
      name: 'Buy Milk',
      isComplete: false,
    },
    {
      id: 2,
      name: 'Buy Eggs',
      isComplete: false,
    },
    {
      id: 3,
      name: 'Buy Bread',
      isComplete: false,
    },
    {
      id: 4,
      name: 'Make French Toast',
      isComplete: false,
    },
  ],
  topics: [
    'Evaluation',
    'Health and Wellness',
    'Literature Review',
    'Literature',
    'Needs Assessment',
    'Report',
    'Strategic Prevention Framework',
    'Strategy',
    'Substance Abuse',
    'Suicide',
    'Technical Assistance',
    'Webinar',
  ],
  categories: {},
  releases: [],
  page: 'index',
  indexedUser: 0,
  weekendsVisible: false,
  users: [
    {
      name: 'Sophia Gonzalez',
      img: '/profile2.jpg',
      location: 'San Francisco',
      bio:
        'Had a brief careerwith jack-in-the-boxes in Phoenix, AZ. Spent several months managing squirt guns and implementing toy elephants.',
      following: 789,
      followers: 2748,
      photos: 94,
      days: 32,
      trips: ['Honolulu', 'Burmuda', 'Los Cabos', 'San Antonio'],
    },
    {
      name: 'Ben Allen',
      img: '/profile3.jpg',
      location: 'Boston',
      bio:
        'Bacon nerd. Freelance twitter practitioner. Social media nerd. Pop culture junkie. Proud alcohol advocate. Food geek.',
      following: 140,
      followers: 789,
      photos: 32,
      days: 5,
      trips: ['Honolulu', 'Peru', 'San Francisco'],
    },
    {
      name: 'Jill Fernandez',
      img: '/profile4.jpg',
      location: 'Seattle',
      bio:
        'Prone to fits of apathy. Writer. Devoted gamer. Web scholar. Hipster-friendly music advocate. Problem solver. Student. Twitter fanatic.',
      following: 590,
      followers: 1705,
      photos: 45,
      days: 12,
      trips: ['Honolulu', 'Tokyo', 'Osaka'],
    },
    {
      name: 'Cynthia Obel',
      img: '/profile5.jpg',
      location: 'Kentucky',
      bio:
        'Producing at the fulcrum of modernism and purpose to craft an compelling and authentic narrative. My opinions belong to myself.',
      following: 590,
      followers: 1705,
      photos: 45,
      days: 12,
      trips: ['Honolulu', 'Tokyo', 'Osaka'],
    },
  ],
  places: [
    {
      name: 'Honolulu',
      stars: 4,
      rating: 8.9,
      img: '/honolulu.jpg',
      description:
        'Ocean breezes rustle palm trees along the harborfront, while in the cool, mist-shrouded Koʻolau Range, forested hiking trails offer postcard city views. At sunset, cool off with an amble around Magic Island or splash in the ocean at Ala Moana Beach.',
    },
    {
      name: 'Santorini',
      stars: 4,
      rating: 7.8,
      img: '/santorini.jpg',
      description:
        'With multicoloured cliffs soaring above a sea-drowned caldera, Santorini looks like a giant slab of layered cake. The main island of Thira will take your breath away with its snow-drift of white Cycladic houses lining the cliff tops and, in places, spilling like icy cornices down the terraced rock.',
    },
    {
      name: 'Cusco',
      stars: 3,
      rating: 7.4,
      img: '/peru.jpg',
      description:
        'Wandered the cobblestone streets and quaint lanes of the town, which has been designated a UNESCO World Heritage site. A walking tour revealed historic architecture, colonial landmarks and alluring shops and restaurants.',
    },
  ],
  programs: [
    {
      name: 'Program Name',
      event_name: 'Event Name',
      archived: 0,
      deleted: 0,
    },
  ],
})

export const getters = {
  selectedUser: state => {
    return state.users[state.indexedUser]
  },
  activePrograms: state => {
    return state.programs.filter(program => {
      return program.archived === 0 && program.deleted === 0
    })
  },
  avatarPath: state => `/assets/img/people/`,
  events: state => state.events,
  weekendsVisible: state => state.weekendsVisible,
}

export const actions = {
  sendWindowHeight() {
    window.parent.postMessage({windowHeight: document.body.scrollHeight}, '*')
  },
  async fetchCategories({commit, state}) {
    // Avoid re-fetching in production
    if (process.dev === false && state.categories[this.$i18n.locale]) {
      return
    }
    const docs = await this.$content(this.$i18n.locale)
      .only(['category', 'title', 'slug'])
      .sortBy('position', 'asc')
      .fetch()

    // docs.push({
    //   slug: 'releases',
    //   title: 'Releases',
    //   category: 'Community',
    // })

    const categories = groupBy(docs, 'category')

    commit('SET_CATEGORIES', categories)
  },

  async fetchReleases({commit}) {
    const options = {}
    if (process.env.GITHUB_TOKEN) {
      options.headers = {Authorization: `token ${process.env.GITHUB_TOKEN}`}
    }
    let releases
    try {
      const data = await fetch(
        'https://api.github.com/repos/nuxt/content/releases',
        options,
      ).then(res => res.json())
      releases = data
        .filter(r => !r.draft)
        .map(release => {
          return {
            name: release.name || release.tag_name,
            date: release.published_at,
            body: this.$markdown(release.body),
          }
        })
    } catch (e) {}

    const getMajorVersion = r => r.name && Number(r.name.substring(1, 2))
    releases.sort((a, b) => {
      const aMajorVersion = getMajorVersion(a)
      const bMajorVersion = getMajorVersion(b)
      if (aMajorVersion !== bMajorVersion) {
        return bMajorVersion - aMajorVersion
      }
      return new Date(b.date) - new Date(a.date)
    })

    commit('SET_RELEASES', releases)
  },

  updateActionValue({commit}, payload) {
    commit('UPDATE_VALUE', payload)
  },

  increment({commit, state}) {
    commit('SET_COUNT', state.count + 1)
  },

  decrement({commit, state}) {
    commit('SET_COUNT', state.count - 1)
  },

  updateUsers(_, users) {
    return axios.post(
      'https://demo3878003.mockable.io',
      {users},
      {
        transformRequest: [
          data => {
            return JSON.stringify(snakecaseKeys(data, {deep: true}))
          },
        ],
      },
    )
  },

  getUsers({commit}) {
    return axios.get('https://demo3878003.mockable.io').then(res => {
      commit('SET_USERS', res.data.users)
    })
  },
  createEvent({commit}, event) {
    commit('CREATE_EVENT', event)
  },

  updateEvent({commit}, updatedEvent) {
    commit('UPDATE_EVENT', updatedEvent)
  },

  deleteEvent({commit}, eventId) {
    commit('DELETE_EVENT', eventId)
  },

  setweekendsVisible({commit}, enabled) {
    commit('SET_WEEKENDS_ENABLED', enabled)
  },
}

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

  INCREMENT(state) {
    state.counter++
  },

  SET_CATEGORIES(state, categories) {
    // Vue Reactivity rules since we add a nested object
    Vue.set(state.categories, this.$i18n.locale, categories)
  },

  SET_RELEASES(state, releases) {
    state.releases = releases
  },

  ADD_VISIT(state, path) {
    state.visits.push({
      path,
      date: new Date().toJSON(),
    })
  },

  UPDATE_PAGE(state, pageName) {
    state.page = pageName
  },

  ADD_FOLLOWER(state) {
    state.users[state.indexedUser].followers++
  },

  REMOVE_FOLLOWER(state) {
    state.users[state.indexedUser].followers--
  },

  CHANGE_USER(state, i) {
    state.indexedUser = i
  },

  SET_COUNT(state, count) {
    state.count = count
  },

  SET_USERS(state, payload) {
    state.users = payload
  },

  CREATE_EVENT(state, event) {
    return state.events.push(event)
  },

  UPDATE_EVENT(state, updatedEvent) {
    const index = getEventIndexById(state, updatedEvent.id)

    if (index === -1) {
      // eslint-disable-next-line
      return console.warn(`Unable to update event (id ${updatedEvent.id})`)
    }

    return state.events.splice(index, 1, {
      ...state.events[index],
      title: updatedEvent.title,
      start: updatedEvent.start,
      end: updatedEvent.end,
      date: updatedEvent.date,
    })
  },

  DELETE_EVENT(state, eventId) {
    const index = getEventIndexById(state, eventId)

    if (index === -1) {
      // eslint-disable-next-line
      return console.warn(`Unable to delete event (id ${eventId})`)
    }

    return state.events.splice(index, 1)
  },

  SET_WEEKENDS_ENABLED(state, enabled) {
    state.weekendsVisible = enabled
  },
}
