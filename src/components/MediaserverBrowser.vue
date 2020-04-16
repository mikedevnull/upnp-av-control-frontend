<template>
  <div>
    <progress v-if="!data_ready"></progress>
    <h3 class="mdc-typography--headline3">{{currentItem.title}}</h3>
    <ContainerList :items="items"></ContainerList>
  </div>
</template>

<script>
import ControlPoint from "../upnpapi.js";
import ContainerList from "./ContainerList";
export default {
  components: { ContainerList },
  data: function() {
    return {
      udn: undefined,
      objectID: undefined,
      currentItem: { title: "" },
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
      ControlPoint.getObjectMetadata(this.udn, this.objectID).then(data => {
        this.currentItem = data[0];
      });
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
