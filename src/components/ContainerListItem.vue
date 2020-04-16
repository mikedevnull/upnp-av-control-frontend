<template>
  <li class="mdc-image-list__item container-list__item">
    <router-link :to="itemBrowseChildren(item)">
      <div class="mdc-image-list__image-aspect-container">
        <img class="mdc-image-list__image" :src="imageSrc" />
      </div>
      <div class="mdc-image-list__supporting">
        <span class="mdc-image-list__label">{{item.title}}</span>
      </div>
    </router-link>
  </li>
</template>
<script>
import folderIcon from "@/assets/folder-24px.svg";
import albumIcon from "@/assets/album-24px.svg";
import personIcon from "@/assets/person-24px.svg";
export default {
  props: ["item"],
  computed: {
    imageSrc() {
      if (this.item.albumArtURI) {
        return "/api" + this.item.albumArtURI;
      } else if (
        this.item.upnpclass.startsWith("object.container.person.musicArtist")
      ) {
        return personIcon;
      } else if (
        this.item.upnpclass.startsWith("object.container.album.musicAlbum")
      ) {
        return albumIcon;
      } else {
        return folderIcon;
      }
    }
  },
  methods: {
    itemBrowseChildren(item) {
      return {
        name: "browse",
        params: { udn: this.$route.params.udn },
        query: { objectID: item.id }
      };
    }
  }
};
</script>
<style lang="scss" scoped>
@use "@material/image-list/mdc-image-list";
.container-list__item {
  // border: 1px solid;
  background-color: #ccc;
}
</style>
