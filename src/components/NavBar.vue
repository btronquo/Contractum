<template>
  <nav>
    <v-toolbar flat app>

      <v-toolbar-title class="text-uppercase">

        <span>{{ title }}</span>
        <span class="font-weight-light">{{ version }}</span>

      </v-toolbar-title>

      <v-spacer></v-spacer>

      <v-btn
        flat
        v-for="item in menuItems"
        :key="item.title"
        :to="item.link">
        <v-icon left>{{ item.icon }}</v-icon>
        {{ item.title }}
      </v-btn>

      <v-btn
        v-if="isAuthenticated"
        flat
        @click="onLogout">
        <v-icon left dark>exit_to_app</v-icon>
        Logout
      </v-btn>

    </v-toolbar>
  </nav>
</template>

<script>
  export default {
    data () {
      return {
        title: 'Contractum',
        version: '0.1'
      }
    },
    computed: {
      menuItems () {
        let menuItems = [
          {icon: 'face', title: 'Sign up', link: '/signup'},
          {icon: 'lock_open', title: 'Sign in', link: '/signin'},
          {icon: '', title: 'Credits', link: '/about'},
        ]
        if (this.isAuthenticated) {
          menuItems = [
            {icon: 'dashboard', title: 'Dashboard', link: '/dashboard'},
            {icon: 'person', title: 'Profile', link: '/profile'}
          ]
        }
        return menuItems
      },
      isAuthenticated () {
        return this.$store.getters.isAuthenticated
      }
    },
    methods: {
      onLogout () {
        this.$store.dispatch('logout')
      }
    }
  }
</script>

<style>
</style>
