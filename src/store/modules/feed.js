import feedAPI from '@/api/feed';

export default {
  namespaced: true,
  state: {
    data: null,
    isLoading: false,
    error: null
  },
  mutations: {
    getFeedStart(state) {
      state.isLoading = true;
      state.data = null;
    },
    getFeedSuccess(state, payload) {
      state.isLoading = false;
      state.data = payload;
    },
    getFeedFailure(state) {
      state.isLoading = false;
    }
  },
  actions: {
    async getFeed({ commit }, { feedUrl }) {
      try {
        commit('getFeedStart', feedUrl);
        const response = await feedAPI.getFeed(feedUrl);
        commit('getFeedSuccess', response.data);
        return response.data;
      } catch {
        commit('getFeedFailure');
      }
    }
  }
};
