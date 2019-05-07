<i18n>
{
  "fr": {
    "viewTitle": "Creer un compte",
    "viewDescription": "Utilisez le formulaire suivant pour vous connecter",
    "labelEmail": "Email",
    "labelPassword": "Mot de passe",
    "labelPasswordConfirm": "Confirmer le mot de passe",
    "btnSignUp": "Creer un compte",
    "btnSignUpWithGoogle": "Avec Google",
    "linkMember": "Déjà inscrit?",
    "or": "ou"
  },
  "en": {
    "viewTitle": "Register",
    "viewDescription": "Use the form bellow to sign-in",
    "labelEmail": "Email",
    "labelPassword": "Password",
    "labelPasswordConfirm": "Confirm password",
    "btnSignUp": "Register",
    "btnSignUpwithGoogle": "With Google",
    "linkMember": "Already a member?",
    "or": "or"
  }
}
</i18n>

<template>
  <div class="signup">

    <v-container class="my-5">
      <h1>{{ $t('viewTitle') }}</h1>
      <v-layout row>
      <v-flex xs12 md6>
        <p>{{ $t('viewDescription') }}</p>
      </v-flex>
        <form @submit.prevent="onSignup">
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
            autocomplete="off"
            required
          >
          </v-text-field>

          <v-text-field
            v-model="confirmPassword"
            :label="$t('labelPasswordConfirm')"
            type="password"
            autocomplete="off"
            required
          >
          </v-text-field>
          <div class="text-xs-center">
            <v-btn type="submit" :disabled="loading" :loading="loading">
              {{ $t('btnSignUp') }}
              <v-icon right>lock_open</v-icon>
              <span slot="loader" class="custom-loader">
                <v-icon light>cached</v-icon>
                </span>
            </v-btn>
          </div>

          <v-flex>
                  <p class="text-md-center">{{ $t('or') }}</p>
          </v-flex>
          <div class="text-xs-center">
            <v-btn color="blue" dark :disabled="loading" :loading="loading" @click.prevent="onSigninGoogle">
              {{ $t('btnSignUpWithGoogle') }}
              <v-icon right dark>lock_open</v-icon>
                <span slot="loader" class="custom-loader">
              <v-icon light>cached</v-icon>
              </span>
            </v-btn>
          </div>
          <p><router-link to="login">{{ $t('linkMember') }}</router-link></p>
        </form>
    </v-layout>
  </v-container>
  </div>
</template>

<script>
export default {
  data () {
    return {
      email: '',
      password: '',
      confirmPassword: ''
    }
  },
  computed: {
    comparePasswords () {
      return this.password !== this.confirmPassword ? 'Passwords do not match' : ''
    },
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
    onSignup () {
      this.$store.dispatch('signUserUp', {email: this.email, password: this.password})
    },
    onSigninGoogle () {
      this.$store.dispatch('signUserInGoogle')
    }
  }
}
</script>