<script>
import {defineComponent} from '@nuxtjs/composition-api'

import ModalForm from '~/components/ModalForm.vue'

export default defineComponent({
  methods: {
    handleRightClick(event) {
      event.preventDefault()

      this.$oruga.modal.open({
        parent: this,
        component: ModalForm,
        custom: true,
        trapFocus: true,
      })

      // this.$oruga.modal.open('testing')
    },
  },
})
</script>

<template>
  <NuxtLink
    class="flex items-center justify-center"
    :to="`/dashboard/`"
    @contextmenu.native="handleRightClick"
  >
    <BaseLogo
      class="text-primary-500"
      :name="$store.state.auth.user.affiliate.name.toLowerCase()"
    />
  </NuxtLink>
</template>
