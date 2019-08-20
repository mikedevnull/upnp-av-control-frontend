import Vue from 'vue'
import Vuex from 'vuex'
import upnpapi from './upnpapi.js'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    available_renderers: [],
    active_player: null,
  },
  mutations: {
    set_available_renderers(state, renderers) {
      state.available_renderers = renderers
    },
    set_active_player(state, player) {
      state.active_player = player
    },
  actions: {
    async update_available_renderers(context) {
      let devices = await upnpapi.getMediaRenderers()
      context.commit('set_available_renderers', devices)
    },
    async update_playback_info(context) {
      let playbackInfo = await upnpapi.getCurrentPlaybackInfo()
      context.commit('set_active_player', playbackInfo.player)
      context.commit('set_volume', playbackInfo.volume)
    }
  }
})

export default store
