<script>
export default {
  data() {
    return {
      accounts: [
        {
          name: 'Codepen',
          url: 'https://codepen.io/VictorTolbert/',
        },
        // {
        //   name: 'Clubhouse',
        //   url: 'https://www.twitter.com/victortolbert',
        // },
        {
          name: 'DeviantArt',
          url: 'https://www.deviantart.com/victor',
        },
        {
          name: 'Facebook',
          url: 'https://www.facebook.com/victortolbert',
        },
        {
          name: 'LinkedIn',
          url: 'https://www.linkedin.com/in/victortolbert',
        },
        {
          name: 'Tumblr',
          url: 'https://victor.tumblr.com',
        },
        {
          name: 'Twitter',
          url: 'https://www.twitter.com/victortolbert',
        },
        {
          name: 'TikTok',
          url: 'https://www.tiktok.com/@design_coder?lang=en',
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
        {
          name: 'WordPress',
          url: 'https://victor.wordpress.com/',
        },
      ],
    }
  },
}
</script>

<template>
  <ul class="flex space-x-3">
    <li v-for="account in accounts" :key="`footer-social-${account.name}`">
      <a target="_blank" rel="noopener" :href="account.url">
        <BaseIconBrand :name="account.name.toLocaleLowerCase()" />
      </a>
    </li>
  </ul>
</template>
