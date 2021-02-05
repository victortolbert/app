import {shallowMount} from '@vue/test-utils'
import Rating from '@/components/Rating'

let wrapper = null

beforeEach(() => {
  wrapper = shallowMount(Rating, {
    propsData: {
      maxStars: 5,
      initialGrade: 2,
    },
  })
})

afterEach(() => {
  wrapper.destroy()
})

describe('Rating', () => {
  it('renders the stars', () => {
    const stars = wrapper.findAll('.star')

    expect(stars.length).toBe(5)
  })

  it('renders the active stars', () => {
    const active = wrapper.findAll('.star.active')

    expect(active.length).toBe(2)
  })

  it('renders a summary', () => {
    const summary = wrapper.find('.summary')

    expect(summary.text()).toBe('2 of 5')
  })
})
