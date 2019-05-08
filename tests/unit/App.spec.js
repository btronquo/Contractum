import { shallowMount } from '@vue/test-utils'
import App from '@/App'
import VueRouter from 'vue-router'

import Vue from 'vue';
import Vuetify from 'vuetify';

Vue.use(Vuetify);
Vue.use(VueRouter)



describe("App.vue", () => {
  const wrapper = shallowMount(App, {
    mocks: {
      $t: (msg) => msg
    }
  })

  it('App is a component', () => {
    expect(wrapper.isVueInstance().toBeTruthy)
  })

})