<template>
  <button
    v-if="currentUser && currentUser.username !== userProfileSlug"
    :class="{
      btn: true,
      'btn-sm': true,
      'action-btn': true,
      'btn-outline-secondary': !isFollowedOpt,
      'btn-secondary': isFollowedOpt
    }"
    @click="handleFollowUser"
  >
    <i class="ion-plus-round"></i>
    &nbsp; {{ isFollowedOpt ? 'Unfollow' : 'Follow' }}
    {{ userProfileSlug }}
  </button>
</template>

<script>
import { mapActions } from 'vuex';
export default {
  name: 'FollowUser',
  props: {
    userProfileSlug: {
      type: String,
      required: true
    },
    currentUser: {
      type: Object,
      required: true
    },
    isFollowed: {
        type: Boolean,
        required: true
    }
  },
  data() {
    return {
      isFollowedOpt: this.isFollowed
    };
  },
  methods: {
    ...mapActions({
      followUser: 'followUser/followUser'
    }),
    handleFollowUser() {
      this.followUser({
        slug: this.userProfileSlug,
        isFollowed: this.isFollowedOpt
      });
      this.isFollowedOpt = !this.isFollowedOpt;
    }
  }
};
</script>

<style></style>
