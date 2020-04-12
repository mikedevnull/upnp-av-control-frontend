<template>
  <div>
    <progress v-if="!data_ready"></progress>
    <ul v-for="(item,i) in items" :key="i">
      <li>
        <router-link :to="itemBrowseChildren(item)">{{item.title}}</router-link>
      </li>
    </ul>
  </div>
</template>

<script>
import ControlPoint from "../upnpapi.js";

export default {
  data: function() {
    return {
      udn: undefined,
      objectID: undefined,
      items: [],
      data_ready: false
    };
  },
  methods: {
    itemBrowseParent(item) {
      return {
        name: "browse",
        params: { udn: this.udn },
        query: { objectID: item.parentID }
      };
    },
    itemBrowseChildren(item) {
      return {
        name: "browse",
        params: { udn: this.udn },
        query: { objectID: item.id }
      };
    },
    loadData: function() {
      this.data_ready = false;
      this.items = [];
      ControlPoint.browseServer(this.udn, this.objectID).then(data => {
        this.data_ready = true;
        this.items = data;
      });
    }
  },
  watch: {
    udn: function() {
      this.loadData();
    },
    objectID: function() {
      this.loadData();
    }
  },
  beforeRouteUpdate(to, from, next) {
    this.objectID = to.query.objectID;
    this.udn = to.params.udn;
    next();
  },
  mounted: function() {
    this.objectID = this.$route.query.objectID;
    this.udn = this.$route.params.udn;
  }
};
</script>
