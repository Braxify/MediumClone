import popularTagsAPI from '@/api/popularTags';

export default {
  namespaced: true,

  state: {
    data: null,
    isLoading: false,
    error: null
  },
  mutations: {
    getPopularTagsStart(state) {
      state.isLoading = true;
      state.data = null;
    },
    getPopularTagsSuccess(state, payload) {
      state.isLoading = false;
      state.data = payload;
    },
    getPopularTagsFailure(state) {
      state.isLoading = false;
    }
  },
  actions: {
    async getPopularTags({ commit }) {
      try {
        commit('getPopularTagsStart');
        const tags = await popularTagsAPI.getPopularTags();
        commit('getPopularTagsSuccess', tags);
        return tags;
      } catch {
        commit('getPopularTagsFailure');
      }
    }
  }
};
