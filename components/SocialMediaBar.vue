<script>
export default {
  data() {
    return {
      accounts: [
        {
          name: 'Codepen',
          url: 'https://www.twitter.com/victortolbert',
        },
        {
          name: 'Clubhouse',
          url: 'https://www.twitter.com/victortolbert',
        },
        {
          name: 'DeviantArt',
          url: 'https://www.twitter.com/victortolbert',
        },
        {
          name: 'Facebook',
          url: 'https://www.twitter.com/victortolbert',
        },
        {
          name: 'LinkedIn',
          url: 'https://www.twitter.com/victortolbert',
        },
        {
          name: 'Tumblr',
          url: 'https://www.twitter.com/victortolbert',
        },
        {
          name: 'Twitter',
          url: 'https://www.twitter.com/victortolbert',
        },
        {
          name: 'TikTok',
          url: 'https://www.instagram.com/victortolbert',
        },
        {
          name: 'Instagram',
          url: 'https://www.instagram.com/victortolbert',
        },
        {
          name: 'YouTube',
          url: 'https://www.youtube.com/channel/UC6BN4Sr-VDEvWPD2ZasJxFA',
        },
        {
          name: 'Twitch',
          url: 'https://www.twitch.tv/victortolbert',
        },
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
  <ul class="flex space-x-3">
    <li v-for="account in accounts" :key="`footer-social-${account.name}`">
      <a class="social-media-item"  target="_blank" rel="noopener" :href="account.url">
        <span class="social-media-label">{{ account.name }}</span>
      </a>
    </li>
  </ul>
</template>
