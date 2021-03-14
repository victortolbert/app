import MessageService from '~/services/MessageService'

export const namespaced = true

export const state = () => ({
  messages: [],
  messagesTotal: 0,
  message: {},
  perPage: 20,
})

export const getters = {
  getMessageById: state => id => {
    return state.messages.find(message => message.id === id)
  },
  getMessagesByTag: state => tag => {
    return state.messages.filter(message => message.tags.includes(tag))
  },
  tags: state =>
    state.messages
      .map(message => message.tags)
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
  createMessage({commit, dispatch}, message) {
    return MessageService.postMessage(message)
      .then(() => {
        commit('ADD_MESSAGE', message)
        commit('SET_MESSAGE', message)
        const notification = {
          type: 'success',
          message: 'Your message has been created!',
        }
        dispatch('notification/add', notification, {root: true})
      })
      .catch(error => {
        const notification = {
          type: 'error',
          message:
            'There was a problem creating your message: ' + error.message,
        }
        dispatch('notification/add', notification, {root: true})
        throw error
      })
  },
  fetchMessages({commit, dispatch, state}, {page}) {
    return MessageService.getMessages(state.perPage, page)
      .then(response => {
        commit(
          'SET_MESSAGES_TOTAL',
          parseInt(response.headers['x-total-count']),
        )
        commit('SET_MESSAGES', response.data)
      })
      .catch(error => {
        const notification = {
          type: 'error',
          message: 'There was a problem fetching messages: ' + error.message,
        }
        dispatch('notification/add', notification, {root: true})
      })
  },
  fetchMessage({commit, getters, state}, id) {
    if (state.message.id === id) {
      return state.message
    }

    const message = getters.getMessageById(id)

    if (message) {
      commit('SET_MESSAGE', message)
      return message
    } else {
      return MessageService.getMessage(id).then(response => {
        commit('SET_MESSAGE', response.data)
        return response.data
      })
    }
  },
}

export const mutations = {
  ADD_MESSAGE(state, message) {
    state.messages.push(message)
  },
  SET_MESSAGES(state, messages) {
    state.messages = messages
  },
  SET_MESSAGES_TOTAL(state, messagesTotal) {
    state.messagesTotal = messagesTotal
  },
  SET_MESSAGE(state, message) {
    state.message = message
  },
}
