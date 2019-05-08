import { shallowMount } from '@vue/test-utils'
import About from '@/views/About.vue'

import Vue from 'vue';
import Vuetify from 'vuetify';
import VueI18n from 'vue-i18n'

Vue.use(Vuetify);
Vue.use(VueI18n)

describe("About.vue", () => {
  const wrapper = shallowMount(About, {
    mocks: {
      $t: () => {}
    }
  })

  it('About is a component', () => {
    expect(wrapper.isVueInstance().toBeTruthy)
  })

})