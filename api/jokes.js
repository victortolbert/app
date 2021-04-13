import { mande, defaults } from 'mande'

export const jokes = mande('https://official-joke-api.appspot.com')
// jokes.options.a

// @ts-ignore
delete defaults.headers['Content-Type']

export function getRandomJoke() {
  return jokes.get('/jokes/random')
}
