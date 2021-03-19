import createRepository from '~/api/repository'

export default ({$axios}, inject) => {
  const repositoryWithAxios = createRepository($axios)
  inject('advocateRepository', repositoryWithAxios('/advocates'))
  inject('affiliateRepository', repositoryWithAxios('/affiliates'))
  inject('churchRepository', repositoryWithAxios('/churches'))
  inject('eventRepository', repositoryWithAxios('/events'))
  inject('messageRepository', repositoryWithAxios('/messages'))
  inject('personRepository', repositoryWithAxios('/people'))
  inject('postRepository', repositoryWithAxios('/posts'))
  inject('regionRepository', repositoryWithAxios('/regions'))
  inject('employeeRepository', repositoryWithAxios('/employees'))
  inject('volunteerRepository', repositoryWithAxios('/volunteers'))
}
