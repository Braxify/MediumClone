import axios from '@/api/axios';

export default {
  getArticle: slug =>
    axios.get(`/articles/${slug}`).then(response => response.data.article),
  deleteArticle: slug => axios.delete(`/articles/${slug}`),
  createArticle: articleInput =>
    axios
      .post('/articles', { article: articleInput })
      .then(response => response.data.article),
  updateArticle: (slug, articleInput) =>
    axios
      .put(`/articles/${slug}`, { article: articleInput })
      .then(response => response.data.article)
};
