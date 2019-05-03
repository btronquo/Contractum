<template>
  <div class="dashboard">
    <v-container class="my-5">
      <h1>My Profile</h1>
      <v-layout row>
      <v-flex xs12 md6>
        <p>Nickname:</p>
      </v-flex>
      </v-layout>
    </v-container>
  </div>
</template>

<script>
export default {
  data () {
    return {
    }
  },
  computed: {
    user () {
      return this.$store.getters.user
    }
  }
}
</script>
