<template>
	<div>
		<RendererSelector></RendererSelector>
		<RendererControl></RendererControl>
	</div>
</template>

<script>
import RendererControl from "./components/RendererControl";
import RendererSelector from "./components/RendererSelector";
export default {
	name: "App",
	components: {
		RendererControl,
		RendererSelector,
	},
	data: () => ({
		drawer: null
		//
	})
};
</script>
