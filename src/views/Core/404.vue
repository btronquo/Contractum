<template>
  <div class="about">
    <v-container class="my-5">
      <h1>Lost?</h1>
      <v-layout row>
      <v-flex xs12 md6>
        <h2>Don't worry, we got you!</h2>

        <v-flex v-if="isAuthenticated === true" xs6 md6>
          <v-btn
          to="/dashboard">
            Back to Dashboard
          </v-btn>
        </v-flex>


        <v-flex v-else xs6 md6>
          <v-btn
          to="/">
            Back to Home
          </v-btn>
        </v-flex>

      </v-flex>
      </v-layout>
    </v-container>
  </div>
</template>

<script>
export default {
  computed: {
    isAuthenticated () {
      return this.$store.getters.isAuthenticated
    }
  }
}
</script>