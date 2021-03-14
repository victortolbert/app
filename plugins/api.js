import createRepository from '~/api/repository'

export default ({$axios, store}, inject) => {
  const instance = $axios.create({
    headers: {
      common: {
        Accept: 'text/plain, */*',
      },
    },
  })

  instance.setBaseURL('https://api.victortolbert.com')

  instance.interceptors.request.use(function (request) {
    if (request.loading && typeof request.loading === 'function') {
      request.loading()
    } else {
      // document.querySelector('#overlays').classList.remove('hidden')
      //   console.log('loading...')
      //   store.state.isLoading = true
    }

    return request
  })

  instance.interceptors.response.use(function (response) {
    // console.log('hide loading...')
    // store.state.isLoading = false

    return response
  })

  const repositoryWithAxios = createRepository(instance)

  const api = {
    messages: repositoryWithAxios('messages'),
    events: repositoryWithAxios('events'),
    users: repositoryWithAxios('people'),
    // ...
  }

  inject('api', api)
}
