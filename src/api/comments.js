import axios from '@/api/axios';

export default {
  getComments: slug => {
    return axios
      .get(`/articles/${slug}/comments`)
      .then(response => response.data.comments);
  },
  deleteComment: (slug, commentId) => {
    return axios.delete(`/articles/${slug}/comments/${commentId}`).then();
  },
  createComment: (slug, commentInput) =>
    axios
      .post(`/articles/${slug}/comments`, { comment: commentInput })
      .then(response => response.data.comment)
};
