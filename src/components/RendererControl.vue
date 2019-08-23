<template>
	<div>
		<button><span class="mdi mdi-volume-high"/></button>
		<input type="range" min="0" max="100" v-model="volume"/>
		<button><span class="mdi mdi-skip-previous"/></button>
		<button><span class="mdi mdi-stop"/></button>
		<button><span class="mdi mdi-play"/></button>
		<button><span class="mdi mdi-skip-next"/></button>
	</div>
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
