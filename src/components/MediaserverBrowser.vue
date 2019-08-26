<template>
	<div>
		<progress v-if="!data_ready"></progress>
		<a href="#" v-if="parentUrlHistory.length  > 0" @click="goBack()">..</a>
		<ul v-for="(item,i) in items" :key="i">
			<li v-if="item.browseChildren"><a href="#" @click="browseItem(item)">{{item.title}}</a></li>
			<li v-else>{{item.title}}</li>
		</ul>
	</div>
</template>

<script>
import ControlPoint from '../upnpapi.js'

export default {
	props: ['initialUrl'],
	data: function()  {
		return {url: this.initialUrl, data_ready: false, items:[], parentUrlHistory:[]}
	},
	methods: {
		loadData: function() {
			this.data_ready = false
			this.items = []
			ControlPoint.browseServer(this.url).then((data)=>{this.data_ready=true; this.items=data});
		},
		browseItem: function(item) {
			this.parentUrlHistory.push(this.url)
			this.url = item.browseChildren
			this.loadData()
		},
		goBack: function() {
			if(this.parentUrlHistory.length > 0) {
				this.url = this.parentUrlHistory.pop()
				this.loadData()
			}
		}
	},
	mounted: function() {
		this.loadData()
	}
};
</script>
