<template>
  <div>
    <v-btn
      aria-label="Login"
      class="ma-2 elevation-4"
      @click="googleLogin"
      :loading="loading"
    >
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
    return {
      loading: null,
    };
  },
  methods: {
    googleLogin() {
      const provider = new firebase.auth.GoogleAuthProvider();

      firebase.auth().signInWithRedirect(provider);
      this.loading = true;
    },
  },
  created() {
    firebase
      .auth()
      .getRedirectResult()
      .then((result) => {
        this.$router.push({ name: "home" });
        db.collection('users').doc(result.user.uid).set({
          displayName: result.user.displayName,
          photo: result.user.photoURL,
          location: [],
          email: result.user.email
        }, {merge: true})
      })
      .catch((err) => {
        console.log("Errarta: ", err);
      });
  },
};
</script>
