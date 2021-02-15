<template>
  <div id="app">
    <Header />
    <router-view></router-view>
    <Footer />
  </div>
</template>

<script>
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { mapGetters } from 'vuex';
export default {
  components: {
    Header,
    Footer
  },
  computed: {
    ...mapGetters({
      currentUser: 'auth/currentUser'
    })
  },
  methods: {},

  watch: {
    currentUser(status) {
      if (!status) {
        this.$router.push({ name: 'login' });
      } else {
        if (this.$route.path !== '/') {
          this.$router.push({ name: 'globalFeed' });
        }
      }
    }
  }
};
</script>
