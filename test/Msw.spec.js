import Msw from '../pages/msw.vue'

import {setupServer} from 'msw/node'
import {render, screen, waitFor} from '@testing-library/vue'
import '@testing-library/jest-dom'
import handlers from '../mocks/handlers'

const server = setupServer(...handlers)

beforeAll(() => {
  server.listen()
})

afterAll(() => {
  server.close()
})

describe('Msw', () => {
  it('calls fetchComment once and displays a comment', async () => {
    render(Msw)
    await waitFor(() => {
      expect(screen.getByText('it works :)')).toBeInTheDocument()
    })
  })
})
