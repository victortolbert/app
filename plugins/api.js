export default function ({$axios}, inject) {
  const api = $axios.create({
    headers: {
      common: {
        Accept: 'text/plain, */*',
      },
    },
  })

  // api.onError(error => {
  //   if (error.response.status === 500) {
  //     redirect('/sorry')
  //   }
  // })

  // Set baseURL to something different
  api.setBaseURL('https://my_api.com')

  inject('api', api)

  // return {
  //   get: (resource, perPage, page) => {
  //     return api.get(`${resource}?_limit=` + perPage + '&_page=' + page)
  //   },
  //   find: (resource, id) => {
  //     return api.get(`${resource}/${id}`)
  //   },
  //   create: (resource, payload) => {
  //     return api.post(`${resource}`, payload)
  //   },
  //   update: (resource, id, payload) => {
  //     return api.put(`${resource}/${id}`, payload)
  //   },
  //   delete: (resource, id) => {
  //     return api.delete(`${resource}/${id}`)
  //   },
  // }
}
