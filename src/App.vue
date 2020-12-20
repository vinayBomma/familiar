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

* {
  -webkit-user-select: none; /* Safari */
  -moz-user-select: none; /* Firefox */
  -ms-user-select: none; /* IE10+/Edge */
  user-select: none;
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
