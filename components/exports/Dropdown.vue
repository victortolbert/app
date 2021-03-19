<script>
import {ref, watchEffect} from '@nuxtjs/composition-api'
import {actions, hasLicense} from '~/helpers/user-access'

export default {
  props: {
    user: {
      type: String,
      default: '',
    },
  },
  setup() {
    const open = ref(true)

    // watchEffect() {

    // }

    return {
      open,
      actions,
      hasLicense,
    }
  },
}
</script>
<template>
  <div>
    <button type="button" @click="open = !open">
      Export <span>&#9660;</span>
    </button>

    <div v-if="open">
      <ul>
        <li v-if="hasLicense(user, {type: 'PDF'}, actions.EXPORT_FILE)">
          <button type="button">PDF</button>
        </li>
        <li v-if="hasLicense(user, {type: 'DOCX'}, actions.EXPORT_FILE)">
          <button type="button">DOCX</button>
        </li>
        <li v-if="hasLicense(user, {type: 'PDF'}, actions.EXPORT_FILE)">
          <button type="button">PDF</button>
        </li>
        <li v-if="hasLicense(user, {type: 'XLSX'}, actions.EXPORT_FILE)">
          <button type="button">XLSX</button>
        </li>
        <li v-if="hasLicense(user, {type: 'PPTX'}, actions.EXPORT_FILE)">
          <button type="button">PPTX</button>
        </li>
      </ul>
    </div>
  </div>
</template>
