import 'vue2-admin-lte/src/lib/css'
import 'vue2-admin-lte/src/lib/script'
import './fonts/google-fonts.css'
import 'nprogress/nprogress.css'

import Vue from 'vue'
import App from './App.vue'
import BootstrapVue from 'bootstrap-vue'
import NProgress from 'nprogress'

Vue.use(BootstrapVue)
Vue.use(NProgress)

import './config/messages'
import router from './config/router'
import store from './config/store'
import EventBus from './config/eventBus'

Vue.prototype.$bus = EventBus
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
