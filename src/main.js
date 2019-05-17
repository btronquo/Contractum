import Vue from 'vue'
import VueI18n from 'vue-i18n'
import Vuetify from 'vuetify/lib'
import 'vuetify/src/stylus/app.styl'
import { firestorePlugin } from 'vuefire'
import Toasted from 'vue-toasted';

import App from './App.vue'

import router from './router/'
import { store } from './store'
import i18n from './i18n'

Vue.use(firestorePlugin)

// firebase config file
const fb = require('./fb.js')

Vue.config.productionTip = false

// Toasted options
const Options = {
  position: 'bottom-center',
  duration: '3000'
}

Vue.use(Toasted, Options)
Vue.use(VueI18n)

Vue.use(Vuetify, {
  iconfont: 'md',
  lang: {
    t: (key, ...params) => i18n.t(key, params)
  }
})


new Vue({
  router,
  store,
  i18n,
  created () {
    fb.auth.onAuthStateChanged((user) => {
      if (user) {
        store.dispatch('autoSignIn', user)
      }
    })
  },
  render: h => h(App)
}).$mount('#app')
