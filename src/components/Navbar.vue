<template>
  <nav>
    <v-app-bar flat app>
      <!-- <v-toolbar-side-icon @click="drawer = !drawer" aria-label="Menu"></v-toolbar-side-icon> -->
      <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>
    </v-app-bar>
    <v-navigation-drawer v-model="drawer" app>
      <v-layout column align-center>
        <v-flex class="mt-5">
          <v-avatar size="80">
            <img src="men.svg" alt="Profile Photo" />
          </v-avatar>
        </v-flex>
      </v-layout>

      <v-divider class="mt-5"></v-divider>

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

        <v-list-item>
          <v-btn rounded block @click="enableLoc">
            <v-icon left>mdi-google-maps</v-icon>
            Enable Location</v-btn
          >
        </v-list-item>

        <v-list-item class="text-center">
          <v-icon left>mdi-weather-night</v-icon>
          <v-list-item-content>
            Night Mode
          </v-list-item-content>
          <v-switch v-model="$vuetify.theme.dark"></v-switch>
        </v-list-item>
      </v-list>

      <template v-slot:append>
        <v-row class="pa-2">
          <v-col sm="4" v-for="(icon, i) in osIcon" :key="i" class="text-center">
            <v-icon :color="icon.color">{{ icon.ic }}</v-icon>
          </v-col>
        </v-row>
      </template>
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
        { icon: "mdi-account-circle", text: "Login", route: "login" },
        { icon: "mdi-information", text: "About", route: "about" },
        { icon: "mdi-chat-processing", text: "Chats", route: "chats" },
        { icon: "mdi-account-group", text: "Groups", route: "groups" },
      ],
      osIcon: [
        { id: '3', ic: "mdi-microsoft-windows" , color: "#0288D1"},
        { id: '1', ic: "mdi-android" , color: "#4CAF50"},
        { id: '2', ic: "mdi-apple-ios" , color: "#BDBDBD  "},
        { id: '4', ic: "mdi-web" , color: "#01579B"},
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
