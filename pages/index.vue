<script>
import { defineComponent, ref } from '@nuxtjs/composition-api'

export default defineComponent({
  name: 'Dashboard',
  setup() {
    const chartData = [['Jan', 4], ['Feb', 2], ['Mar', 10], ['Apr', 5], ['May', 3]]
    const isEnabled = ref(false)
    return { chartData, isEnabled }
  }
})
</script>
<template>
  <main class="flex-1">
    <SectionWrapper>
      <line-chart :data="chartData"></line-chart>
    </SectionWrapper>

    <SectionWrapper>
      <UserSettingsForm />
    </SectionWrapper>
  </main>
</template>

<style>
body {
  background-color: #fff;
  color: rgba(0, 0, 0, 0.8);
}
.dark body {
  background-color: #091a28;
  color: #ebf4f1;
}
.sepia body {
  background-color: #f1e7d0;
  color: #433422;
}
</style>
