import axios from '@/api/axios';

export default {
  register: credentials => {
    return axios.post('/users', { user: credentials });
  },
  login: credentials => {
    return axios.post('/users/login', { user: credentials });
  },
  getCurrentUser: () => {
    return axios.get('/user');
  },
  updateCurrentUser: currentUserInput => {
    return axios
      .put('/user', { user: currentUserInput })
      .then(response => response.data.user);
  }
};
