<script>
export default {
  computed: {
    isContentTruncated() {
      return true
    },
  },
}
</script>

<template>
  <div class="relative prose">
    <div>
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Laborum
        voluptates rem, libero accusamus ea vitae similique tenetur fuga
        repellat minima voluptatem amet? Non odio at autem aliquid cupiditate
        similique velit?
      </p>
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Laborum
        voluptates rem, libero accusamus ea vitae similique tenetur fuga
        repellat minima voluptatem amet? Non odio at autem aliquid cupiditate
        similique velit?
      </p>
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Laborum
        voluptates rem, libero accusamus ea vitae similique tenetur fuga
        repellat minima voluptatem amet? Non odio at autem aliquid cupiditate
        similique velit?
      </p>
    </div>
    <div v-if="isContentTruncated">
      <div class="fade-out" />
    </div>
  </div>
</template>

<style>
.fade-out {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  text-align: center;
  margin: 0;
  padding: 75px 0;

  background: -webkit-linear-gradient(
    rgba(255, 255, 255, 0) 0%,
    rgba(255, 255, 255, 1) 100%
  );
  background-image: -moz-linear-gradient(
    rgba(255, 255, 255, 0) 0%,
    rgba(255, 255, 255, 1) 100%
  );
  background-image: -o-linear-gradient(
    rgba(255, 255, 255, 0) 0%,
    rgba(255, 255, 255, 1) 100%
  );
  background-image: linear-gradient(
    rgba(255, 255, 255, 0) 0%,
    rgba(255, 255, 255, 1) 100%
  );
  background-image: -ms-linear-gradient(
    rgba(255, 255, 255, 0) 0%,
    rgba(255, 255, 255, 1) 100%
  );
}
</style>
