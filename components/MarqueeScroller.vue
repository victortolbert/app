<template>
  <!-- Marquee -->
  <div class="outer-wrapper w-96">
    <DynamicMarquee direction="column" reverse>
      <ul>
        <li v-for="i in liNum" :key="i">Item {{ i }}</li>
      </ul>
    </DynamicMarquee>
  </div>
</template>

<script>
export default {
  data() {
    return {
      liNum: 1,
    }
  },
}
</script>

<style scoped>
.outer-wrapper {
  background-color: rebeccapurple;
  height: 30vh;
  width: 30vw;
  border: 2px solid red;
  position: absolute;
  top: 40vh;
  left: 0;
  right: 0;
  margin: 0 auto;
}
ul {
  margin-block-start: 0;
  margin-block-start: 0;
}
</style>
