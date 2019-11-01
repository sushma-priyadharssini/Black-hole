import Vue from 'vue'
import App from './App.vue'
import _ from 'lodash'
import vuetify from './plugins/vuetify';

//making lodash available for all vue components
Object.defineProperty(Vue.prototype, '_', { value: _ });

Vue.config.productionTip = false

new Vue({
  vuetify,
  render: h => h(App)
}).$mount('#app')
