<template>
  <div>
    <Loading v-if="isLoading" />
    <Error v-if="error" />
    <div v-if="feed">
      <div
        class="article-preview"
        v-for="(article, idx) in feed.articles"
        :key="idx"
      >
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
              class="author"
            >
              {{ article.author.username }}
            </router-link>
            <time class="date">{{ article.createdAt.slice(0, 10) }}</time>
          </div>
          <div class="pull-xs-right">
            <AddToFavorites
              v-if="currentUser"
              :isFavorited="article.favorited"
              :articleSlug="article.slug"
              :favoritesCount="article.favoritesCount"
            />
          </div>
        </div>
        <router-link
          :to="{ name: 'article', params: { slug: article.slug } }"
          class="preview-link"
        >
          <h1>{{ article.title }}</h1>
          <p>{{ article.description }}</p>
          <span>Read more</span>
          <Tags v-if="article.tagList" :tags="article.tagList" />
        </router-link>
      </div>
      <Pagination
        :total="feed.articlesCount"
        :limit="limit"
        :currentPage="currentPage"
        :url="baseUrl"
      />
    </div>
    <div v-if="feed">
      <div v-if="!feed.articlesCount">No articles are here... yet.</div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters, mapState } from 'vuex';
import { limit } from '@/helpers/constants';
import { stringify, parseUrl } from 'query-string';
import Pagination from '@/components/Pagination';
import Loading from '@/components/Loading';
import Error from '@/components/Error';
import Tags from '@/components/Tags';
import AddToFavorites from '@/components/AddToFavorites';

export default {
  name: 'Feed',
  components: { Pagination, Loading, Error, Tags, AddToFavorites },
  props: {
    feedUrl: {
      type: String,
      required: true
    }
  },
  computed: {
    ...mapState({
      isLoading: state => state.feed.isLoading,
      feed: state => state.feed.data,
      error: state => state.feed.error
    }),
    ...mapGetters({
      currentUser: 'auth/currentUser'
    }),
    currentPage() {
      return Number(this.$route.query.page || '1');
    },
    baseUrl() {
      return this.$route.path;
    },
    offset() {
      return this.currentPage * limit - limit;
    },
    limit() {
      return limit;
    }
  },
  watch: {
    currentPage() {
      this.fetchFeed();
    },
    feedUrl() {
      this.fetchFeed();
    }
  },

  methods: {
    ...mapActions({
      getFeed: 'feed/getFeed'
    }),
    fetchFeed() {
      const parsedUrl = parseUrl(this.feedUrl);
      const stringifiedParams = stringify({
        limit,
        offset: this.offset,
        ...parsedUrl.query
      });
      const feedUrlWithParams = `${parsedUrl.url}?${stringifiedParams}`;
      this.getFeed({ feedUrl: feedUrlWithParams });
    }
  },
  mounted() {
    this.fetchFeed();
  }
};
</script>

<style></style>
