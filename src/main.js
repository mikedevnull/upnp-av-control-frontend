import Vue from 'vue'

import App from './App.vue'
import store from './store'
import ControlPointEventBus from './upnp_event_bus.js'

import '@mdi/font/css/materialdesignicons.css'

Vue.config.productionTip = false

new Vue({
  store,
  render: h => h(App)
}).$mount('#app')

store.dispatch('update_available_renderers')
store.dispatch('update_playback_info')

let eventBus = new ControlPointEventBus(store)
eventBus.run()
