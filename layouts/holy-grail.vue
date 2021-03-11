<template>
  <div class="page-wrapper">
    <header class="header"><h1 contenteditable>Header.com</h1></header>
    <div class="left-sidebar" contenteditable>Left Sidebar</div>

    <main class="main" contenteditable>
      <Nuxt keep-alive :key="$route.params.id" />
    </main>

    <div class="right-sidebar" contenteditable>Right Sidebar</div>

    <footer class="footer" contenteditable>
      Footer Content — Header.com 2020
    </footer>
  </div>
</template>

<style>
.page-wrapper {
  display: grid;
  height: 100vh;
  grid-template: auto 1fr auto / auto 1fr auto;
}

.header {
  background: lightpink;
  padding: 2rem;
  grid-column: 1 / 4;
}

.left-sidebar {
  background: lightblue;
  grid-column: 1 / 2;
}

.main {
  background: coral;
  grid-column: 2 / 3;
}

.right-sidebar {
  background: yellow;
  grid-column: 3 / 4;
}

.footer {
  background: wheat;
  padding: 2rem;
  text-align: center;
  grid-column: 1 / 4;
}

.left-sidebar,
.right-sidebar {
  padding: 1rem;
}
</style>
