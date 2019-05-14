<template>
  <v-app class="grey lighten-4">
    <NavBar/>
    <v-content>
      <transition name="fade" mode="out-in">
        <router-view/>
      </transition>
    </v-content>
  </v-app>
</template>

<script>
import NavBar from '@/components/NavBar'

export default {
  name: 'App',
  components: {
    NavBar
  },
  data () {
    return {
      //
    }
  }
}
</script>

<style>

/* --- Spin effect --- */
.spin {
  -webkit-animation:spin 4s linear infinite;
  -moz-animation:spin 4s linear infinite;
  animation:spin 4s linear infinite;
}
@-moz-keyframes spin { 100% { -moz-transform: rotate(360deg); } }
@-webkit-keyframes spin { 100% { -webkit-transform: rotate(360deg); } }
@keyframes spin { 100% { -webkit-transform: rotate(360deg); transform:rotate(360deg); } }

/* ---  Transitions  --- */
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
