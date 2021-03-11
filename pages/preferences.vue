<template>
  <div>
    <Portal to="overlays" v-if="showAnnouncement">
      <AnnouncementModal
        :show="showAnnouncement"
        @close="showAnnouncement = false"
      />
    </Portal>

    <div class="min-h-screen p-8 bg-gray-700">
      <div class="max-w-sm mx-auto">
        <UserSettingsForm :account-id="accountId" />
      </div>
    </div>

    <!-- Teleport in Vue 3 -->
    <PortalTarget name="overlays" />
  </div>
</template>

<script>
export default {
  data() {
    return {
      accountId: 7,
      showAnnouncement: true,
    }
  },
}
</script>

<style src="../assets/css/advanced.css" />
