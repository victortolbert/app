---
title: JavaScript
category: Snippets
position: 11
---

## `debounce`

```js
// source: https://www.joshwcomeau.com/snippets/javascript/debounce/
const debounce = (callback, wait) => {
  let timeoutId = null

  return (...args) => {
    window.clearTimeout(timeoutId)

    timeoutId = window.setTimeout(() => {
      callback.apply(null, args)
    }, wait)
  }
}

// usage
const handleMouseMove = debounce(event => {
  // Do stuff with the event!
}, 250)

window.addEventListener('mousemove', handleMouseMove)
```

## `for...of`

`for...of` is a gem because:

- It’s concise
- It accepts iterables, including arrays, strings, maps, sets, DOM collections
- It accepts array-like objects
- The iterated item can be destructured in-place.

### Array iteration

```js
const products = ['oranges', 'apples']

for (const product of products) {
  console.log(product)
}
// 'oranges'
// 'apples'
```

```js
const products = ['oranges', 'apples']

for (const [index, product] of products.entries()) {
  console.log(index, product)
}
// 0, 'oranges'
// 1, 'apples'
```

#### In-place destructuring

```js
const persons = [{name: 'John Smith'}, {name: 'Jane Doe'}]

for (const {name} of persons) {
  console.log(name)
}
// 'John Smith'
// 'Jane Doe'
```

### Array-like iteration

```js
function sum() {
  let sum = 0
  for (const number of arguments) {
    sum += number
  }
  return sum
}

sum(1, 2, 3) // => 6
```

### A quick overview of iterables

```js
const array = [1, 2, 3]
const iterator1 = array[Symbol.iterator]()
iterator1.next() // => { value: 1, done: false }
```

### String characters iteration

```js
const message = 'hello'

for (const character of message) {
  console.log(character)
}
```

### Maps and Sets iteration

```js
const names = new Map()
names.set(1, 'one')
names.set(2, 'two')

for (const [number, name] of names) {
  console.log(number, name)
}
```

```js
const colors = new Set(['white', 'blue', 'red', 'white'])

for (color of colors) {
  console.log(color)
}
// 'white'
// 'blue'
// 'red'
```

### Iterate plain JavaScript objects

```js
const person = {
  name: 'John Smith',
  job: 'agent',
}

Object.keys(person).forEach(prop => {
  console.log(prop, person[prop])
})
// 'name', 'John Smith'
// 'job', 'agent'
```

```js
const person = {
  name: 'John Smith',
  job: 'agent',
}

for (const [prop, value] of Object.entries(person)) {
  console.log(prop, value)
}
// 'name', 'John Smith'
// 'job', 'agent'
```

### Iterate DOM collections

```js
const children = document.body.children

for (const child of children) {
  console.log(child) // logs each child of <body>
}
```

```js
const allImages = document.querySelectorAll('img')

for (const image of allImages) {
  console.log(image) // log each image in the document
}
```

## `random`

```js
// source: https://www.joshwcomeau.com/snippets/javascript/range/
const random = (min, max) => Math.floor(Math.random() * (max - min)) + min

// Get a random number out of [10, 11, 12, 13]
random(10, 14)

// Get a random number from 1 to 100 (inclusive)
random(1, 101)

// Get a random number from -10 to 10 (inclusive)
random(-10, 11)
```

## `range`

```js
// source: https://www.joshwcomeau.com/snippets/javascript/range/
const range = (start, end, step = 1) => {
  let output = []
  if (typeof end === 'undefined') {
    end = start
    start = 0
  }
  for (let i = start; i < end; i += step) {
    output.push(i)
  }
  return output
}
```
