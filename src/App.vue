<template>
	<div>
		<RendererSelector></RendererSelector>
		<MediaLibrary></MediaLibrary>
		<RendererControl></RendererControl>
	</div>
</template>

<script>
import RendererControl from "./components/RendererControl";
import RendererSelector from "./components/RendererSelector";
import MediaLibrary from "./components/MediaLibrary";
export default {
	name: "App",
	components: {
		RendererControl,
		RendererSelector,
		MediaLibrary
	},
	data: () => ({
		drawer: null
		//
	})
};
</script>
