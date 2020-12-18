<template>
  <nav>
    <ul :class="$style['tab-nav-wrapper']">
      <TabNavItem
        v-for="taskList in taskListOverview"
        :key="`task-list-${taskList.name}`"
        :list-length="taskList.length"
        :list-name="taskList.name"
        :is-active="currentView === taskList.name"
        @emit-tab-value="updateCurrentView"
      />
    </ul>
  </nav>
</template>

<script>
import TabNavItem from './TabNavItem.vue'

export default {
  props: {
    currentView: {
      type: String,
      default: 'All',
      validator: value => {
        return ['All', 'Current', 'Completed'].includes(value)
      },
    },
    taskListOverview: {
      type: Array,
      required: true,
    },
  },
  components: {
    TabNavItem,
  },
  setup(props, ctx) {
    const updateCurrentView = payload => {
      ctx.emit('update-current-view', payload.value)
    }

    return {
      updateCurrentView,
    }
  },
}
</script>

<style module>
.tab-nav-wrapper {
  display: flex;
  column-gap: 30px;
  list-style: none;
  margin: 45px 0 20px;
  padding: 0;
}
</style>
