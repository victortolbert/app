<script>
export default {
  name: 'AdminNavbar',
  data() {
    return {
      count: 0,
    }
  },
}
</script>

<template>
  <div>
    <div>Admin Navbar {{ count }}</div>
    <br />
    <button @click="count++">MOAR!</button>
  </div>
</template>
