import Msw from '../pages/msw.vue'

import {setupServer} from 'msw/node'
import {render, screen, waitFor} from '@testing-library/vue'
import '@testing-library/jest-dom'
import handlers from '../mocks/handlers'
import {rest} from 'msw'
import * as fetchers from '~/services/fetchers'

const server = setupServer(...handlers)

const fetchCommentSpy = jest.spyOn(fetchers, 'fetchComment')

beforeAll(() => {
  server.listen()
})

afterEach(() => {
  fetchCommentSpy.mockClear()
  server.resetHandlers()
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
    expect(fetchCommentSpy).toHaveBeenCalledTimes(1)
  })

  it('shows an error comment on server error', async () => {
    server.use(
      rest.get('/comment', (req, res, ctx) => {
        return res(ctx.status(500))
      }),
    )
    render(Msw)
    await waitFor(() => {
      expect(screen.getByText('server error :(')).toBeInTheDocument()
    })
    expect(fetchCommentSpy).toHaveBeenCalledTimes(1)
  })
})
