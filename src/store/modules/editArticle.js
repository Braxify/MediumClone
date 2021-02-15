import articleAPI from '@/api/article';

export default {
  namespaced: true,
  state: {
    isSubmitting: false,
    validationErrors: null,
    isLoading: false,
    article: null
  },
  mutations: {
    updateArticleStart(state) {
      state.isSubmitting = true;
    },
    updateArticleSuccess(state) {
      state.isSubmitting = false;
    },
    updateArticleFailure(state, payload) {
      state.isSubmitting = false;
      state.validationErrors = payload;
    },
    getArticleStart(state) {
      state.isLoading = true;
    },
    getArticleSuccess(state, payload) {
      state.isLoading = false;
      state.article = payload;
    },
    getArticleFailure(state) {
      state.isLoading = false;
    }
  },
  actions: {
    async updateArticle({ commit }, { slug, articleInput }) {
      try {
        commit('updateArticleStart');
        const article = await articleAPI.updateArticle(slug, articleInput);
        commit('updateArticleSuccess', article);
        return article;
      } catch (result) {
        commit('updateArticleFailure', result);
      }
    },
    async getArticle({ commit }, { slug }) {
      try {
        commit('getArticleStart');
        const article = await articleAPI.getArticle(slug);
        commit('getArticleSuccess', article);
        return article;
      } catch {
        commit('getArticleFailure');
      }
    }
  }
};
