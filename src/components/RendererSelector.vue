<template>
  <v-select
    label="Renderer"
    v-model="active_player"
    :items="available_renderers"
    item-text="name"
    item-value="udn"
    @change="selectRenderer"
  ></v-select>
</template>

<script>
import ControlPoint from "../upnpapi";
import { mapState } from 'vuex'

export default {
  data: () => ({
  }),
  methods: {
    selectRenderer(value) {
      ControlPoint.setActiveRenderer(value).then(() => this.$store.dispatch('update_playback_info'))
    }
  },
  computed: {...mapState(['available_renderers']),
    active_player: {
      get: function() {
        return this.$store.state.active_player
       },
      set: function(udn) {
         ControlPoint.setActiveRenderer(udn) 
       }

    }
  }
};
</script>
