<template>
  <div class="row">
    <div class="col-xs-12 col-md-8 offset-md-2">
      <div v-if="currentUser">
        <CommentForm />
        <div v-if="comments">
          <Comment
            v-for="(comment, idx) in comments"
            :key="idx"
            :comment="comment"
          />
        </div>
      </div>
      <div v-else>
        <p class="text-xs-center">
          <router-link :to="{name:'login'}" >Sign In</router-link> to see the comments section.
        </p>
      </div>
    </div>
  </div>
</template>

<script>

import CommentForm from '@/components/CommentForm';
import Comment from '@/components/Comment';
import { mapActions, mapGetters, mapState } from 'vuex';
export default {
  name: 'Comments',
  props: {
    articleSlug: {
      type: String,
      required: true
    }
  },
  components: {
    // ValidationErrors,
    CommentForm,
    Comment
  },

  computed: {
    ...mapState({
      comments: state => state.comments.data
    }),
    ...mapGetters({
      currentUser: 'auth/currentUser'
    })
  },
  methods: {
    ...mapActions({
      fetchComments: 'comments/fetchComments'
    })
  },
  mounted() {
    this.fetchComments({ slug: this.articleSlug });
  }
};
</script>

<style></style>
