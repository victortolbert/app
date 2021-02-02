<template>
  <img
    :src="`https://images.unsplash.com/photo-${photoIds[1]}?ixlib=rb-1.2.1&amp;ixid=${ixids[1]}&amp;auto=format&amp;fit=${fit}&amp;w=${width}&amp;q=${quality}&amp;sat=-100`"
  />
</template>

<script>
export default {
  data() {
    return {
      photoIds: [
        '1505904267569-f02eaeb45a4c',
        '1494451930944-8998635c2123',
        '1517365830460-955ce3ccd263',
      ],
      ixlib: 'rb-1.2.1',
      auto: 'format',
      fit: 'crop', // facearea
      facepad: 4,
      width: 1908,
      height: 256,
      quality: 80,
      ixids: [
        'eyJhcHBfaWQiOjEyMDd9',
        'MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw',
        'eyJhcHBfaWQiOjEyMDd9',
      ],
    }
  },
}
</script>
