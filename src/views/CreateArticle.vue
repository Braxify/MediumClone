<template>
  <div>
    <ArticleForm
      :initialValues="initialValues"
      :errors="validationErrors"
      :isSubmitting="isSubmitting"
      @articleSubmit="onSubmit"
    />
  </div>
</template>

<script>
import ArticleForm from '@/components/ArticleForm';
import { mapActions, mapState } from 'vuex';
export default {
  name: 'CreateArticle',
  components: { ArticleForm },
  data() {
    return {
      initialValues: {
        title: '',
        description: '',
        body: '',
        tagList: []
      }
    };
  },
  computed: {
    ...mapState({
      isSubmitting: state => state.createArticle.isSubmitting,
      validationErrors: state => state.createArticle.validationErrors
    })
  },
  methods: {
    ...mapActions({
      createArticle: 'createArticle/createArticle'
    }),
    async onSubmit(articleInput) {
      try {
        await this.createArticle({ articleInput }).then(article => {
          this.$router.push({
            name: 'article',
            params: { slug: article.slug }
          });
        });
      } catch (err) {
        console.error(err.message);
      }
    }
  }
};
</script>

<style></style>
