<template>
  <div id="lab">
    <p>{{ buttonStyles }}</p>
    <Suspense>
      <template #default>
        <Timeline />
      </template>
      <template #fallback> Loading... </template>
    </Suspense>
  </div>
</template>

<style>
#lab {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
