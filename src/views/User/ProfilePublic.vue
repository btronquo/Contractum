<i18n>
{
  "fr": {
    "viewTitle": "Profile publique",
    "viewDescription": "Profile de: "
  },
  "en": {
    "viewTitle": "Public profile",
    "viewDescription": "This is the profile of:"
  }
}
</i18n>

<template>
  <div class="about">
    <v-container class="my-5">
      <h1>{{ $t('viewTitle') }}</h1>
      <v-layout row>
      <v-flex xs12 md6>
        <p>{{ $t('viewDescription') }} <b>{{ $route.params.scUsername }}</b></p>
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
