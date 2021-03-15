<template>
  <component v-bind:is="`h${$props.level}`" v-bind="$attrs" />
</template>

<script>
export default {
  props: ['level'],
}
</script>
