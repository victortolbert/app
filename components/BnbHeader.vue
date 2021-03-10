<template>
  <header class="app-header">
    <div class="app-logo">
      <img src="/images/logo.svg" />
    </div>
    <div class="app-search">
      <input
        type="text"
        ref="citySearch"
        @changed="changed"
        placeholder="Enter your address"
      />
      <input type="text" class="datepicker" placeholder="Check in" />
      <input type="text" class="datepicker" placeholder="Check out" />
      <button>
        <img src="/images/icons/search.svg" />
      </button>
    </div>
    <div class="app-user-menu">
      <img src="/images/icons/house.svg" />
      <!-- <div class="name">Host</div> -->
      <div id="googleButton"></div>
    </div>
  </header>
</template>

<script>
export default {
  methods: {
    changed(event) {
      const place = event.detail
      if (!place.geometry) return

      this.$router.push({
        path: '/search/',
        query: {
          lat: place.geometry.location.lat(),
          lng: place.geometry.location.lng(),
          label: this.$refs.citySearch.value,
        },
      })
    },
  },
}
</script>
