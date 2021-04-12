<script>
export default {
  data() {
    return {
      checked: [],
      todos: [
        'Set up nuxt.config.js',
        'Create Pages',
        'Create Menu and explain what Nuxt Layouts do',
        'Create Masthead, Index page',
        'Create a grid from store data',
        'Exercise: Create footer, create restaurants page',
        'Bring things in via API, via Vuex store and a Plugin',
        'Deploy! And set up environment variables',
        'Filter the grid with a reusable component and computed properties',
        'Create a dynamic page',
        'Exercise: put the content into the dynamic page',
        'Create a reusable toast component with a slot',
        'Create a cart page, use Vuex store mutations',
        'Make use of uuid',
        'Create an SVG icon with conditional layout',
        'Exercise: Finish the cart, add a counter to the cart link in menu',
        'Review validation',
      ],
    }
  },
  watch: {
    checked(newValue, oldValue) {
      localStorage.setItem('checked', JSON.stringify(newValue))
    },
  },
  mounted() {
    this.checked = JSON.parse(localStorage.getItem('checked')) || []
  },
}
</script>

<template>
  <PageWrapper id="app">
    <SectionWrapper>
      <form action="">
        <fieldset>
          <legend>
            What we're building
          </legend>
          <div v-for="todo in todos" :key="todo">
            <input
              :id="todo"
              v-model="checked"
              type="checkbox"
              name="todo"
              :value="todo"
            >
            <label :for="todo">{{ todo }}</label>
          </div>
        </fieldset>
      </form>
    </SectionWrapper>
  </PageWrapper>
</template>
