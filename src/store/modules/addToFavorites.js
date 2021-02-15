import addToFavoritesAPI from '@/api/addToFavorites';

export default {
  namespaced: true,
  mutations: {
    addToFavoritesStart() {},
    addToFavoritesSuccess() {},
    addToFavoritesFailure() {}
  },
  actions: {
    async addToFavorites({ commit }, { slug, isFavorited }) {
      try {
        commit('addToFavoritesStart');
        const promise = isFavorited
          ? addToFavoritesAPI.removeFromFavorites(slug)
          : addToFavoritesAPI.addToFavorites(slug);
        const article = await promise;
        commit('addToFavoritesSuccess', article);
        return article;
      } catch {
        commit('addToFavoritesFailure');
      }
    }
  }
};
