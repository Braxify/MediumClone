<template>
  <div class="article-page">
    <div class="banner">
      <div class="container" v-if="article">
        <h1>{{ article.title }}</h1>
        <div class="article-meta">
          <router-link
            :to="{
              name: 'userProfile',
              params: { slug: article.author.username }
            }"
          >
            <img :src="article.author.image" alt="" />
          </router-link>
          <div class="info">
            <router-link
              :to="{
                name: 'userProfile',
                params: { slug: article.author.username }
              }"
            >
              {{ article.author.username }}
            </router-link>
            <span class="date">{{ article.createdAt.slice(0, 10) }}</span>
          </div>
          <span v-if="isAuthor">
            <router-link
              class="btn btn-outline-secondary btn-sm"
              :to="{ name: 'editArticle', params: { slug: article.slug } }"
            >
              <i class="ion-edit"></i>
              Edit article
            </router-link>
            &nbsp;
            <button
              class="btn btn-outline-danger btn-sm"
              @click="removeArticle"
            >
              <i class="ion-trash-a"></i>
              Delete article
            </button>
          </span>
          <span v-else>
            <FollowUser
              v-if="currentUser"
              :currentUser="currentUser"
              :userProfileSlug="article.author.username"
              :isFollowed="article.author.following"
            />
            
            &nbsp;
            <AddToFavorites
              v-if="currentUser"
              :isFavorited="article.favorited"
              :articleSlug="article.slug"
              :favoritesCount="article.favoritesCount"
            />
          </span>
        </div>
      </div>
    </div>
    <div class="container page">
      <Loading v-if="isLoading" />
      <Error v-if="error" :message="error" />
      <div class="row article-content" v-if="article">
        <div class="col-xs-12">
          <div>
            <p>{{ article.body }}</p>
          </div>
          <Tags v-if="article.tagList" :tags="article.tagList" />
        </div>
      </div>
      <hr />
      <Comments :articleSlug="articleSlug" />
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters, mapState } from 'vuex';
import Loading from '@/components/Loading';
import Error from '@/components/Error';
import Tags from '@/components/Tags';
import FollowUser from '@/components/FollowUser';
import AddToFavorites from '@/components/AddToFavorites';
import Comments from '@/components/Comments';
export default {
  name: 'Article',
  components: {
    Loading,
    Error,
    Tags,
    FollowUser,
    AddToFavorites,
    Comments
  },
  computed: {
    ...mapState({
      article: state => state.article.data,
      isLoading: state => state.article.isLoading,
      error: state => state.article.error
    }),
    ...mapGetters({ currentUser: 'auth/currentUser' }),
    isAuthor() {
      if (!this.currentUser || !this.article) {
        return false;
      }
      return this.currentUser.username === this.article.author.username;
    },
    articleSlug() {
      return this.$route.params.slug;
    }
  },

  mounted() {
    this.getArticle({
      slug: this.articleSlug
    });
  },
  methods: {
    ...mapActions({
      deleteArticle: 'article/deleteArticle',
      getArticle: 'article/getArticle'
    }),
    removeArticle() {
      if (window.confirm('Are you sure you want to delete the article?')) {
        this.deleteArticle({
          slug: this.articleSlug
        })
          .then(() => {
            this.$router.push({ name: 'globalFeed' });
          })
          .catch(() => {});
      }
    }
  }
};
</script>

<style></style>
