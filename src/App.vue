<template>
  <v-app dark>
    <Navbar></Navbar>
    <v-main>
      <router-view />
    </v-main>
  </v-app>
</template>

<style>
.v-navigation-drawer {
    z-index: 1001;
}
</style>

<script>
import Navbar from "./components/Navbar";

export default {
  name: "App",
  components: {
    Navbar,
  },
};
</script>
