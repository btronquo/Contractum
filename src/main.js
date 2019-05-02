import Vue from 'vue'
import './plugins/vuetify'
import Toasted from 'vue-toasted';

import App from './App.vue'

import router from './router/'
import { store } from './store'

// firebase config file
const fb = require('./fb.js')

Vue.config.productionTip = false

// Toasted options
const Options = {
  position: 'bottom-center',
  duration: '3000'
}

Vue.use(Toasted, Options)

new Vue({
  router,
  store,
  created () {
    fb.auth.onAuthStateChanged((user) => {
      if (user) {
        this.$store.dispatch('autoSignIn', user)
      }
    })
  },
  render: h => h(App)
}).$mount('#app')
