<template>
  <div class="dashboard">
    <v-container class="my-5">
      <h1>My Profile</h1>
      <v-layout row>

      <v-flex v-if="user.scUsername === false" xs12 md12 >
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
        <p>Test</p>
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
      scUsername: ''
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
          scUsername: this.scUsername !== '' ? this.scUsername : this.userProfile.scUsername
      })
      this.$toasted.show('Save completed!')
    },
    createProfile() {
      this.$store.dispatch('createProfile')
    },
  }
}
</script>
