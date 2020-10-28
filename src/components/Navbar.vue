<template>
  <nav>
    <v-app-bar flat app>
      <!-- <v-toolbar-side-icon @click="drawer = !drawer" aria-label="Menu"></v-toolbar-side-icon> -->
      <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>
    </v-app-bar>
    <v-navigation-drawer v-model="drawer" app>
      <v-list>
        <v-list-item
          v-for="(link, j) in links"
          :key="j"
          router
          v-bind:to="link.route"
        >
          <v-list-item-icon>
            <v-icon>{{ link.icon }}</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title>{{ link.text }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>

        <v-list-item @click="enableLoc">
          <!-- <v-list-item-icon> -->

          <!-- </v-list-item-icon> -->
          <!-- <v-list-item-content> -->
          <v-btn rounded block>
            <v-icon left>mdi-google-maps</v-icon>
            Enable Location</v-btn
          >
          <!-- </v-list-item-content> -->
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
  </nav>
</template>

<script>
export default {
  name: "Navbar",
  data() {
    return {
      drawer: false,
      links: [
        { icon: "mdi-home", text: "Home", route: "/" },
        { icon: "mdi-account-arrow-right", text: "Login", route: "login" },
        { icon: "mdi-information", text: "About", route: "about" },
      ],
    };
  },
  methods: {
    enableLoc() {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(getPosition);
      }
      function getPosition(position) {
        console.log(position.coords.latitude, position.coords.longitude);
      }
    },
  },
};
</script>
