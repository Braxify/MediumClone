<template>
  <button
    @click="handleLike"
    :class="{
      btn: true,
      'btn-sm': true,
      'btn-primary': isFavoritedOpt,
      'btn-outline-primary': !isFavoritedOpt
    }"
  >
    <i class="ion-heart"></i>
    <span>&nbsp; {{ favoritesCountOpt }}</span>
  </button>
</template>

<script>
import { mapActions } from 'vuex';
export default {
  name: 'AddToFavorites',
  props: {
    isFavorited: {
      type: Boolean,
      required: true
    },
    articleSlug: {
      type: String,
      required: true
    },
    favoritesCount: {
      type: Number,
      required: true
    }
  },
  data() {
    return {
      isFavoritedOpt: this.isFavorited,
      favoritesCountOpt: this.favoritesCount
    };
  },
  methods: {
    ...mapActions({
      addToFavorites: 'addToFavorites/addToFavorites'
    }),
    handleLike() {
      this.addToFavorites({
        slug: this.articleSlug,
        isFavorited: this.isFavoritedOpt
      });
      if (this.isFavoritedOpt) {
        this.favoritesCountOpt--;
      } else {
        this.favoritesCountOpt++;
      }
      this.isFavoritedOpt = !this.isFavoritedOpt;
    }
  }
};
</script>

<style></style>
