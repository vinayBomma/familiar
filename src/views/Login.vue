<template>
  <div>
    <v-btn aria-label="Login" class="ma-2 elevation-4" @click="googleLogin">
      Login with<v-icon right>$vuetify.icons.google</v-icon>
    </v-btn>
    <!-- <v-btn
      class="elevation-10"
      aria-label="Sign In"
      @click="googleLogin"
    >
      <img src="../../public/google.png" class="mr-2" alt="Google" />Sign In
    </v-btn> -->
  </div>
</template>

<style scoped></style>

<script>
import firebase from "firebase/app";
import { db } from "@/configFirebase.js";

export default {
  name: "login",
  data() {
    return {};
  },
  methods: {
    googleLogin() {
      const provider = new firebase.auth.GoogleAuthProvider();

      firebase.auth().signInWithRedirect(provider);
    },
  },
  created() {
    firebase
      .auth()
      .getRedirectResult()
      .then(() => {
        this.$router.push({ name: "home" });
      })
      .catch((err) => {
        console.log("Errarta: ", err);
      });
  },
};
</script>
