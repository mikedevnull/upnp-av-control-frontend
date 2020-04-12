<template>
  <div>
    <TheAppBar></TheAppBar>
    <main class="mdc-top-app-bar--fixed-adjust">
      <router-link :to="{name: 'media'}">Media</router-link>
      <router-view></router-view>
    </main>
  </div>
</template>

<script>
import TheAppBar from "./components/TheAppBar";

export default {
  name: "App",
  components: { TheAppBar },
  data: () => ({
    drawer: null

    //
  })
};
</script>
<style>
@import url("https://fonts.googleapis.com/css?family=Roboto:300,400,500");
@import url("https://fonts.googleapis.com/icon?family=Material+Icons");
body {
  margin: 0;
}
</style>
