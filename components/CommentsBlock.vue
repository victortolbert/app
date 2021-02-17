<template>
  <div>
    <ul v-if="_comments.length" id="_comments">
      <CommentBlock
        v-for="comment in _comments"
        :key="comment.id_code"
        :comment="comment"
        :level="0"
      />
    </ul>
    <a
      :href="addCommentLink"
      target="_blank"
      rel="nofollow noopener noreferer"
      class="add-comment"
    >
      Add comment
    </a>
  </div>
</template>

<script>
import Comment from '@/models/Comment'

export default {
  props: [],
  async fetch() {
    this.comments = await Comment.params({
      a_id: this.$route.params.article,
    }).get()
  },
  data() {
    return {
      comments: [],
    }
  },
  fetchOnServer: false,
  computed: {
    _comments() {
      return this.comments.map(comment => new Comment(comment))
    },
    addCommentLink() {
      const {slug} = this.$store.state.currentArticle || {}

      return `https://dev.to/${this.$route.params.username}/${slug}`
    },
  },
}
</script>

<style lang="scss" scoped>
.add-comment {
  display: block;
  width: 100%;
  padding: 0.5rem;
  border-radius: 0.5rem;
  box-shadow: $small-shadow;
  text-transform: uppercase;
  text-align: center;
  font-weight: $display-font-weight;
  letter-spacing: $-ls2;
  margin-bottom: 1rem;
  &:hover {
    background: $hovered-surface-color;
  }
  &:active {
    background: transparent;
    box-shadow: $small-inner-shadow;
  }
}
</style>
