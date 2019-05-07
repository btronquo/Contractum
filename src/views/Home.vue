<i18n>
{
  "fr": {
    "viewTitle": "Accueil",
    "viewDescription": "Bienvenue Citoyen."
  },
  "en": {
    "viewTitle": "Home",
    "viewDescription": "Welcome Citizen."
  }
}
</i18n>

<template>
  <div class="home">
    <v-container class="my-5">
      <h1>{{ $t('viewTitle') }}</h1>
      <v-layout row>
        <v-flex xs12 md6>
          <p>{{ $t('viewDescription') }}</p>
        </v-flex>
      </v-layout>
    </v-container>
  </div>
</template>

<script>


  export default {
    components: {

    }
  }
</script>
