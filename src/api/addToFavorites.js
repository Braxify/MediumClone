import axios from '@/api/axios';

export default {
  addToFavorites: slug => {
    return axios
      .post(`/articles/${slug}/favorite`)
      .then(response => response.data.article);
  },
  removeFromFavorites: slug => {
    return axios
      .delete(`/articles/${slug}/favorite`)
      .then(response => response.data.article);
  }
};
