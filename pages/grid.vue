<template>
  <div class="flex-1 h-full p-8 border bg-indigo-50 parent">
    <div class="border div1">asdfas</div>
    <div class="div2">Go</div>
    <div class="div3"></div>
    <div class="div4"></div>
  </div>
</template>
<style scoped>
div {
  border: 1px solid red;
}
.parent {
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  grid-template-rows: repeat(5, 1fr);
  grid-column-gap: 24px;
  grid-row-gap: 24px;
}

.div1 {
  grid-area: 1 / 1 / 6 / 4;
}
.div2 {
  grid-area: 1 / 4 / 2 / 6;
}
.div3 {
  grid-area: 2 / 4 / 4 / 6;
}
.div4 {
  grid-area: 4 / 4 / 6 / 6;
}
</style>
