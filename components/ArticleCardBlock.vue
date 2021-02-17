<template>
  <NuxtLink
    :to="{
      name: 'username-article___en',
      params: {username: article.user.username, article: article.id},
    }"
    tag="article"
  >
    <div class="image-wrapper">
      <img
        v-if="article.cover_image"
        :src="article.cover_image"
        :alt="article.title"
      />
      <img v-else :src="article.social_image" :alt="article.title" />
    </div>
    <div class="content">
      <NuxtLink
        :to="{
          name: 'username-article___en',
          params: {username: article.user.username, article: article.id},
        }"
      >
        <h1>{{ article.title }}</h1>
      </NuxtLink>
      <div class="tags">
        <NuxtLink
          v-for="tag in article.tag_list"
          :key="tag"
          :to="{name: 't-tag___en', params: {tag}}"
          class="tag"
        >
          #{{ tag }}
        </NuxtLink>
      </div>
      <div class="meta">
        <div class="scl">
          <span>
            HeartIcon
            {{ article.positive_reactions_count }}
          </span>
          <span>
            CommentsIcon
            {{ article.comments_count }}
          </span>
        </div>
        <time>{{ article.readable_publish_date }}</time>
      </div>
    </div>
  </NuxtLink>
</template>

<script>
export default {
  props: {
    article: {
      type: Object,
      default: null,
    },
  },
}
</script>

<style lang="scss" scoped>
article {
  border-radius: 1rem;
  overflow: hidden;
  box-shadow: $shadow;
  cursor: pointer;
  &:hover {
    box-shadow: $small-shadow;
    h1 {
      color: $primary-color;
    }
  }
  .image-wrapper {
    position: relative;
    padding-bottom: 56.25%;
    background-color: $elevated-surface-color;
    img {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }
  .content {
    padding: 1rem;
    h1 {
      font-size: $text-xl;
      letter-spacing: $-ls2;
      margin-bottom: 1rem;
    }
    .tags {
      display: flex;
      flex-wrap: wrap;
      margin-bottom: 0.5rem;
      .tag {
        font-size: $text-sm;
        font-weight: $bold-body-font-weight;
        line-height: 1;
        padding: 0.5rem 0.5rem;
        margin: 0 0.5rem 0.5rem 0;
        border-radius: 0.25rem;
        box-shadow: $small-shadow;
        &:hover {
          background: $hovered-surface-color;
        }
        &:active {
          background: transparent;
          box-shadow: $small-inner-shadow;
        }
      }
    }
    .meta {
      font-size: $text-xs;
      letter-spacing: $-ls2;
      display: flex;
      align-items: center;
      justify-content: space-between;
      .scl {
        display: flex;
        span {
          display: flex;
          align-items: center;
          margin-right: 1rem;
          svg {
            margin-right: 0.25rem;
          }
        }
      }
    }
  }
}
</style>
