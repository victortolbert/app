<template>
  <div>
    <FileUploadForm />

    <div class="p-12 prose">
      <p>Hi, my name is {{ user }}</p>

      <label class="block" for="username">
        <span class="text-gray-700">Username</span>
        <input
          class="block w-full mt-1 form-input"
          v-model="user"
          id="username"
          name="username"
        />
      </label>
      <button disabled>disabled button</button>

      <div>
        <label for="checkbox">Check</label>
        <input id="checkbox" type="checkbox" />
      </div>

      <button>Submit</button>
    </div>
  </div>
</template>

<script lang="ts">
import {defineComponent} from '@nuxtjs/composition-api'
import FileUploadForm from '~/components/FileUploadForm.vue'

export default defineComponent({
  components: {FileUploadForm},
  data: () => ({
    user: 'Alice',
  }),
})
</script>
