<i18n>
{
  "fr": {
    "viewTitle": "Evenements",
    "ruleFieldRequired": "Obligatoire",
    "ruleTextTooLong": "Texte trop long",
    "formLabelTitle": "Titre*",
    "formLabelParticipants": "Participants*",
    "formLabelTags": "Tags",
    "formLabelStartDate": "Démarre le*",
    "formLabelStartTime": "Démarre à*",
    "formLabelImgCoverUrl": "Illustration (url)",
    "formLabelDescription": "Description*",
    "formBtnCancel": "Annuler",
    "formBtnCreate": "Creer",
    "btnModalEventCreate": "Creer un évenement",
    "modalLabelEventCreate": "Creer un évenement"
  },
  "en": {
    "viewTitle": "Events",
    "ruleFieldRequired": "Mandatory",
    "ruleTextTooLong": "Text too long",
    "formLabelTitle": "Title",
    "formLabelParticipants": "Participants",
    "formLabelTags": "Tags",
    "formLabelStartDate": "Start on",
    "formLabelStartTime": "Start time",
    "formLabelImgCoverUrl": "Illustration (url)",
    "formLabelDescription": "Description",
    "formBtnCancel": "Cancel",
    "formBtnCreate": "Create",
    "btnModalEventCreate": "Create event",
    "modalLabelEventCreate": "Create event"
  }
}
</i18n>

<template>
  <div class="dashboard">
    <v-container class="my-5">
      <h1>{{ $t('viewTitle') }}</h1>
      <v-layout row wrap>

      <!-- event -->
      <v-flex xs12 sm6 offset-sm3>

        <v-card class="my-3" hover data-aos="zoom-in" data-aos-easing="ease" 
          v-for="(event) in events" :key="event.id"
        >
          <v-img
          
          height="100px"
          src="https://i.imgur.com/8hCwS54.jpg"
        >

          <v-container fill-height fluid>
            <v-layout row wrap>

              <v-flex xs12 md-12 align-end d-flex class="transparent">
                <span class="headline font-weight-bold text-uppercase text-xs-center">{{ event.name }} </span>
              </v-flex>
              <v-flex xs12 md-12 align-end d-flex class="pl-2 white--text blue-grey lighten-1 font-weight-medium">
                {{ event.startAt.seconds | moment("dddd-MM @ HH:mm") }}
              </v-flex>

            </v-layout>
          </v-container>
          </v-img>
          <v-card-text pa-5>
            <p>
              Début: 
            </p>
            <p>
              {{ event.description }}
            </p>
            
          </v-card-text>
          <v-card-actions>
            <v-chip color="indigo" text-color="white">
              <v-avatar>
                <v-icon>account_circle</v-icon>
              </v-avatar>
              Luicid
            </v-chip>
              <v-spacer></v-spacer>

              <!-- share on -->
              <!-- <v-btn icon class="red--text">
                <v-icon small>reddit</v-icon>
              </v-btn>
              <v-btn icon class="light-blue--text">
                <v-icon small>twitter</v-icon>
              </v-btn>
              <v-btn icon class="blue--text text--darken-4">
                <v-icon small>facebook</v-icon>
              </v-btn> -->

              <v-spacer></v-spacer>

              <v-btn small replace color="info"  target="_blank" >Voir plus</v-btn>
            </v-card-actions>
          </v-card>
      </v-flex>
      <!-- ./event -->

      <!-- dialog -->
      <v-layout row justify-center>
        <v-dialog v-model="dialog" persistent max-width="600px">

          <template v-slot:activator="{ on }">
            <v-btn color="primary" dark v-on="on">{{ $t('btnModalEventCreate' )}}</v-btn>
          </template>


          
          <v-form
            ref="formEventAdd"
            v-model="valid"
            lazy-validation
          >
            <v-card>
              <v-card-title>
                <span class="headline">{{ $t('modalLabelEventCreate') }}</span>
              </v-card-title>
              <v-card-text>
                <v-container grid-list-md>
                  <v-layout wrap>
                      <v-flex xs6>
                        <v-text-field 
                          :rules="rules.rulesFormTitle"
                          :counter="30"
                          v-model="eventForm.title"
                          :label="$t('formLabelTitle')" 
                          hint="La bataille de la barbe bleue.."
                          required
                        ></v-text-field>
                      </v-flex>
                      <v-flex xs3>
                        <v-text-field 
                          v-model="eventForm.participantsMax"
                          :rules="rules.rulesFormParticipants"
                          :label="$t('formLabelParticipants')" 
                          type="number"
                          hint="Nombre max de participants"
                          required
                        ></v-text-field>
                      </v-flex>

                      <v-flex xs3>
                        <v-autocomplete
                          :items="['Otage', 'Secours', 'Ecorte', 'Autre']"
                          :label="$t('formLabelTags')"
                          multiple
                          v-model="eventForm.tags"
                          no-data-text="empty"
                          required
                        ></v-autocomplete>
                      </v-flex>

                      




                      <v-flex xs6 md-6>
                        <v-menu>
                          <v-text-field 
                            slot="activator" 
                            :label="$t('formLabelStartDate')" 
                            prepend-icon="date_range" 
                            :value="formattedDate"
                            :rules="rules.rulesFormStartAtDate"
                            readonly
                            required
                          >
                          </v-text-field>
                          <v-date-picker
                            v-model="eventForm.date"
                            locale="fr"
                            scrollable
                            transition="scale-transition"
                          >
                          </v-date-picker>
                        </v-menu>
                      </v-flex>

                      <v-flex xs6 md-6>
                        <v-menu
                          ref="menu"
                          :close-on-content-click="false"
                          lazy
                        >
                          <v-text-field
                            slot="activator"
                            v-model="eventForm.time"
                            :rules="rules.rulesFormStartAtTime"
                            :label="$t('formLabelStartTime')"
                            prepend-icon="access_time"
                            readonly
                            required
                          ></v-text-field>
                          <v-time-picker
                            v-model="eventForm.time"
                            format="24hr"
                            full-width
                            @click:minute="$refs.menu.save(time)"
                          ></v-time-picker>
                        </v-menu>
                      </v-flex>
                      <v-flex xs12>
                        <v-text-field
                          :label="$t('formLabelImgCoverUrl')"
                          hint="exemple: https://mon-image/blabla.jpg"
                          v-model="eventForm.Imgurl"
                        ></v-text-field>
                      </v-flex>
                      <v-flex xs12 sm12>
                        <v-textarea
                          name="input-3-1"
                          :label="$t('formLabelDescription')"
                          hint="Entrez une description pour cet évenement"
                          :counter="350"
                          :rules="rules.rulesFormDescription"
                          v-model="eventForm.description"
                          rows="2"
                        >
                        </v-textarea>
                      </v-flex> 
                            
                  </v-layout>
                </v-container>
                <small>*Obligatoire</small>
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="red darken-1" flat @click="dialog = false">{{ $t('formBtnCancel') }}</v-btn>
                <v-btn color="blue darken-1" flat @click="onSubmitEvent" :disabled="!valid">{{ $t('formBtnCreate') }}</v-btn>
              </v-card-actions>
            </v-card>
          </v-form>
        </v-dialog>
      </v-layout>
      <!-- ./dialog -->

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

