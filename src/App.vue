<template>
  <v-app class="grey lighten-4">
    <NavBar/>
    <v-content>
      <Modal @modalForm="dialog = true"/>
      <transition name="fade" mode="out-in">
        <router-view/>
      </transition>
    </v-content>
  </v-app>
</template>

<script>
import NavBar from '@/components/NavBar'
import Modal from '@/components/ModalSignupLogin'

export default {
  name: 'App',
  components: {
    NavBar,
    Modal
  },
  data () {
    return {
      //
    }
  }
}
</script>

<style>
  /* Enter and leave animations can use different */
/* durations and timing functions.              */
.fade-enter-active {
  transition: all .1s ease;
}
.fade-leave-active {
  transition: all .1s cubic-bezier(1.0, 0.5, 0.8, 1.0);
}
.fade-enter, .slide-fade-leave-to
/* .fade-leave-active below version 2.1.8 */ {
  transform: translateX(10px);
  opacity: 0;
}
</style>
