<template>
  <div class="browser-view">
    <LoadSpinner v-if="!ready" class="mdc-layout-grid__cell--span-12"></LoadSpinner>
    <template v-else>
      <div class="browser-view__details">
        <img class="browser-view__artwork" :src="folderIcon" />
        <span class="browser-view-typography--title">{{item.title}}</span>
        <span class="browser-view-typography--subtitle">{{title}}</span>
      </div>
      <div class="browser-view__children">
        <ul class="mdc-list">
          <li class="mdc-list-item" tabindex="0" v-for="child in children" :key="child.id">
            <span class="mdc-list-item__graphic">
              <img class="mdc-image-list__image" :src="iconForItem(child)" />
            </span>
            <router-link :to="itemBrowseChildrenRoute(udn, child.id)">
              <span class="mdc-list-item__text">{{child.title}}</span>
            </router-link>
          </li>
        </ul>
      </div>
    </template>
  </div>
</template>
<script>
import ContainerBrowserMixin from "./ContainerBrowserMixin";
import utils from "./container-type-utils";
import { MDCList } from "@material/list";
import LoadSpinner from "@/components/LoadSpinner";

export default {
  mixins: [ContainerBrowserMixin],
  props: ["item", "udn"],
  components: { LoadSpinner },
  data() {
    return {
      mdcList: undefined,
      folderIcon: utils.folderIcon,
      mediaserver: undefined
    };
  },
  methods: {
    iconForItem(item) {
      return utils.imageForItem(item);
    }
  },
  computed: {
    title() {
      if (this.mediaserver) {
        return this.mediaserver.friendly_name;
      }
      return "";
    }
  },
  watch: {
    item: async function() {
      await this.loadData();
    }
  },
  mounted: function() {
    this.mdcList = new MDCList(document.querySelector(".mdc-list", this.$el));
    this.mediaserver = this.$store.getters.getMediaServerByUDN(this.udn);
  },
  beforeDestroy: function() {
    if (this.mdcList !== undefined) {
      this.mdcList.destroy();
      this.mdcList = undefined;
    }
  }
};
</script>
<style lang="scss">
@use "@material/list/mdc-list";
@use "./style.scss";
</style>
