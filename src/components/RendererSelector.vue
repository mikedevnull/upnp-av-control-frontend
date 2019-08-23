<template>
  <div>
    <select @change="selectRenderer" v-model="selected">
      <option v-for="(renderer,i) in available_renderers" :value="renderer.udn" :key="i">{{renderer.name}}</option>
    </select>
  </div>
</template>
<script>
import ControlPoint from "../upnpapi";
import { mapState } from 'vuex'

export default {
  data: () => ({
    selected: null
  }),
  methods: {
    selectRenderer() {
      let value = this.selected
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
