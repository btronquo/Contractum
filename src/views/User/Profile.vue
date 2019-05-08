<i18n>
{
  "fr": {
    "myProfile": "Mon Profil",
    "MsgAlertMissingUsername": "Vous n'avez pas encore mis à jour votre nom d'utilisateur StarCitizen. Merci de remplir le champs suivant",
    "btnSave": "Sauvegarder",
    "biography": "biographie",
    "labelScUsername": "Votre Pseudo Star Citizen",
    "labelBiography": "Entrez votre biographie"
  },
  "en": {
    "myProfile": "My Profile",
    "MsgAlertMissingUsername": "Your Star Citizen username is missing. Thanks to fill the text area bellow",
    "btnSave": "Save",
    "biography": "biography",
    "labelScUsername": "Your Star Citizen nickname",
    "labelBiography": "Enter your biography here"
  }
}
</i18n>

<template>
  <div class="myprofile">
    <v-container class="my-5">
      <h1>{{ $t('myProfile') }}</h1>
      <v-flex v-if="(!user.scUsername)" xs12 md12 >
        <v-alert
          :value="true"
          type="warning"
        >
          {{ $t('MsgAlertMissingUsername') }}
        </v-alert>
        <v-form>
          <v-text-field
            v-model="scUsername"
            :counter="15"
            :label="$t('labelScUsername')"
            required
          ></v-text-field>
          <v-btn
            color="success"
            @click="updateScUsername"
          >
            {{ $t('btnSave') }}
          </v-btn>
        </v-form>
      </v-flex>

        <v-layout row wrap>

          <v-flex xs2 md2>
            <!-- avatar -->
            <v-flex xs12 md12 pa-3>
              <v-avatar size="128" color="grey lighten-4">
                <img src="https://api.adorable.io/avatars/285/abott@adorable.png" alt="avatar">
              </v-avatar>
            </v-flex>
            <v-flex xs12 md12 pa-3>
              soon
            </v-flex>

          </v-flex>

          <v-flex xs9 md9>
            <v-flex xs12 md12 pa-3>
                <h1><strong>{{ user.scUsername.toUpperCase() }}</strong><v-btn small color="primary">
                  <v-icon>
                    link
                  </v-icon>
                  Primary</v-btn></h1>
              <p><a :href="scUrlProfile + user.scUsername">Citizen Dossier ({{ user.scUsername }})</a></p>

              <v-chip>
                <v-avatar class="deep-orange darken-4">P</v-avatar>
                PIRATE
              </v-chip>

              <v-chip>
                <v-avatar class="blue darken-1">U</v-avatar>
                UEE
              </v-chip>

            </v-flex>
            <v-flex xs12 md12 pa-3>

              <v-card>
                <v-card-title><strong><v-icon>description</v-icon> BIOGRAPHY</strong></v-card-title>

                <v-card-text v-if="editBiography === false" class="grey lighten-5">
                  <p>{{ user.biography }}</p>
                  <v-btn
                    color="blue"
                    dark
                    small
                    absolute
                    bottom
                    left
                    fab
                    @click="onEditBiography"
                  >
                    <v-icon>edit</v-icon>
                  </v-btn>
                </v-card-text>

                <v-card-text v-else class="grey lighten-5">
                  <v-textarea
                    name="biography"
                    v-model="biography"
                    :label="$t('labelBiography')"
                  >
                  {{ user.biography }}
                  </v-textarea>
                  <v-btn
                    color="green"
                    dark
                    small
                    absolute
                    bottom
                    left
                    fab
                    @click="onSaveBiography"
                  >
                    <v-icon>save</v-icon>
                  </v-btn>
                </v-card-text>

              </v-card>
            </v-flex>

          </v-flex>
        </v-layout>

    </v-container>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  data () {
    return {
      scUsername: '',
      biography: '',
      editBiography: false,
      scUrlProfile: 'https://robertsspaceindustries.com/citizens/',
    }
  },
  computed: {
    user () {
      return this.$store.getters.user
    },
    ...mapState(['profile'])
  },
  methods: {
    // update profile
    updateScUsername() {
      this.$store.dispatch('updateProfile', {
          scUsername: this.scUsername !== '' ? this.scUsername : null
      })
      this.$toasted.show('Save completed!')
    },
    onEditBiography() {
      this.editBiography = true
    },
    onSaveBiography() {
      this.$store.dispatch('updateProfile', {
          biography: this.biography !== '' ? this.biography : null
      })
      this.$toasted.show('Save completed!')
      this.editBiography = false
    }
  }
}
</script>
