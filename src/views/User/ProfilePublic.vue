<i18n>
{
  "fr": {
    "viewTitle": "Profile publique",
    "viewDescription": "Profile de: ",
    "errUserNotSet": "Cet utilisateur n'a pas encore défini son pseudo",
    "errAvatarNotSet": "Cet utilisateur n'a pas encore défini son avatar"
  },
  "en": {
    "viewTitle": "Public profile",
    "viewDescription": "This is the profile of:",
    "errUserNotSet": "This user has not set his username yet",
    "errAvatarNotSet": "This user has not set his avatar"
  }
}
</i18n>

<template>
  <div class="about">
    <v-container class="my-5">
      <h1>{{ $t('viewTitle') }}</h1>
      <v-layout row>
      <v-flex xs12 md6>
        <p>{{ $t('viewDescription') }} <b>{{ user.scUsername }}</b></p>
          <ul>
            <li>Username: {{ user.scUsername ? user.scUsername : $t('errUserNotSet') }}</li>
            <li>Avatar: {{ user.avatar ? user.avatar : $t('errAvatarNotSet') }}</li>
            <li>RSI profile: {{ user.scUsername ? rsiUrl + user.scUsername : $t('errUserNotSet') }}</li>
          </ul>
      </v-flex>
      </v-layout>
    </v-container>
  </div>
</template>

<script>
import { db } from '@/fb'
export default {
  data () {
    return {
      user: {},
      rsiUrl: 'https://robertsspaceindustries.com/citizens/'
    }
  },
  methods: {
  },
  firestore () {
  return {
    user: db.collection('users').doc(this.$route.params.id) 
  }
}
}
</script>
