<i18n>
{
  "fr": {
    "viewTitle": "Panneau de controle",
    "viewDescription": "Ici, le panneau de controle"
  },
  "en": {
    "viewTitle": "Dashboard",
    "viewDescription": "Here, the dashboard"
  }
}
</i18n>

<template>
  <div class="dashboard">
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
