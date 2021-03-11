<template>
  <li class="comment" :class="level !== 0 && 'reply'">
    <div class="card">
      <div class="profile">
        <NuxtLink
          :to="{
            name: 'username___en',
            params: {username: comment.user.username},
          }"
          class="inner-link"
        >
          <img :src="comment.user.profile_image_90" :alt="comment.user.name" />
          <span>{{ comment.user.name }}</span>
        </NuxtLink>
        <a
          v-if="comment.user.twitter_username"
          :href="`https://twitter.com/${comment.user.twitter_username}`"
          target="_blank"
        >
          TwitterIcon
        </a>
        <a
          v-if="comment.user.github_username"
          :href="`https://github.com/${comment.user.github_username}`"
          target="_blank"
        >
          GithubIcon
        </a>
        <a
          v-if="comment.user.website_url"
          :href="comment.user.website_url"
          target="_blank"
          rel="nofollow noopener noreferrer"
        >
          ExternalLinkIcon
        </a>
      </div>
      <!-- eslint-disable-next-line -->
      <div v-html="comment.body_html" class="html-content"></div>
    </div>
    <ul>
      <CommentBlock
        v-for="reply in comment.children"
        :key="reply.id_code"
        :comment="reply"
        :level="level + 1"
      />
    </ul>
  </li>
</template>

<script>
export default {
  name: 'CommentBlock',
  props: {
    comment: {
      type: Object,
      default: null,
    },
    level: {
      type: Number,
      default: null,
    },
  },
}
</script>
