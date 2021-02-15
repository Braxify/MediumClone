import axios from 'axios';
import { getItem } from '@/helpers/persistentStorage';
import store from '@/store';

axios.defaults.baseURL = 'https://conduit.productionready.io/api';
axios.interceptors.request.use(config => {
  const token = getItem('accessToken');
  const authToken = token ? `Token ${token}` : '';
  config.headers.Authorization = authToken;
  return config;
});
axios.interceptors.response.use(
  response => response,
  async error => {
    if (error.response.status === 401) {
      store.dispatch('auth/logout');
    }
    return Promise.reject(error.response.data.errors);
  }
);

export default axios;
