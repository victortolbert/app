<template>
  <div
    id="search-app"
    class="min-h-screen p-8 font-sans text-black bg-gray-700"
    style="padding-top: 14rem; padding-bottom: 14rem"
  >
    <div class="max-w-sm p-8 mx-auto bg-white rounded shadow-lg">
      <div class="mb-4">
        <label class="mb-2 form-label">Favorite Thrash Band</label>
        <SearchSelect
          v-model="selectedBand"
          :options="bands"
          :filter-function="applySearchFilter"
        />
      </div>

      <div class="text-right">
        <button type="button" class="btn btn-blue-500">Save Changes</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      selectedBand: null,
      search: '',
      bands: [
        'Anthrax',
        'Dark Angel',
        'Death Angel',
        'Destruction',
        'Exodus',
        'Flotsam and Jetsam',
        'Kreator',
        'Megadeth',
        'Metallica',
        'Overkill',
        'Sepultura',
        'Slayer',
        'Testament',
      ],
    }
  },
  methods: {
    applySearchFilter(search, bands) {
      return bands.filter(band =>
        band.toLowerCase().startsWith(search.toLowerCase()),
      )
    },
  },
}
</script>

<style src="../assets/css/advanced.css" />
