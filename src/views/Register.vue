<template>
  <div class="auth-page">
    <div class="container page">
      <div class="row">
        <div class="col-md-6 offset-md-3 col-xs-12">
          <h1 class="text-xs-center">Sign Up</h1>
          <p class="text-xs-center">
            <router-link :to="{ name: 'login' }">Have an account?</router-link>
          </p>
          <ValidationErrors
            v-if="validationErrors"
            :validation-errors="validationErrors"
          />
          <form @submit.prevent="onSubmit">
            <fieldset class="form-group">
              <input
                type="text"
                placeholder="Username"
                v-model="username"
                class="form-control form-control-lg"
              />
            </fieldset>
            <fieldset class="form-group">
              <input
                type="text"
                placeholder="Email"
                v-model="email"
                class="form-control form-control-lg"
              />
            </fieldset>
            <fieldset class="form-group">
              <input
                type="password"
                placeholder="Password"
                v-model="password"
                class="form-control form-control-lg"
              />
            </fieldset>
            <button
              class="btn btn-lg btn-primary pull-xs-right"
              :disabled="isSubmitting"
            >
              Sign Up
            </button>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ValidationErrors from '@/components/ValidationErrors';
import { mapActions, mapState } from 'vuex';

export default {
  name: 'Register',
  components: {
    ValidationErrors
  },
  data() {
    return {
      email: '',
      username: '',
      password: ''
    };
  },
  computed: {
    ...mapState({
      isSubmitting: state => state.auth.isSubmitting,
      validationErrors: state => state.auth.validationErrors
    })
  },
  methods: {
    ...mapActions({
      register: 'auth/register'
    }),
    onSubmit() {
      this.register({
        email: this.email,
        username: this.username,
        password: this.password
      });
    }
  }
};
</script>
