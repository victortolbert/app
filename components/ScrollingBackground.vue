<template>
  <div class="fixed w-full h-full overflow-hidden">
    <div
      class="scroll-bg"
      style="
        width: 100%;
        height: 400%;
        background-image: url('/assets/img/background.svg');
        background-size: cover;
        will-change: transform;
        background-repeat: repeat-y;
        background-position: center;
        z-index: -1;
      "
    />
  </div>
</template>

<style>
.scroll-bg {
  -webkit-animation-name: scroll;
  animation-name: scroll;
  -webkit-animation-duration: 30s;
  animation-duration: 30s;
  -webkit-animation-timing-function: linear;
  animation-timing-function: linear;
  -webkit-animation-iteration-count: infinite;
  animation-iteration-count: infinite;
}
@keyframes scroll {
  0% {
    transform: translateY(0);
  }
  to {
    transform: translateY(-2269px);
  }
}
@-webkit-keyframes scroll {
  0% {
    transform: translateY(0);
  }
  to {
    transform: translateY(-2269px);
  }
}
</style>
