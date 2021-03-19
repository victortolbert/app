<script>
export default {
  name: 'User',
  data() {
    return {
      count: 0,
    }
  },
}
</script>

<template>
  <PageWrapper>
    <UserNavbar />
    <SectionWrapper>
      <div>User {{ count }}</div>
      <br />
      <button @click="count++">MOAR!</button>
    </SectionWrapper>
  </PageWrapper>
</template>
