<template>
  <div>
    <Loading v-if="isLoading" />
    <Error v-if="error" />

    <div class="sidebar" v-if="popularTags">
      <p>Popular Tags</p>
      <div class="tag-list">
        <router-link
          class="tag-default tag-pill"
          v-for="popularTag in popularTags"
          :key="popularTag"
          :to="{ name: 'tag', params: { slug: popularTag } }"
        >
          {{ popularTag }}
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex';
import Loading from '@/components/Loading';
import Error from '@/components/Error';
export default {
  name: 'PopularTags',
  components: {
    Loading,
    Error
  },
  computed: {
    ...mapState({
      isLoading: state => state.popularTags.isLoading,
      popularTags: state => state.popularTags.data,
      error: state => state.popularTags.error
    })
  },
  methods: {
    ...mapActions({
      getPopularTags: 'popularTags/getPopularTags'
    }),
    fetchPopularTags() {
      this.getPopularTags();
    }
  },
  mounted() {
    this.fetchPopularTags();
  }
};
</script>

<style></style>
