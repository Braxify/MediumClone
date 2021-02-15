import axios from '@/api/axios';

export default {
  getPopularTags: () => axios.get('/tags').then(response => response.data.tags)
};
