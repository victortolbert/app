<template>
  <div>
    <button
      class="relative px-4 py-1 overflow-hidden text-xs font-medium tracking-wide uppercase rounded shadow bg-primary-300 button"
    >
      {{ $t('donate') }}
    </button>
  </div>
</template>

<script>
export default {}
</script>
<style>
.button:hover::after {
  transform: scale(1);
  transform: scale(1, 1);
}

.button::after {
  content: '';
  position: absolute;
  z-index: 1;
  left: 0;
  bottom: 0;
  width: 100%;
  height: 4px;
  background: white;
  transition: transform 0.45s;
  transform: scale(0, 1);
  transform-origin: 0% 100%;
}
</style>
