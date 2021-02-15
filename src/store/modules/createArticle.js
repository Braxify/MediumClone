import articleAPI from '@/api/article';

export default {
  namespaced: true,

  state: {
    isSubmitting: false,
    validationErrors: null
  },
  mutations: {
    createArticleStart(state) {
      state.isSubmitting = true;
    },
    createArticleSuccess(state) {
      state.isSubmitting = false;
    },
    createArticleFailure(state, payload) {
      state.isSubmitting = false;
      state.validationErrors = payload;
    }
  },
  actions: {
    async createArticle({ commit }, { articleInput }) {
      try {
        commit('createArticleStart');
        const article = await articleAPI.createArticle(articleInput);
        commit('createArticleSuccess', article);
        return article;
      } catch (result) {
        commit('createArticleFailure', result);
      }
    }
  }
};
