import userProfileAPI from '@/api/userProfile';

export default {
  namespaced: true,
  state: {
    data: null,
    isLoading: false,
    error: null
  },
  mutations: {
    getUserProfileStart(state) {
      state.isLoading = true;
      state.data = null;
    },
    getUserProfileSuccess(state, payload) {
      state.isLoading = false;
      state.data = payload;
    },
    getUserProfileFailure(state) {
      state.isLoading = false;
    }
  },
  actions: {
    async getUserProfile({ commit }, { slug }) {
      try {
        commit('getUserProfileStart');
        const profile = await userProfileAPI.getUserProfile(slug);
        commit('getUserProfileSuccess', profile);
        return profile;
      } catch {
        commit('getUserProfileFailure');
      }
    }
  }
};
