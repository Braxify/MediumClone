<template>
  <nav class="navbar navbar-light">
    <div class="container">
      <router-link class="navbar-brand" tag="a" :to="{ name: 'globalFeed' }">
        Medium Clone
      </router-link>
      <ul class="nav navbar-nav pull-xs-right">
        <li class="nav-item">
          <router-link
            :to="{ name: 'globalFeed' }"
            tag="a"
            class="nav-link"
            exact
            active-class="active"
            >Home</router-link
          >
        </li>
        <template v-if="isLoggedIn && currentUser">
          <li class="nav-item">
            <router-link
              :to="{ name: 'createArticle' }"
              tag="a"
              class="nav-link"
              exact
              active-class="active"
            >
              <i class="ion-compose"></i> New Article
            </router-link>
          </li>
          <li class="nav-item">
            <router-link
              :to="{ name: 'settings' }"
              tag="a"
              class="nav-link"
              exact
              active-class="active"
            >
              <i class="ion-gear-a"></i> Settings
            </router-link>
          </li>
          <li class="nav-item">
            <router-link
              :to="{
                name: 'userProfile',
                params: { slug: currentUser.username }
              }"
              tag="a"
              class="nav-link"
              exact
              active-class="active"
            >
              <img
                :src="currentUser.image"
                v-if="currentUser.image"
                class="user-pic"
                alt=""
              />
              &nbsp;
              {{ currentUser.username }}
            </router-link>
          </li>
        </template>
        <template v-if="isAnonymous">
          <li class="nav-item">
            <router-link
              :to="{ name: 'login' }"
              tag="a"
              class="nav-link"
              exact
              active-class="active"
              >Sign In</router-link
            >
          </li>
          <li class="nav-item">
            <router-link
              :to="{ name: 'register' }"
              tag="a"
              class="nav-link"
              exact
              active-class="active"
              >Sign Up</router-link
            >
          </li>
        </template>
      </ul>
    </div>
  </nav>
</template>

<script>
import { mapGetters } from 'vuex';
export default {
  name: 'Navbar',
  computed: {
    ...mapGetters({
      currentUser: 'auth/currentUser',
      isLoggedIn: 'auth/isLoggedIn',
      isAnonymous: 'auth/isAnonymous'
    })
  }
};
</script>

<style></style>
