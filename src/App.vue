<template>
  <v-app dark>
    <Navbar></Navbar>
    <v-main>
      <router-view />
    </v-main>
    <!-- <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link>  |
      <router-link to="/login">Login</router-link>  |
      <router-link to="/chats">Chats</router-link>
    </div> -->

    <!-- <v-main> -->
    <!-- <HelloWorld/> -->
    <!-- </v-main>  -->
  </v-app>
</template>

<style>
.v-navigation-drawer {
    z-index: 1001;
}
</style>

<script>
// import HelloWorld from './components/HelloWorld';
import Navbar from "./components/Navbar";

export default {
  name: "App",

  components: {
    Navbar,
  },

  data: () => ({
    //
  }),
};
</script>
