import ResourceService from '~/services/ResourceService'

export const namespaced = true

export const state = () => ({
  resources: [],
  resourcesTotal: 0,
  resource: {},
  perPage: 20,
})

export const getters = {
  getResourceById: state => id => {
    return state.resources.find(resource => resource.id === id)
  },
  getResourcesByTag: state => tag => {
    return state.resources.filter(resource => resource.tags.includes(tag))
  },
  tags: state =>
    state.resources
      .map(resource => resource.tags)
      .reduce((acc, val) => acc.concat(val), [])
      .reduce((obj, tag) => {
        if (!obj[tag]) {
          obj[tag] = 0
        }
        obj[tag]++
        return obj
      }, {}),
}

export const actions = {
  createResource({commit, dispatch}, resource) {
    return ResourceService.postResource(resource)
      .then(() => {
        commit('ADD_RESOURCE', resource)
        commit('SET_RESOURCE', resource)
        const notification = {
          type: 'success',
          resource: 'Your resource has been created!',
        }
        dispatch('notification/add', notification, {root: true})
      })
      .catch(error => {
        const notification = {
          type: 'error',
          resource:
            'There was a problem creating your resource: ' + error.resource,
        }
        dispatch('notification/add', notification, {root: true})
        throw error
      })
  },
  fetchResources({commit, dispatch, state}, {page}) {
    return ResourceService.getResources(state.perPage, page)
      .then(response => {
        commit(
          'SET_RESOURCES_TOTAL',
          parseInt(response.headers['x-total-count']),
        )
        commit('SET_RESOURCES', response.data)
      })
      .catch(error => {
        const notification = {
          type: 'error',
          resource: 'There was a problem fetching resources: ' + error.resource,
        }
        dispatch('notification/add', notification, {root: true})
      })
  },
  fetchResource({commit, getters, state}, id) {
    if (state.resource.id === id) {
      return state.resource
    }

    const resource = getters.getResourceById(id)

    if (resource) {
      commit('SET_RESOURCE', resource)
      return resource
    } else {
      return ResourceService.getResource(id).then(response => {
        commit('SET_RESOURCE', response.data)
        return response.data
      })
    }
  },
}

export const mutations = {
  ADD_RESOURCE(state, resource) {
    state.resources.push(resource)
  },
  SET_RESOURCES(state, resources) {
    state.resources = resources
  },
  SET_RESOURCES_TOTAL(state, resourcesTotal) {
    state.resourcesTotal = resourcesTotal
  },
  SET_RESOURCE(state, resource) {
    state.resource = resource
  },
}
