import authApi from '@/api/auth';
import { setItem } from '@/helpers/persistentStorage';

export default {
  namespaced: true,
  state: {
    isSubmitting: false,
    currentUser: null,
    validationErrors: null,
    isLoggedIn: false,
    isLoading: false
  },
  getters: {
    currentUser: state => {
      return state.currentUser;
    },
    isLoggedIn: state => {
      return Boolean(state.isLoggedIn);
    },
    isAnonymous: state => {
      return state.isLoggedIn === false;
    }
  },
  mutations: {
    registerStart(state) {
      state.isSubmitting = true;
      state.validationErrors = null;
    },
    registerSuccess(state, payload) {
      state.isSubmitting = false;
      state.currentUser = payload;
      state.isLoggedIn = true;
    },
    registerFailure(state, payload) {
      state.isSubmitting = false;
      state.validationErrors = payload;
    },
    loginStart(state) {
      state.isSubmitting = true;
      state.validationErrors = null;
    },
    loginSuccess(state, payload) {
      state.isSubmitting = false;
      state.currentUser = payload;
      state.isLoggedIn = true;
    },
    loginFailure(state, payload) {
      state.isSubmitting = false;
      state.validationErrors = payload;
    },
    updateCurrentUserStart(state) {
      state.isSubmitting = true;
      state.validationErrors = null;
    },
    updateCurrentUserSuccess(state, payload) {
      state.isSubmitting = false;
      state.currentUser = payload;
    },
    updateCurrentUserFailure(state, payload) {
      state.isSubmitting = false;
      state.validationErrors = payload;
    },
    logout(state) {
      state.currentUser = null;
      state.isLoggedIn = false;
    }
  },
  actions: {
    async register({ commit }, credentials) {
      try {
        commit('registerStart');
        const response = await authApi.register(credentials);
        commit('registerSuccess', response.data.user);
        setItem('accessToken', response.data.user.token);
        return response.data.user;
      } catch (result) {
        commit('registerFailure', result);
      }
    },
    async login({ commit }, credentials) {
      try {
        commit('loginStart');
        const response = await authApi.login(credentials);
        commit('loginSuccess', response.data.user);
        setItem('accessToken', response.data.user.token);
        return response.data.user;
      } catch (result) {
        commit('loginFailure', result);
      }
    },

    async updateCurrentUser({ commit }, { currentUserInput }) {
      try {
        commit('updateCurrentUserStart');
        const user = await authApi.updateCurrentUser(currentUserInput);
        commit('updateCurrentUserSuccess', user);
        return user;
      } catch (result) {
        commit('updateCurrentUserFailure', result);
      }
    },
    async logout({ commit }) {
      setItem('accessToken', '');
      commit('logout');
    }
  }
};
