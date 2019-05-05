<template>
  <div class="dashboard">
    <v-container class="my-5">
      <h1>My Profile</h1>
      <v-flex v-if="(!user.scUsername)" xs12 md12 >
        <!-- case: if user doesn't set his star citizen's username -->
        <v-alert
          :value="true"
          type="warning"
        >
          Vous n'avez pas encore mis à jour votre nom d'utilisateur StarCitizen
          <br>
          Merci de remplir le champs suivant
        </v-alert>
        <v-form>
          <v-text-field
            v-model="scUsername"
            :counter="15"
            label="Star Citizen Username"
            required
          ></v-text-field>
          <v-btn
            color="success"
            @click="updateProfile"
          >
            Enregistrer
          </v-btn>
        </v-form>
      </v-flex>

      <v-flex v-else xs12 md12>
        <p>Star Citizen username: <strong>{{ user.scUsername }}</strong></p>
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
              <p>Event proposed: <strong>5</strong></p>
              <p>Event realized: <strong>2</strong></p>
              <p>Contracts: <strong>3</strong></p>
            </v-flex>

          </v-flex>

          <v-flex xs9 md9>
            <v-flex xs12 md12 pa-3>
              <p class="display-1">{{ user.scUsername }}</p>
              <p><a :href="linktorsi">Citizen Dossier</a></p>

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
                <v-card-title><strong>PRESENTATION</strong></v-card-title>



                <v-card-text v-if="editPresentation === false" class="grey lighten-5">
                  <p>{{ user.presentation }}</p>
                  <v-btn
                    color="blue"
                    dark
                    small
                    absolute
                    bottom
                    left
                    fab
                    @click="onEditPresentation"
                  >
                    <v-icon>edit</v-icon>
                  </v-btn>
                </v-card-text>

                <v-card-text v-else class="grey lighten-5">
                  <v-textarea
                    name="presentation"
                    v-model="presentation"
                    label="Enter your presentation here"
                  >
                  </v-textarea>
                  <v-btn
                    color="green"
                    dark
                    small
                    absolute
                    bottom
                    left
                    fab
                    @click="onSavePresentation"
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
      presentation: '',
      linktorsi: 'https://robertsspaceindustries.com/citizens/Luicidus',
      editPresentation: false
    }
  },
  computed: {
    user () {
      return this.$store.getters.user
    },
    ...mapState(['userProfile'])
  },
  methods: {
    updateProfile() {
      this.$store.dispatch('updateProfile', {
          // si on a changé le scUsername
          scUsername: this.scUsername !== '' ? this.scUsername : this.userProfile.scUsername
      })
      this.$toasted.show('Save completed!')
    },
    createProfile() {
      this.$store.dispatch('createProfile')
    },
    onEditPresentation() {
      this.editPresentation = true
    },
    onSavePresentation() {
      this.$store.dispatch('updateProfile', {
        // si on a changé le scUsername
          presentation: this.presentation !== '' ? this.presentation : this.userProfile.presentation
      })
      this.$toasted.show('Save completed!')
      this.editPresentation = false
    }
  }
}
</script>
