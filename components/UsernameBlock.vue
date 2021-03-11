<template>
  <section>
    <template v-if="$fetchState.pending">
      <div class="image-wrapper loading">
        <content-placeholders>
          <content-placeholders-img />
        </content-placeholders>
      </div>
      <div class="content">
        <content-placeholders rounded>
          <content-placeholders-text :lines="3" />
        </content-placeholders>
      </div>
      <div class="info">
        <content-placeholders rounded>
          <content-placeholders-text :lines="3" />
        </content-placeholders>
      </div>
    </template>
    <template v-else-if="$fetchState.error">
      <inline-error-block :error="$fetchState.error" />
    </template>
    <template v-else>
      <div class="image-wrapper">
        <img :src="user.profile_image" :alt="_user.name" />
      </div>
      <div class="content">
        <h1>{{ _user.name }}</h1>
        <a
          :href="`https://dev.to/${_user.username}`"
          target="_blank"
          rel="nofollow noopener noreferrer"
          class="f-button"
        >
          Follow
        </a>
        <div v-if="_user.summary" class="summary">{{ _user.summary }}</div>
        <div class="links">
          <a
            v-if="_user.twitter_username"
            :href="`https://twitter.com/${_user.twitter_username}`"
            target="_blank"
          >
            <TwitterIcon />
          </a>
          <a
            v-if="_user.github_username"
            :href="`https://github.com/${_user.github_username}`"
            target="_blank"
          >
            <GithubIcon />
          </a>
          <a
            v-if="_user.website_url"
            :href="_user.website_url"
            target="_blank"
            rel="nofollow noopener noreferrer"
          >
            <ExternalLinkIcon />
          </a>
        </div>
      </div>

      <div class="info">
        <div v-if="_user.location">
          <div class="title">location</div>
          <div class="content">{{ _user.location }}</div>
        </div>
        <div v-if="_user.joined_at">
          <div class="title">joined</div>
          <div class="content">{{ _user.joined_at }}</div>
        </div>
      </div>
    </template>
  </section>
</template>

<script>
import TwitterIcon from '@/assets/icons/twitter.svg?inline'
import GithubIcon from '@/assets/icons/github.svg?inline'
import ExternalLinkIcon from '@/assets/icons/external-link.svg?inline'
import User from '@/models/User'

export default {
  components: {
    TwitterIcon,
    GithubIcon,
    ExternalLinkIcon,
  },
  props: [],
  async fetch() {
    const user = await User.custom('users/by_username')
      .params({
        url: this.$route.params.username,
      })
      .first()

    if (!user.id && user.username === this.$route.params.username) {
      // set status code on server
      if (process.server) {
        this.$nuxt.context.res.statusCode = 404
      }
      throw new Error('User not found')
    }
    this.user = user
  },
  data() {
    return {
      user: {},
    }
  },
  computed: {
    _user() {
      return new User(this.user)
    },
  },
  head() {
    return {
      title: this._user.name,
    }
  },
}
</script>
