import Vue from 'vue'
import groupBy from 'lodash.groupby'

export const state = () => ({
  visits: [],
  open: false,
  isMenuOpen: false,
  projects: ['app', 'cms', 'lab', 'psv1', 'tdx'],
  categories: {},
  releases: [],
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
}

export const actions = {
  async fetchCategories({commit, state}) {
    // Avoid re-fetching in production
    if (process.dev === false && state.categories[this.$i18n.locale]) {
      return
    }
    const docs = await this.$content(this.$i18n.locale)
      .only(['category', 'title', 'slug'])
      .sortBy('position', 'asc')
      .fetch()
    docs.push({slug: 'releases', title: 'Releases', category: 'Community'})
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
}
