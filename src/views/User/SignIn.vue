<i18n>
{
  "fr": {
    "viewTitle": "Connection",
    "viewDescription": "Utilisez le formulaire suivant pour vous connecter",
    "labelEmail": "Email",
    "labelPassword": "Mot de passe",
    "btnSignIn": "Se connecter",
    "btnSignInWithGoogle": "Avec Google",
    "linkNotMember": "Pas encore membre?"
  },
  "en": {
    "viewTitle": "Login",
    "viewDescription": "Use the form bellow to sign-in",
    "labelEmail": "Email",
    "labelPassword": "Password",
    "btnSignIn": "Sign In",
    "btnSignInWithGoogle": "With Google",
    "linkNotMember": "Not a member?"
  }
}
</i18n>

<template>
  <div class="login">

    <v-container class="my-5">
      <h1>{{ $t('viewTitle') }}</h1>
      <v-layout row>
      <v-flex xs12 md6>
        <p>{{ $t('viewDescription') }}</p>
      </v-flex>
        <form @submit.prevent="onSignin">
          <v-text-field
            v-model="email"
            :label="$t('labelEmail')"
            type="email"
            autocomplete="on"
            required
          >
          </v-text-field>

          <v-text-field
            v-model="password"
            :label="$t('labelPassword')"
            type="password"
            autocomplete="current-password"
            required
          >
          </v-text-field>
          <v-btn type="submit" :disabled="loading" :loading="loading">
            {{ $t('btnSignIn') }}
            <v-icon right>lock_open</v-icon>
            <span slot="loader" class="spin">
              <v-icon light>cached</v-icon>
              </span>
          </v-btn>

          <div class="text-xs-center">
            <v-btn color="red" dark :disabled="loading" :loading="loading" @click.prevent="onSigninGoogle">
              {{ $t('btnSignInWithGoogle') }}
              <v-icon right dark>lock_open</v-icon>
              <span slot="loader" class="spin">
                <v-icon light>cached</v-icon>
              </span>
            </v-btn>
          </div>
          <p><router-link to="signup">{{ $t('linkNotMember') }}</router-link></p>
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