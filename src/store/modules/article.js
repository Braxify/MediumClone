import articleAPI from '@/api/article';

export default {
  namespaced: true,
  state: {
    data: null,
    isLoading: false,
    error: null
  },
  mutations: {
    getArticleStart(state) {
      state.isLoading = true;
      state.data = null;
    },
    getArticleSuccess(state, payload) {
      state.isLoading = false;
      state.data = payload;
    },
    getArticleFailure(state) {
      state.isLoading = false;
    },
    deleteArticleStart() {},
    deleteArticleSuccess() {},
    deleteArticleFailur() {}
  },
  actions: {
    async getArticle({ commit }, { slug }) {
      try {
        commit('getArticleStart', slug);
        const article = await articleAPI.getArticle(slug);
        commit('getArticleSuccess', article);
        return article;
      } catch {
        commit('getArticleFailure');
      }
    },
    async deleteArticle({ commit }, { slug }) {
      try {
        commit('deleteArticleStart');
        await articleAPI.deleteArticle(slug);
        commit('deleteArticleSuccess');
      } catch {
        commit('deleteArticleFailure');
      }
    }
  }
};
