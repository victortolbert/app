<template>
  <main class="flex-1">
    <section class="flex items-center justify-center h-full">
      <div>
        <OField>
          <OButton size="medium" variant="primary" @click="openLoading">
            Launch loading
          </OButton>
        </OField>

        <OField>
          <OSwitch v-model="isFullPage">
            Display loader over full page
          </OSwitch>
        </OField>

        <p style="position: relative" ref="element">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce id
          fermentum quam. Proin sagittis, nibh id hendrerit imperdiet, elit
          sapien laoreet elit

          <OLoading
            :full-page="isFullPage"
            :active.sync="isLoading"
            :can-cancel="true"
          >
            <OIcon pack="fas" icon="sync-alt" size="large" spin />
          </OLoading>
        </p>
      </div>
    </section>
  </main>
</template>

<script>
export default {
  data() {
    return {
      isFullPage: true,
      isLoading: false,
    }
  },
  methods: {
    openLoading() {
      this.isLoading = true
      setTimeout(() => {
        this.isLoading = false
      }, 3 * 1000)
    },
    // openLoading() {
    //   const loadingComponent = this.$oruga.loading.open({
    //     fullPage: this.isFullPage,
    //     container: this.isFullPage ? null : this.$refs.element,
    //     icon: 'spinner-third',
    //   })
    //   setTimeout(() => loadingComponent.close(), 3 * 1000)
    // },
  },
}
</script>
