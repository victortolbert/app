<template lang="pug">

main.flex-1.p-8

  section.prose.prose-sm
    h2 Header Two

    p.lead This is test

    p Lorem ipsum dolor, sit amet consectetur adipisicing elit. Aut, consequuntur quasi.

    ul.grid.grid-cols-2
      li(v-for="(link, index) in $store.state.menu.links") {{ link.label }}

</template>

<script>
export default {}
</script>
