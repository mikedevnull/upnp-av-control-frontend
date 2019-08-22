<template>
	<v-list>
		<v-subheader>Mediaservers</v-subheader>
		<v-list-item-group v-model="selectedServer" color="primary" >
			<v-list-item
				v-for="server in available_servers"
				:key="server.udn"
				:value="server"
				v-on:click.native="selectServer"
			>
				<v-list-item-content>
					<v-list-item-title v-text="server.name"></v-list-item-title>
				</v-list-item-content>
			</v-list-item>
		</v-list-item-group>
	</v-list>
</template>

<script>
import { mapState } from 'vuex'

export default {
	data: () => ({
		selectedServer: null
	}),
	methods: {
		selectServer: function() {
			this.$emit('onSelectMediaserver', this.selectedServer)
		}
	},
	computed: {...mapState(['available_servers']),
	}
};
</script>
