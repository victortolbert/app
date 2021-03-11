<script>
export default {
  data() {
    return {
      accounts: [
        {
          name: 'Twitter',
          url: 'https://www.twitter.com/victortolbert',
        },
        {
          name: 'Instagram',
          url: 'https://www.instagram.com/victortolbert',
        },
        {
          name: 'YouTube',
          url: 'https://www.youtube.com/channel/UC0cNqew5aUOzYB5XmmkriWw',
        },
        // {
        //   name: 'Twitch',
        //   url: 'https://www.twitch.tv/bencodezen',
        // },
        {
          name: 'GitHub',
          url: 'https://www.github.com/victortolbert',
        },
      ],
    }
  },
}
</script>

<template>
  <ul class="flex justify-center">
    <li v-for="account in accounts" :key="`footer-social-${account.name}`">
      <a class="social-media-item" :href="account.url">
        <BaseIcon :name="account.name.toLowerCase()" />
        <span class="social-media-label">{{ account.name }}</span>
      </a>
    </li>
  </ul>
</template>

<style lang="scss">
.social-media-item {
  @apply flex flex-col justify-center items-center;
  @apply mb-3 mr-4;
  width: 30px;
  height: 30px;
}
.social-media-label {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  border: 0;
}
</style>
