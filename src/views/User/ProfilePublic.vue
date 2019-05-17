<i18n>
{
  "fr": {
    "viewTitle": "Profile publique",
    "viewDescription": "Profile de: ",
    "errUserNotSet": "Cet utilisateur n'a pas encore défini son pseudo",
    "errAvatarNotSet": "Cet utilisateur n'a pas encore défini son avatar",
    "labelUsername": "Pseudo",
    "labelAvatar": "Avatar",
    "labelRsiProfile": "Profil RSI"
  },
  "en": {
    "viewTitle": "Public profile",
    "viewDescription": "This is the profile of:",
    "errUserNotSet": "This user has not set his username yet",
    "errAvatarNotSet": "This user has not set his avatar",
    "labelUsername": "Username",
    "labelAvatar": "Avatar",
    "labelRsiProfile": "RSI profile"
  }
}
</i18n>

<template>
  <div class="about">
    <v-container class="my-5">
      <h1>{{ $t('viewTitle') }}</h1>
      <v-layout row>
      <v-flex xs12 md6>
        <p>{{ $t('viewDescription') }} <b>{{ userPublic.scUsername }}</b></p>
          <ul>
            <li>{{ $t('labelUsername') }}: {{ userPublic.scUsername ? userPublic.scUsername : $t('errUserNotSet') }}</li>
            <li>{{ $t('labelAvatar') }}: {{ userPublic.avatar ? userPublic.avatar : $t('errAvatarNotSet') }}</li>
            <li>{{ $t('labelRsiProfile') }}: {{ userPublic.scUsername ? rsiUrl + userPublic.scUsername : $t('errUserNotSet') }}</li>
          </ul>
      </v-flex>
      </v-layout>
    </v-container>
  </div>
</template>

<script>
import { db } from '@/fb'
import { mapState } from 'vuex'

export default {
  data () {
    return {
      userPublic: {},
      rsiUrl: 'https://robertsspaceindustries.com/citizens/'
    }
  },
  computed: {
    user () {
      return this.$store.getters.user
    },
    ...mapState(['profile'])
  },
  methods: {
  },
  firestore () {
  return {
    userPublic: db.collection('users').doc(this.$route.params.id) 
  }
}
}
</script>
