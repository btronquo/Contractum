<i18n>
{
  "fr": {
    "viewTitle": "Dashboard",
    "alertBlanckPage": "Cette page est blanche"
  },
  "en": {
    "viewTitle": "Dashboard",
    "alertBlanckPage": "This page is blanck"
  }
}
</i18n>

<template>
  <div class="dashboard">
    <v-container class="my-5">
      <h1>{{ $t('viewTitle') }}</h1>
      <v-layout row wrap>
        <p>{{ $t('alertBlanckPage') }} ¯\_(ツ)_/¯</p>
      </v-layout>
    </v-container>
  </div>
</template>

<script>
import { db } from '@/fb'
import { mapState } from 'vuex'
import format from 'date-fns/format'


export default {
  data () {
    return {
      rsiUrl: 'https://robertsspaceindustries.com/citizens/',
      dialog: false,
      eventForm: {},
      events: {},
      time: null,
      valid: true,
      rules: {
        rulesFormTitle: [
          v => !!v || this.$t('ruleFieldRequired'),
          v => (v && v.length > 10) || 'Minimum 10 caraters'
        ],
        rulesFormParticipants: [
          v => !!v || this.$t('ruleFieldRequired'),
        ],
        rulesFormDescription: [
          v => !!v || this.$t('ruleFieldRequired'),
          v => (v && v.length <= 350) || this.$t('ruleTextTooLong')
        ],
        rulesFormStartAtDate: [
          v => !!v || this.$t('ruleFieldRequired'),
        ],
        rulesFormStartAtTime: [
          v => !!v || this.$t('ruleFieldRequired'),
        ]
      }
    }
  },
  computed: {
    formattedDate () {
      return this.eventForm.date ? format(this.eventForm.date, 'DD/MM/YYYY') : ''
    },
    user () {
      return this.$store.getters.user
    },
    ...mapState(['profile']),
  },
  methods: {
    onSubmitEvent() {
      if(this.$refs.formEventAdd.validate()) {
        console.log(this.eventForm)
        const eventForm = {
          ...this.eventForm,
          authorId: this.$store.getters.user.id
        }
        db.collection('events').add(eventForm)
        .then(() => {
          this.dialog = false
          this.eventForm = ''
        })
      }
    }
  },
  firestore () {
  return {
    events: db.collection('events')
  }
}
}
</script>

<style>
.transparent {
   background-color: white!important;
   opacity: 0.60;
   border-color: transparent!important;
 }
</style>

