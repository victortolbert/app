<template>
  <img src="~/assets/img/logo-light.svg" alt="Logo" :class="$style.logo" />
</template>

<style lang="scss" module>
.logo {
  width: 200px;
  @apply mx-auto;
  animation: 1s appear;
}
@keyframes appear {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}
</style>
