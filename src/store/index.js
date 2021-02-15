import Vue from 'vue';
import Vuex from 'vuex';
import auth from './modules/auth';
import feed from './modules/feed';
import popularTags from './modules/popularTags';
import article from './modules/article';
import createArticle from './modules/createArticle';
import editArticle from './modules/editArticle';
import addToFavorites from './modules/addToFavorites';
import userProfile from './modules/userProfile';
import followUser from './modules/followUser';
import comments from './modules/comments';
import createPersistedState from 'vuex-persistedstate';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {},
  mutations: {},
  actions: {},
  modules: {
    auth,
    feed,
    popularTags,
    article,
    createArticle,
    editArticle,
    addToFavorites,
    userProfile,
    followUser,
    comments
  },
  plugins: [createPersistedState({ paths: ['auth'] })]
});
