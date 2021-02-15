<template>
  <div class="editor-page">
    <div class="container page">
      <div class="row">
        <div class="col-md-10 offset-md-1 col-xs-12">
          <ValidationErrors v-if="errors" :validationErrors="errors" />
          <form @submit.prevent="onSubmit">
            <fieldset>
              <fieldset class="form-group">
                <input
                  type="text"
                  placeholder="Article Title"
                  v-model="title"
                  class="form-control form-control-lg"
                />
              </fieldset>
              <fieldset class="form-group">
                <input
                  type="text"
                  placeholder="What's this article about?"
                  v-model="description"
                  class="form-control"
                />
              </fieldset>
              <fieldset class="form-group">
                <textarea
                  type="text"
                  placeholder="Write your article (in markdown)"
                  v-model="body"
                  class="form-control"
                >
                What's this article about?
                </textarea>
              </fieldset>
              <fieldset class="form-group">
                <input
                  type="text"
                  placeholder="Enter tags"
                  v-model="tagList"
                  class="form-control"
                />
              </fieldset>
              <fieldset class="form-group">
                <button
                  type="submit"
                  class="btn btn-large pull-xs-right btn-primary"
                  :disabled="isSubmitting"
                >
                  Publish Article
                </button>
              </fieldset>
            </fieldset>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ValidationErrors from '@/components/ValidationErrors';
export default {
  name: 'ArticleForm',
  components: { ValidationErrors },
  props: {
    initialValues: {
      type: Object,
      required: true
    },
    errors: {
      type: Object,
      required: false
    },
    isSubmitting: {
      type: Boolean,
      required: true
    }
  },
  data() {
    return {
      title: this.initialValues.title,
      description: this.initialValues.description,
      body: this.initialValues.body,
      tagList: this.initialValues.tagList.join(' ')
    };
  },
  methods: {
    onSubmit() {
      const form = {
        title: this.title,
        description: this.description,
        body: this.body,
        tagList: this.tagList.split(' ')
      };
      this.$emit('articleSubmit', form);
    }
  }
};
</script>

<style></style>
