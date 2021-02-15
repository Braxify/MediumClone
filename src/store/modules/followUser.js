import followUserAPI from '@/api/followUser';

export default {
  namespaced: true,
  mutations: {
    followUserStart() {},
    followUserSuccess() {},
    followUserFailure() {}
  },
  actions: {
    async followUser({ commit }, { slug, isFollowed }) {
      try {
        commit('followUserStart');
        const promise = isFollowed
          ? followUserAPI.unfollowUser(slug)
          : followUserAPI.followUser(slug);
        const user = await promise;
        commit('followUserSuccess', user);
      } catch {
        commit('followUserFailure');
      }
    }
  }
};
