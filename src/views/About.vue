<i18n>
{
  "fr": {
    "viewTitle": "A propos",
    "viewDescription": "Page en cours de contruction"
  },
  "en": {
    "viewTitle": "About",
    "viewDescription": "Page under contruction"
  }
}
</i18n>

<template>
  <div class="about">
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

