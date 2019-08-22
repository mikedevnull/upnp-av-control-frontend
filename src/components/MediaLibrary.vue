<template>
	<div>
		<div>
			<v-btn icon @click="selectedMediaserver=undefined">
				<v-icon large>mdi-home</v-icon>
			</v-btn>
		</div>
		<MediaLibraryDeviceList v-if="selectedMediaserver === undefined" v-on:onSelectMediaserver="onSelectMediaserver"></MediaLibraryDeviceList>
		<div v-else>TODO: Browse device content</div>
	</div>
</template>

<script>
import MediaLibraryDeviceList from './MediaLibraryDeviceList.vue'

export default {
	components: {
		MediaLibraryDeviceList,
	},
	data: () => ({
		selectedMediaserver: undefined
	}),
	methods: {
		onSelectMediaserver: function(value) {
			this.selectedMediaserver = value
		}
	},
	computed: {
	}
};
</script>
