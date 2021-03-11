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
