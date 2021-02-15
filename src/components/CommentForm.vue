<template>
  <div>
    <ValidationErrors v-if="errors" :validationErrors="errors" />
    <form class="card comment-form">
      <div class="card-block">
        <textarea
          class="form-control"
          placeholder="Write a comment..."
          rows="3"
          v-model="message"
        >
        </textarea>
      </div>
      <div class="card-footer">
        <img :src="currentUser.image" alt="" class="comment-author-img" />
        <button
          class="btn btn-sm btn-primary"
          type="submit"
          @click.prevent="createComment"
        >
          Post Comment
        </button>
      </div>
    </form>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import ValidationErrors from '@/components/ValidationErrors';
export default {
  name: 'CommentForm',
  components: { ValidationErrors },
  data() {
    return {
      message: '',
      errors: null
    };
  },
  computed: {
    ...mapGetters({
      currentUser: 'auth/currentUser'
    })
  },
  methods: {
    ...mapActions({
      createNewComment: 'comments/createNewComment'
    }),
    async createComment() {
      try {
        await this.createNewComment({
          slug: this.$route.params.slug,
          commentInput: { body: this.message }
        });
        this.message = '';
      } catch (err) {
        this.errors = err;
      }
    }
  }
};
</script>

<style></style>
