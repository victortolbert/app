<template>
  <main class="flex-1">
    <BasePageHeading> Admin </BasePageHeading>
    <section class="p-8">
      <ul>
        <li v-for="(todo, index) in todos" :key="index">
          <input :checked="todo.done" type="checkbox" @change="toggle(todo)" />
          <span :class="{done: todo.done}">
            {{ todo.text }}
          </span>
        </li>
        <li>
          <input placeholder="What needs to be done?" @keyup.enter="addTodo" />
        </li>
      </ul>
      <NuxtLink to="/"> Home </NuxtLink>
    </section>
  </main>
</template>

<script>
import {mapMutations, mapGetters} from 'vuex'

export default {
  computed: mapGetters({
    todos: 'todos/todos',
  }),
  methods: {
    addTodo(e) {
      const text = e.target.value
      if (text.trim()) {
        this.$store.commit('todos/ADD', {text})
      }
      e.target.value = ''
    },
    ...mapMutations({
      toggle: 'todos/TOGGLE',
    }),
  },
}
</script>

<style>
.done {
  text-decoration: line-through;
}
</style>
