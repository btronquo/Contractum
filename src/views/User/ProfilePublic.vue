<i18n>
{
  "fr": {
    "viewTitle": "Profil public",
    "viewDescription": "Page en cours de contruction"
  },
  "en": {
    "viewTitle": "About",
    "viewDescription": "Page under contruction"
  }
}
</i18n>

<template>
  <div class="public">
    <v-container class="my-5">
      <h1>{{ $t('viewTitle') }}</h1>
      <v-layout row>
      <v-flex xs12 md6>
        <p>{{ $t('viewDescription') }}</p>
      </v-flex>
      </v-layout>
      <v-layout row>
        <v-flex xs12 md6>
          <p>le profile public est sur la route: {{ $route.params.scusername }}</p>
        </v-flex>
      </v-layout>
    </v-container>
  </div>
</template>

<script>
export default {
  data () {
    return {
    }
  }
}
</script>
