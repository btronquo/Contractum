<i18n>
{
  "fr": {
    "signUp": "S'enregistrer",
    "signIn": "Connexion",
    "dashboard": "Panneau de controle",
    "credits": "Crédits",
    "logout": "Déconnexion",
    "profile": "Profil"
  },
  "en": {
    "signUp": "Sign Up",
    "signIn": "Sign In",
    "dashboard": "Dashboard",
    "credits": "Credits",
    "logout": "Logout",
    "profile": "Profile"
  }
}
</i18n>

<template>
  <div id="navbar">
  <nav>
    <v-toolbar flat app>

      <v-toolbar-side-icon  @click.stop="drawer = !drawer" class="hidden-md-and-up"></v-toolbar-side-icon>
      <v-toolbar-title class="text-uppercase">

        <span>{{ title }}</span>
        <span class="font-weight-light">{{ version }}</span>

      </v-toolbar-title>

      <v-spacer></v-spacer>
      <v-toolbar-items class="hidden-sm-and-down">

      <v-btn
        flat
        v-for="item in menuItems"
        :key="item.title"
        :to="item.link">
        <v-icon left>{{ item.icon }}</v-icon>
        {{ $t(item.title) }}
      </v-btn>

      <v-btn
        v-if="isAuthenticated"
        flat
        @click="onLogout">
        <v-icon left dark>exit_to_app</v-icon>
        {{ $t('logout') }}
      </v-btn>

      </v-toolbar-items>

    </v-toolbar>

 <v-navigation-drawer
      v-model="drawer"
      absolute
      temporary
    >

      <!-- user img and name -->
      <v-list class="pa-1" v-if="isAuthenticated">
        <v-list-tile avatar>
          <v-list-tile-avatar>
            <img v-if="user.photoUrl" :src="user.photoUrl">
          </v-list-tile-avatar>

          <v-list-tile-content>
            <v-list-tile-title>{{ user.name }}</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>


      <v-list class="pt-0" dense>
        <v-divider></v-divider>

        <v-list-tile
          v-for="item in menuItems"
          :key="item.title"
          :to="item.link"
        >
          <v-list-tile-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-tile-action>

          <v-list-tile-content>
            <v-list-tile-title>{{ $t(item.title) }}</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>

        <v-list-tile
        v-if="isAuthenticated"
        flat
        @click="onLogout"
        >
          <v-list-tile-action>
            <v-icon>exit_to_app</v-icon>
          </v-list-tile-action>

          <v-list-tile-content>
            <v-list-tile-title>{{ $t('logout') }}</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>


      </v-list>
    </v-navigation-drawer>

  </nav>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        title: 'Contractum',
        version: '0.1',
        drawer: false
      }
    },
    computed: {
      menuItems () {
        let menuItems = [
          {icon: 'face', title: 'signUp', link: '/signup'},
          {icon: 'lock_open', title: 'signIn', link: '/signin'},
          {icon: '', title: 'credits', link: '/about'},
        ]
        if (this.isAuthenticated) {
          menuItems = [
            {icon: 'dashboard', title: 'dashboard', link: '/dashboard'},
            {icon: 'person', title: 'profile', link: '/profile'},
            {icon: '', title: 'credits', link: '/about'},
          ]
        }
        return menuItems
      },
      user () {
      return this.$store.getters.user
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
