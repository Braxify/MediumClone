import axios from '@/api/axios';

export default {
  getUserProfile: slug =>
    axios.get(`/profiles/${slug}`).then(response => response.data.profile)
};
