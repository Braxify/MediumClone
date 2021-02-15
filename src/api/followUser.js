import axios from '@/api/axios';

export default {
  followUser: slug =>
    axios
      .post(`/profiles/${slug}/follow`)
      .then(response => response.data.profile),
  unfollowUser: slug =>
    axios
      .delete(`/profiles/${slug}/follow`)
      .then(response => response.data.profile)
};
