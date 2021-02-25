// export default function ({$axios}, inject) {
//   const api = $axios.create({
//     headers: {
//       common: {
//         Accept: 'text/plain, */*',
//       },
//     },
//   })

//   // api.onError(error => {
//   //   if (error.response.status === 500) {
//   //     redirect('/sorry')
//   //   }
//   // })

//   api.getEvents(() => {
//     return api.get('events')
//   })

//   // Set baseURL to something different
//   api.setBaseURL('/api')

//   inject('api', api)
// }

// export default ({$axios}, inject) => {
//   const api = $axios.create({
//     headers: {
//       common: {
//         Accept: 'text/plain, */*',
//       },
//     },
//   })

//   api.setBaseURL('/api')

//   api.index = resource => {
//     return $axios.$get(`${resource}`)
//   }

//   api.show = (resource, id) => {
//     return $axios.$get(`${resource}/${id}`)
//   }

//   api.create = (resource, payload) => {
//     return $axios.$post(`${resource}`, payload)
//   }

//   api.update = (resource, id, payload) => {
//     return $axios.$post(`${resource}/${id}`, payload)
//   }

//   api.delete = (resource, id) => {
//     return $axios.$delete(`${resource}/${id}`)
//   }

//   inject('api', api)
// }

import createRepository from '@/api/repository'

export default ({$axios, store}, inject) => {
  const instance = $axios.create({
    headers: {
      common: {
        Accept: 'text/plain, */*',
      },
    },
  })

  instance.setBaseURL('/api')

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
    // users: repositoryWithAxios('users'),
    // ...
  }

  inject('api', api)
}
