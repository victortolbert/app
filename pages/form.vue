<template>
  <PageWrapper>
    <SectionWrapper>
      <h3>VeeValidate - Nuxt Example:</h3>
      <h4>
        Hello from <span class="name">{{ name }}</span
        >.
      </h4>
      <ValidationProvider rules="required|alpha" v-slot="{errors}">
        <input type="text" v-model="value" />
        <span>{{ errors[0] }}</span>
      </ValidationProvider>
    </SectionWrapper>
  </PageWrapper>
</template>

<script>
import {ValidationProvider} from 'vee-validate'

export default {
  components: {
    ValidationProvider,
  },
  asyncData() {
    return {
      name: process.server ? 'server' : 'client',
    }
  },
  data: () => ({
    value: '',
  }),
}
</script>
