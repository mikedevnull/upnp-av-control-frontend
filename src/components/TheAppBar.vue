<template>
  <header class="mdc-top-app-bar">
    <div class="mdc-top-app-bar__row">
      <section class="mdc-top-app-bar__section mdc-top-app-bar__section--align-start">
        <span class="mdc-top-app-bar__title">UPnP AV controller</span>
      </section>
    </div>
  </header>
</template>

<script>
import { MDCTopAppBar } from "@material/top-app-bar";

export default {
  components: {},
  computed: {},
  data() {
    return {
      mdcAppBar: undefined
    };
  },
  mounted() {
    this.mdcAppBar = MDCTopAppBar.attachTo(this.$el);
  },
  beforeDestroy() {
    if (typeof this.mdcAppBar !== "undefined") {
      this.mdcAppBar.destroy();
    }
  }
};
</script>
<style lang="scss">
@use '@material/top-app-bar/mdc-top-app-bar';
</style>
