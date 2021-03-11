<template>
  <div class="min-h-screen p-8 bg-grey-darker">
    <div class="max-w-md mx-auto">
      <FetchJson url="https://api.victortolbert.com/contacts" class="mb-8">
        <ContactList slot-scope="{response: contacts}" :contacts="contacts" />
      </FetchJson>

      <FetchJson url="https://api.victortolbert.com/albums">
        <div class="card" slot-scope="{response: albums, loading}">
          <h1 class="mb-6 text-2xl font-bold">Top Death Metal Albums</h1>

          <div v-if="loading" class="text-grey-darker">Loading...</div>
          <div v-else>
            <div class="album-grid">
              <div
                class="album-grid-item"
                v-for="(album, index) in albums"
                :key="index"
              >
                <img :src="album.artwork" class="" alt="" />
                <h2 class="album-title">{{ album.title }}</h2>
                <p class="album-artist">{{ album.artist }}</p>
              </div>
            </div>
          </div>
        </div>
      </FetchJson>
    </div>
  </div>
</template>

<style src="../assets/css/advanced.css" />
