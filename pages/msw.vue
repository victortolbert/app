<script>
import {fetchComment} from '~/services/fetchers'

export default {
  data() {
    return {
      comment: '',
    }
  },
  async created() {
    try {
      this.comment = await fetchComment()
    } catch (error) {
      this.comment = 'server error :('
    }
  },
}
</script>

<template>
  <p>{{ comment }}</p>
</template>
