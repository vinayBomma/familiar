<template>
  <nav>
    <v-app-bar flat app>
      <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>
      <v-toolbar-title v-if="$route.name === 'home'">Home</v-toolbar-title>
      <v-toolbar-title v-else-if="$route.name === 'about'"
        >About</v-toolbar-title
      >
      <v-toolbar-title v-else-if="$route.name === 'chats'"
        >Chats</v-toolbar-title
      >
      <v-toolbar-title v-else-if="$route.name === 'groups'"
        >Groups</v-toolbar-title
      >
      <v-toolbar-title v-else-if="$route.name === 'login'"
        >Login</v-toolbar-title
      >

      <v-spacer></v-spacer>
      <v-btn
        v-if="$route.name === 'groups'"
        text
        color="cyan"
        @click="joinDialog = true"
        >Join Group</v-btn
      >

      <v-dialog light v-model="joinDialog">
        <v-card>
          <v-card-title class="justify-center subheading">
            Join Group
          </v-card-title>
          <v-card-text class="mt-2">
            <v-text-field
              label="Enter Code"
              shaped
              outlined
              v-model="enterCode"
            ></v-text-field>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn text @click="joinDialog = null">Cancel</v-btn>
            <v-btn color="cyan white--text" right @click="joinGroup"
              >Join</v-btn
            >
          </v-card-actions>
        </v-card>
      </v-dialog>

      <v-snackbar
          shaped
          timeout="3000"
          v-model="snackbar"
          top
          right
          color="yellow darken-2"
          >{{ msg }}</v-snackbar
        >

    </v-app-bar>
    <v-navigation-drawer v-model="drawer" app>
      <v-dialog max-width="600" v-model="signOutModal">
        <template v-slot:activator="{ on }">
          <v-layout justify-end row class="ma-3">
            <v-icon v-if="user.loggedIn" @click="signOutModal = true" v-on="on"
              >mdi-exit-to-app</v-icon
            >
          </v-layout>
        </template>
        <v-card>
          <v-card-title
            class="subheading justify-center"
            style="letter-spacing: 2px; background-image: radial-gradient( circle farthest-corner at -0.2% 99.7%,  rgba(190,53,145,1) 0%, rgba(239,69,115,1) 100.2% );"
            >Sign Out</v-card-title
          >
          <v-card-text
            class="subheading pt-2"
            style="text-align: center; word-spacing: 2px; letter-spacing: 2px"
            >Are you sure you want to sign out?</v-card-text
          >
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn aria-label="No" text @click="signOutModal = false"
              >Cancel</v-btn
            >
            <v-btn aria-label="Yes" color="cyan" @click="signOut">Yes</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>

      <v-layout column align-center v-if="user.loggedIn">
        <v-flex class="mt-5">
          <v-avatar size="80">
            <img :src="user.data.photoURL" alt="Profile Photo" />
          </v-avatar>
        </v-flex>
      </v-layout>

      <v-divider v-if="user.loggedIn" class="mt-5"></v-divider>

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

        <v-list-item class="mt-2">
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
          <v-col
            sm="3"
            md="3"
            v-for="(icon, i) in osIcon"
            :key="i"
            class="text-center"
          >
            <v-icon :color="icon.color">{{ icon.ic }}</v-icon>
          </v-col>
        </v-row>
      </template>
    </v-navigation-drawer>
  </nav>
</template>

<script>
import firebase from "firebase/app";
import "firebase/auth";
import { db } from "@/configFirebase";

export default {
  name: "Navbar",
  computed: {
    user() {
      return this.$store.getters.user;
    },
  },
  data() {
    return {
      drawer: false,
      joinDialog: null,
      enterCode: null,
      snackbar: null,
      msg: null,
      signOutModal: null,
      links: [
        { icon: "mdi-home", text: "Home", route: "/" },
        { icon: "mdi-account-circle", text: "Login", route: "login" },
        { icon: "mdi-information", text: "About", route: "about" },
        { icon: "mdi-chat-processing", text: "Chats", route: "chats" },
        { icon: "mdi-account-group", text: "Groups", route: "groups" },
      ],
      osIcon: [
        { id: "3", ic: "mdi-microsoft-windows", color: "#0288D1" },
        { id: "1", ic: "mdi-android", color: "#4CAF50" },
        { id: "2", ic: "mdi-apple-ios", color: "#BDBDBD  " },
        { id: "4", ic: "mdi-web", color: "#01579B" },
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
    signOut() {
      firebase
        .auth()
        .signOut()
        .then(() => {
          this.$router.push({ name: "login" });
        })
        .catch((err) => {
          console.log(err);
        });
    },
    joinGroup() {
      if (this.enterCode) {
        let batch = db.batch();

        console.log("Code entered: ", this.enterCode);
        db.collection("groups")
          .where("inviteCode", "==", this.enterCode)
          .get()
          .then((querySnapshot) => {
            if (querySnapshot.empty) {
              this.msg = "Invalid Code";
              this.snackbar = true;
            }
            querySnapshot.forEach((doc) => {
              let member = doc.data().members;
              if (member.includes(this.user.data.uid)) {
                this.msg = "You are already a member of this group";
                this.snackbar = true;
              } else {
                member.push(this.user.data.uid);
                let groups = db.collection("groups").doc(doc.id);
                let users = db.collection("users").doc(this.user.data.uid);

                batch.update(groups, {
                  members: member,
                  totalMembers: firebase.firestore.FieldValue.increment(1),
                });

                batch.update(users, {
                  inGroup: firebase.firestore.FieldValue.arrayUnion(doc.id),
                });

                batch.commit().then(() => {
                  this.msg = "Joined the group!";
                  this.snackbar = true;
                  this.$router.go({ name: "groups" });
                });
              }
            });
          })
          .catch((err) => {
            console.log("Error: ", err);
          });
        this.joinDialog = null;
      }
    },
  },
};
</script>
