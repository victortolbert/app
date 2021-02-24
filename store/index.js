import Vue from 'vue'
import groupBy from 'lodash.groupby'
import axios from 'axios'
import {addDays} from 'date-fns'

// import camelcaseKeys from 'camelcase-keys'
import snakecaseKeys from 'snakecase-keys'

const getEventIndexById = (state, eventId) =>
  state.events.findIndex(event => event.id.toString() === eventId.toString())

export const state = () => ({
  activeEventName: 'Active Event Name',
  activeTab: 0,
  avatarPath: '',
  braintreeMerchantId: null,
  categories: {},
  contacts: [],
  contentGroup: '',
  count: 0,
  counter: 0,
  countries: [],
  currentArticle: null,
  defaultUserImage: '',
  doubleTheDonationKey: null,
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
  featuredVideo: {
    id: 4,
    description: 'Omnis sit cumque laudantium qui quod ducimus.',
    hash: '9yzeWoelJ3M',
    url: null,
    original_url: 'http://www.youtube.com/watch?v=9yzeWoelJ3M',
    source: 'youtube',
    timestamp: '2015-12-30 14:30:08',
  },
  forcePageRouteRefresh: false,
  indexedUser: 0,
  isBetaUser: false,
  isLoading: false,
  isMenuOpen: false,
  merchantLegalName: null,
  merchantTaxId: null,
  newUserPhoto: '',
  newUserPhotoFile: '',
  open: false,
  page: 'index',
  paymentUrl: '/payment',
  photoDirty: false,
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
  pledge: null,
  preSelectAmountOptions: {
    perlap_a: ['1', '2', '3', '5', '10'],
    perlap_b: ['1', '2', '3', '5', '10'],
    flat_a: ['30', '60', '90', '150', '300'],
    flat_b: ['30', '60', '90', '150', '300'],
  },
  program: {
    id: 1,
    archived: 0,
    decoded_event_name: 'Decoded Event Name',
    deleted: 0,
    event_name: 'Fun Run',
    fun_run: '2021-02-05',
    microsite: {
      clean_overview_text_override: 'Overview Text Override',
      microsite_color_theme: {
        theme_name: 'default',
      },
      overview_text_override: 'Overview Text Override',
      school_image_name: 'school-logo.png',
    },
    name: 'Springdale Elementary',
    participants: [
      {
        id: 1,
        first_name: 'Victor',
        last_name: 'Tolbert',
        participant_info: {
          family_pledging_enabled: 1,
          pledges: [
            {
              pledge_status_id: 1,
              amount: 30,
            },
          ],
        },
        profile: {
          image_name: 'victor.jpeg',
          pledge_goal: 100,
        },
      },
      {
        id: 2,
        first_name: 'Jeremy',
        last_name: 'Doublestein',
        participant_info: {
          family_pledging_enabled: 1,
          pledges: [
            {
              pledge_status_id: 1,
              amount: 30,
            },
          ],
        },
        profile: {
          image_name: 'jeremy.jpeg',
          pledge_goal: 100,
        },
      },
    ],
    program_pledge_setting: {
      flat_donate_only: 0,
    },
    show_corporate_matching_widget: false,
    sponsor_convenience_fee: '2.00',
    unit_flat_conversion: 0,
    unit: {
      modifier: 'per',
      name: 'Challenge',
      name_plural: 'Challenges',
    },
  },
  programs: [
    {
      name: 'Program Name',
      event_name: 'Event Name',
      archived: 0,
      deleted: 0,
    },
  ],
  projects: ['app', 'cms', 'lab', 'psv1', 'tdx'],
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
  receiptUrl: '/thanks',
  relationships: [
    {
      id: 1,
      sponsor_type: 'Parent',
      description: null,
    },
    {
      id: 2,
      sponsor_type: 'Grandparent',
      description: null,
    },
    {
      id: 3,
      sponsor_type: 'Relative',
      description: null,
    },
    {
      id: 5,
      sponsor_type: 'Family Friend',
      description: null,
    },
    {
      id: 6,
      sponsor_type: 'Co-Worker',
      description: null,
    },
    {
      id: 7,
      sponsor_type: 'Business',
      description: null,
    },
    {
      id: 8,
      sponsor_type: 'Corporate Matching Gift',
      description: '',
    },
    {
      id: 99,
      sponsor_type: 'Other',
      description:
        'All other types not listed.  The name will be listed.  The text will be stored under the specific pledge under the pledges table',
    },
  ],
  releases: [],
  s3Bucket: null,
  shareButtonsOnScreen: true,
  shipping: {},
  states: [],
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
  user: {
    firstName: 'Victor',
    lastName: 'Tolbert',
    email: 'victor.tolbert@gmail.com',
    dob: '1966-07-07',
    phone: '678-613-3400',
  },
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
  userType: '',
  weekendsVisible: false,
  visits: [],
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
  getUserType(state) {
    const requireFullInfo = ['parent', 'teacher']
    let isValidUser = true
    if (requireFullInfo.includes(state.userType)) {
      if (!validateUserHasFullInfo(state.user)) {
        isValidUser = false
      }
    }
    if (isValidUser) {
      return state.userType
    }
    return 'incompleteProfile'
  },
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
  TOGGLE_MENU(state) {
    state.isMenuOpen = !state.isMenuOpen
  },
  OPEN_MENU(state) {
    state.isMenuOpen = true
  },
  CLOSE_MENU(state) {
    state.isMenuOpen = false
  },
  TOGGLE(state, open) {
    state.open = open !== undefined ? open : !state.open
  },
  CLOSE(state) {
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
  SET_USER(state, user) {
    if (user.dob) {
      const [year, month, day] = user.dob.split('-')

      user.year = year
      user.month = month
      user.day = day
    }
    state.user = user
  },
  SET_USER_TYPE(state, type) {
    state.userType = type
  },
  SET_DEFAULT_USER_IMAGE(state, url) {
    state.defaultUserImage = url
  },
  SET_USER_PHOTO(state, url) {
    const user = state.user
    user.participants[user.participants.length - 1].photoUrl = url
    this.commit('SET_USER', user)
  },
  SET_USER_PHOTO_FILE(state, file) {
    const user = state.user
    user.participants[user.participants.length - 1].photoFile = file
    this.commit('SET_USER', user)
  },
  RESET_USER(state) {
    state.user = {
      firstName: '',
      lastName: '',
      participants: [],
      phone: '',
    }
  },
  SET_PROGRAM(state, program) {
    state.program = program
  },
  SET_S3_BUCKET(state, bucket) {
    state.s3Bucket = bucket
  },
  SET_RELATIONSHIPS(state, relationships) {
    state.relationships = relationships
  },
  SET_PRE_SELECT_AMOUNT_OPTIONS(state, preSelectAmountOptions) {
    state.preSelectAmountOptions = preSelectAmountOptions
  },
  SET_BRAINTREE_MERCHANT_ID(state, braintreeMerchantId) {
    state.braintreeMerchantId = braintreeMerchantId
  },
  SET_PAYMENT_URL(state, paymentUrl) {
    state.paymentUrl = paymentUrl
  },
  SET_RECEIPT_URL(state, receiptUrl) {
    state.receiptUrl = receiptUrl
  },
  SET_PLEDGE(state, pledge) {
    state.pledge = pledge
  },
  SET_FEATURED_VIDEO(state, featuredVideo) {
    state.featuredVideo = featuredVideo
  },
  SET_DOUBLE_THE_DONATION_KEY(state, key) {
    state.doubleTheDonationKey = key
  },
  SET_MERCHANT_LEGAL_NAME(state, key) {
    state.merchantLegalName = key
  },
  SET_MERCHANT_TAX_ID(state, key) {
    state.merchantTaxId = key
  },
  SET_CURRENT_ARTICLE(state, article) {
    state.currentArticle = article
  },
}

function validateUserHasFullInfo(user) {
  const validFirstName = user.firstName !== null
  const validLastName = user.lastName !== null
  const validEmail = user.email !== null
  const validDob = user.dob !== null
  const validPhone = user.phone !== null
  if (validFirstName && validLastName && validEmail && validDob && validPhone) {
    return true
  }
  return false
}
