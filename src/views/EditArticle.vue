<template>
  <div>
    <Loading v-if="isLoading" />
    <ArticleForm
      v-if="initialValues"
      :initialValues="initialValues"
      :errors="validationErrors"
      :isSubmitting="isSubmitting"
      @articleSubmit="onSubmit"
    />
  </div>
</template>

<script>
import ArticleForm from '@/components/ArticleForm';
import Loading from '@/components/Loading';
import { mapActions, mapState } from 'vuex';
export default {
  name: 'EditArticle',
  components: { ArticleForm, Loading },

  computed: {
    ...mapState({
      isLoading: state => state.editArticle.isLoading,
      article: state => state.editArticle.article,
      isSubmitting: state => state.editArticle.isSubmitting,
      validationErrors: state => state.editArticle.validationErrors
    }),
    initialValues() {
      if (!this.article) {
        return null;
      }
      return {
        title: this.article.title,
        description: this.article.description,
        body: this.article.body,
        tagList: this.article.tagList
      };
    }
  },
  methods: {
    ...mapActions({
      updateArticle: 'editArticle/updateArticle',
      getArticle: 'editArticle/getArticle'
    }),
    onSubmit(articleInput) {
      const slug = this.$route.params.slug;
      this.updateArticle({ articleInput, slug }).then(article => {
        this.$router.push({
          name: 'article',
          params: { slug: article.slug }
        });
      });
    }
  },
  mounted() {
    this.getArticle({
      slug: this.$route.params.slug
    });
  }
};
</script>

<style></style>
