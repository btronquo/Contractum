import { shallowMount } from '@vue/test-utils'
import About from '@/views/About.vue'

import Vue from 'vue';
import Vuetify from 'vuetify';

Vue.use(Vuetify);


describe("About.vue", () => {
  const wrapper = shallowMount(About, {
    mocks: {
      $t: (msg) => msg
    }
  })

  it('About is a component', () => {
    expect(wrapper.isVueInstance().toBeTruthy)
  })

})