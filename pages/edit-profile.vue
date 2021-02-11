<template>
  <section class="min-h-screen page default_theme">
    <AppHeader>
      <PageHeader>{{ $t('edit_profile_page_header') }}</PageHeader>
    </AppHeader>
    <div class="pt-24 pb-4 mx-4 md:mx-0 lg:pt-40">
      <div class="max-w-md md:mx-auto">
        <EditProfileForm :user="user" />
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: 'EditProfileView',
  computed: {
    user() {
      return this.$store.state.user
    },
  },
}
</script>
