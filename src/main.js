import Vue from 'vue'

import App from './App.vue'
import store from './store'
import router from './router'
import ControlPointEventBus from './upnp_event_bus.js'

Vue.config.productionTip = false



new Vue({
  store: store,
  router: router,
  render: h => h(App)
}).$mount('#app')

let eventBus = new ControlPointEventBus(store)
eventBus.run()
