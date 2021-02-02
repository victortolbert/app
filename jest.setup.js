import '@testing-library/jest-dom/extend-expect'

import {mount} from '@vue/test-utils'

export async function mountWithAsyncData(
  component,
  {asyncDataContext, ...options} = {},
) {
  const initialData = options.data === 'function' ? options.data() : null
  if ('data' in options && initialData === null)
    throw new Error('data should be a function that returns an object')
  if (typeof component.asyncData === 'function') {
    const data = await component.asyncData(asyncDataContext)
    options.data = () => ({...(initialData || {}), ...(data || {})})
  }
  return mount(component, options)
}
