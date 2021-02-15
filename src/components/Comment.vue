<template>
  <div class="card">
    <div class="card-block">
      <p class="card-text">{{ comment.body }}</p>
    </div>
    <div class="card-footer">
      <router-link
        class="comment-author"
        :to="{ name: 'userProfile', params: { slug: comment.author.username } }"
      >
        <img :src="comment.author.image" class="comment-author-img" alt="" />
      </router-link>
      &nbsp;
      <router-link
        class="comment-author"
        :to="{ name: 'userProfile', params: { slug: comment.author.username } }"
        >{{ comment.author.username }}</router-link
      >
      <span class="date-posted">{{ comment.createdAt }}</span>
      <span
        class="mod-options"
        v-if="currentUser.username === comment.author.username"
      >
        <i class="ion-trash-a" @click="removeComment"></i>
      </span>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
export default {
  name: 'Comment',
  props: {
    comment: {
      type: Object,
      required: true
    }
  },
  computed: {
    ...mapGetters({
      currentUser: 'auth/currentUser'
    })
  },

  methods: {
    ...mapActions({
      deleteComment: 'comments/deleteComment'
    }),
    removeComment() {
      this.deleteComment({
        slug: this.$route.params.slug,
        commentId: this.comment.id
      });
    }
  }
};
</script>

<style></style>
