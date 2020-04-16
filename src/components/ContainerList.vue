<template>
  <ul class="mdc-image-list container-list mdc-image-list--with-text-protection">
    <ContainerListItem v-for="item in items" :item="item" :key="item.id"></ContainerListItem>
  </ul>
</template>
<script>
import ContainerListItem from "./ContainerListItem";
export default {
  components: { ContainerListItem },
  props: ["items"]
};
</script>
<style lang="scss" scoped>
@use "@material/image-list/mdc-image-list";
@use "@material/image-list";

.container-list {
  @include image-list.standard-columns(4);
  max-width: 1000px;
}
@media (min-width: 768px) {
  .container-list {
    @include image-list.standard-columns(6);
  }
}
</style>
