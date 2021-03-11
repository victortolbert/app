<template>
  <div class="container">
    <button @click="callServerlessFunction">Call Function v2</button>
  </div>
</template>

<script>
export default {
  methods: {
    callServerlessFunction() {
      fetch('/api/hello-world?name=boop')
        .then(response => response.json())
        .then(realResponse => {
          console.log(realResponse)
        })
    },
  },
}
</script>
