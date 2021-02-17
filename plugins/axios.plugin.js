import camelcaseKeys from 'camelcase-keys'
import snakecaseKeys from 'snakecase-keys'

export default function ({$axios, redirect}, inject) {
  // Create a custom axios instance
  const api = $axios.create({
    baseURL: '//' + window.location.hostname + '/',
    headers: {
      'X-Requested-With': 'XMLHttpRequest',
    },
  })

  api.defaults.transformResponse = [
    (data, headers) => {
      if (data && headers['content-type'].includes('application/json')) {
        return camelcaseKeys(JSON.parse(data), {deep: true})
      }
    },
  ]

  api.defaults.transformRequest = [
    (data, headers) => {
      if (data && headers['content-type'].includes('application/json')) {
        return JSON.stringify(snakecaseKeys(data, {deep: true}))
      }
    },
  ]

  api.interceptors.request.use(function (request) {
    if (request.loading && typeof request.loading === 'function') {
      request.loading()
    } else {
      document.querySelector('#default-loading').classList.remove('hidden')
    }

    return request
  })

  api.interceptors.response.use(
    function (response) {
      hideDefaultLoading()

      return response
    },
    function (error) {
      if (error.config.error && typeof error.config.error === 'function') {
        hideDefaultLoading()
        error.config.error(error)
      } else {
        hideDefaultLoading()
        // Toast.open('An error has occurred. Please try again.')
      }

      return Promise.reject(error)
    },
  )

  // api.interceptors.response.use(response => {
  //   if (response.status === 200) {
  //     if (
  //       response.request.responseURL &&
  //       response.request.responseURL.includes('login')
  //     ) {
  //       store.dispatch('setUser', response)
  //     }
  //   }
  //   return response
  // })

  api.onRequest(config => {
    console.log('Making request to ' + config.url)
  })

  api.onError(error => {
    const code = parseInt(error.response && error.response.status)

    if (code === 400) {
      redirect('/400')
    }

    if (error.response && error.response.status === 500) {
      redirect('/login')
    }
  })

  // Set baseURL to something different
  api.setBaseURL('https://my_api.com')

  // Inject to context as $api
  inject('api', api)

  return {
    get: (resource, loading, error) => {
      return api.get(`${resource}`, {
        loading,
        error,
      })
    },
    find: (resource, id, loading, error) => {
      return api.get(`${resource}/${id}`, {
        loading,
        error,
      })
    },
    create: (resource, item, loading, error) => {
      return api.post(`${resource}`, item, {
        loading,
        error,
      })
    },
    update: (resource, id, item, loading, error) => {
      return api.put(`${resource}/${id}`, item, {
        loading,
        error,
      })
    },
    delete: (resource, id, loading, error) => {
      return api.delete(`${resource}/${id}`, {
        loading,
        error,
      })
    },
  }
}

function hideDefaultLoading() {
  document.querySelector('#default-loading').classList.add('hidden')
}
