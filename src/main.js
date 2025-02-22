import Vue from 'vue'
import App from './App.vue'

import { BootstrapVue, IconsPlugin } from 'bootstrap-vue';

Vue.config.productionTip = false

// Import Bootstrap an BootstrapVue CSS files (order is important)
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';

// Make BootstrapVue available throughout your project
Vue.use(BootstrapVue);
// Optionally install the BootstrapVue icon components plugin
Vue.use(IconsPlugin);


import { firestorePlugin } from 'vuefire';

Vue.use(firestorePlugin);

import router from './router';
import vuetify from './plugins/vuetify';

Vue.prototype.$data_interacciones = [];


new Vue({
  router,
  vuetify,
  render: h => h(App)
}).$mount('#app')
