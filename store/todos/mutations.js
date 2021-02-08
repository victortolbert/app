export default {
  ADD(state, {text}) {
    state.list.push({
      text,
      done: false,
    })
  },

  TOGGLE(state, todo) {
    todo.done = !todo.done
  },
}
