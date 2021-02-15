import axios from '@/api/axios';

export default {
  getFeed: apiUrl => {
    return axios.get(apiUrl);
  }
};
