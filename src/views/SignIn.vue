<template>
  <div class="login">

    <v-container class="my-5">
      <h1>Login</h1>
      <v-layout row>
      <v-flex xs12 md6>
        <p>Use the form bellow to authenticate</p>
      </v-flex>
        <form @submit.prevent="onSignin">
          <v-text-field
            v-model="email"
            label="E-mail"
            type="email"
            autocomplete="on"
            required
          >
          </v-text-field>

          <v-text-field
            v-model="password"
            label="Password"
            type="password"
            autocomplete="current-password"
            required
          >
          </v-text-field>
          <v-btn type="submit" :disabled="loading" :loading="loading">
            Sign in
            <v-icon right>lock_open</v-icon>
            <span slot="loader" class="custom-loader">
              <v-icon light>cached</v-icon>
              </span>
          </v-btn>

          <div class="text-xs-center">
                      <v-btn color="red" dark :disabled="loading" :loading="loading" @click.prevent="onSigninGoogle">Sign In with Google
                        <v-icon right dark>lock_open</v-icon>
                        <span slot="loader" class="custom-loader">
                        <v-icon light>cached</v-icon>
                       </span>
                      </v-btn>
                    </div>
                    <div class="text-xs-center">
                      <v-btn color="primary" dark :disabled="loading" :loading="loading" @click.prevent="onSigninFacebook">Sign In with Facebook
                        <v-icon right dark>lock_open</v-icon>
                        <span slot="loader" class="custom-loader">
                        <v-icon light>cached</v-icon>
                       </span>
                      </v-btn>
                    </div>

          <p><router-link to="signup">Not a member?</router-link></p>
        </form>
    </v-layout>
  </v-container>
  </div>
</template>

<script>
export default {
  name: 'login',
  data: function() {
    return {
      email: '',
      password: ''
    }
  },
  computed: {
    user () {
      return this.$store.getters.user
    },
    error () {
      return this.$store.getters.error
    },
    loading () {
      return this.$store.getters.loading
    }
  },
  watch: {
    user (value) {
      if (value !== null && value !== undefined) {
        this.$router.push('/profile')
      }
    }
  },
  methods: {
    onSignin () {
      this.$store.dispatch('signUserIn', {email: this.email, password: this.password})
    },
    onSigninGoogle () {
      this.$store.dispatch('signUserInGoogle')
    },
    onSigninFacebook () {
      this.$store.dispatch('signUserInFacebook')
    },
    onResetPassword () {
      if (this.email === '') {
        return this.$store.dispatch('setError', {message: 'Email can not be blank'})
      }
      this.$store.dispatch('resetPasswordWithEmail', {email: this.email})
    },
    onDismissed () {
      this.$store.dispatch('clearError')
    }
  }
}
</script>