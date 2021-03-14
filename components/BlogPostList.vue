<script>
export default {
  name: 'BlogPostList',
  props: {
    list: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      displayRange: {
        end: 4,
      },
      selectedTag: '',
    }
  },
  computed: {
    filteredList() {
      const props = this.$options.propsData

      if (props) {
        if (props.list && props.list.length > 0) {
          return props.list
            .filter(item => {
              const isBlogPost = item.path.includes('/blog/')
              const isReadyToPublish = new Date(item.date) <= new Date()
              const hasTags = item.tags && item.tags.includes(this.selectedTag)

              const shouldPublish = this.selectedTag
                ? isBlogPost && isReadyToPublish && hasTags
                : isBlogPost && isReadyToPublish

              if (shouldPublish) {
                return item
              }
            })
            .sort((a, b) => new Date(b.date) - new Date(a.date))
        }
      }

      return false
    },
  },
  methods: {
    loadMore() {
      this.displayRange.end += 5
    },
    updateSelectedTag(tag) {
      this.selectedTag = tag
    },
  },
}
</script>

<template>
  <div class="blog-list__container">
    <div class="blog-list__header">
      <h1 class="blog-list-title">Blog Posts</h1>
      <div style="margin-left: 20px" class="tooltip-ex">
        <strong><i class="fas fa-info-circle"></i></strong>
        <span class="tooltip-ex-text tooltip-ex-bottom"
          >Everything here is written via the stream of consciousness writing
          technique and should be treated as a rough draft at best (i.e., very
          little editing). However, I promise you one thing:
          <strong
            ><em
              >none of the posts below are meant to be offensive or malicious in
              any way</em
            ></strong
          >. So if you read something that you feel is offensive, please let me
          know and I'll be happy to take the time to rewrite it!</span
        >
      </div>
    </div>

    <h2 class="blog-list-subtitle">Most Recent</h2>

    <div v-if="selectedTag" class="filtered-heading">
      <h2>Filtered by {{ selectedTag }} tag</h2>
      <button
        type="button"
        class="btn clear-filter-btn"
        @click="selectedTag = ''"
      >
        Clear filter
      </button>
    </div>
    <ul class="blog-list">
      <li
        v-for="(item, index) in filteredList"
        :key="`blog-post-${index}`"
        class="blog-list__item"
      >
        <BlogPostPreview
          v-show="index <= displayRange.end"
          :excerpt="item.excerpt"
          :path="item.path"
          :published="item.date"
          :tags="item.tags"
          :title="item.title"
          @updateSelectedTag="updateSelectedTag"
        />
      </li>
    </ul>

    <div v-if="displayRange.end <= filteredList.length" class="pagination">
      <button class="button--load-more" type="button" @click="loadMore">
        Load More
      </button>
    </div>
  </div>
</template>
