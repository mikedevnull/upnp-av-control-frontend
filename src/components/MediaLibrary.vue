<template>
	<div>
		<div><a href="#" @click="selectedMediaserver=undefined"><span class="mdi mdi-home"></span></a></div>
		<MediaLibraryDeviceList v-if="selectedMediaserver === undefined" v-on:onSelectMediaserver="onSelectMediaserver"></MediaLibraryDeviceList>
		<MediaserverBrowser :initialUrl="selectedMediaserver.links.browse" v-else></MediaserverBrowser>
	</div>
</template>

<script>
import MediaLibraryDeviceList from './MediaLibraryDeviceList.vue'
import MediaserverBrowser from './MediaserverBrowser.vue'

export default {
	components: {
		MediaLibraryDeviceList,
		MediaserverBrowser
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
