<i18n>
{
  "fr": {
    "viewTitle": "Perdu?",
    "viewDescription": "Ne paniquez pas, tout est sous controle! ;)",
    "btnBackToDashboard": "Retourner sur le panneau de controle",
    "btnBackToHome": "Retourner sur l'accueil"
  },
  "en": {
    "viewTitle": "Lost?",
    "viewDescription": "Don't panic, everything is under control! ;)",
    "btnBackToDashboard": "Back to dashboard",
    "btnBackToHome": "Back to home"
  }
}
</i18n>

<template>
  <div class="about">
    <v-container class="my-5">
      <h1>{{ $t('viewTitle') }}</h1>
      <v-layout row>
      <v-flex xs12 md6>
        <h2>{{ $t('viewDescription') }}</h2>

        <v-flex v-if="isAuthenticated === true" xs6 md6>
          <v-btn
          to="/dashboard">
            {{ $t('btnBackToDashboard') }}
          </v-btn>
        </v-flex>

        <v-flex v-else xs6 md6>
          <v-btn
          to="/">
            {{ $t('btnBackToHome') }}
          </v-btn>
        </v-flex>

      </v-flex>
      </v-layout>
    </v-container>
  </div>
</template>

<script>
export default {
  computed: {
    isAuthenticated () {
      return this.$store.getters.isAuthenticated
    }
  }
}
</script>