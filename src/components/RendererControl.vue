<template>
  <v-card>
    <v-card-text>
      <v-toolbar flat>
        <v-btn :disabled="is_disabled" text icon>
          <v-icon large>mdi-volume-high</v-icon>
        </v-btn>

        <v-slider style="padding-top: 20px" :disabled="is_disabled" v-model="volume" max="100" step="1"></v-slider>
        <p style="min-width: 3em; margin-left: 5px; padding-top: 10px">{{volume}}%</p>
        <v-spacer></v-spacer>
        <v-btn outlined fab small class="ma-2" color="indigo" :disabled="is_disabled">
          <v-icon large>mdi-skip-previous</v-icon>
        </v-btn>
        <v-btn outlined fab small class="ma-2" color="indigo" :disabled="is_disabled">
          <v-icon large>mdi-stop</v-icon>
        </v-btn>
        <v-btn outlined fab class="ma-2" color="indigo" :disabled="is_disabled">
          <v-icon large>mdi-play</v-icon>
        </v-btn>
        <v-btn outlined fab small class="ma-2" color="indigo" :disabled="is_disabled">
          <v-icon large>mdi-skip-next</v-icon>
        </v-btn>
        <v-spacer></v-spacer>
      </v-toolbar>
    </v-card-text>
  </v-card>
</template>

<script>
import { mapState } from 'vuex'
import ControlPoint from '../upnpapi.js'

export default {
  data: () => ({ }),
  computed: {
    is_disabled: function() {
      return this.$store.state.active_player === null
           },
    volume: { 
      get: function() { return this.$store.state.volume },
      set: function(value) { 
        if(!this.is_disabled) {
        // Assume the volume can be set to provide a smooth use experience
        // will be reset by the async updates / event bus if value is different
        this.$store.commit('set_volume', value)
        ControlPoint.setCurrentVolume(value) 
      } 
    }
  }
}
};
</script>
