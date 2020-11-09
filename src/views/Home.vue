<template>
  <v-container>
    <v-layout row>
      <v-row align="start" justify="center" style="height: 750px">
        <!-- <span @click="signOut">Signout</span> -->
        <l-map
          style="height: 50%; width: 70%"
          :zoom="zoom"
          :center="center"
          @update:zoom="zoomUpdated"
          @update:center="centerUpdated"
          @update:bounds="boundsUpdated"
        >
          <l-tile-layer :url="url"></l-tile-layer>
          <l-marker :lat-lng="markerLatLng">
            <l-icon :icon-size="iconSize" :icon-url="iconUrl" />
            <l-popup>
              <h3>Amyra is in Mumbai</h3>
              <p>She is in a Park</p>
            </l-popup>
          </l-marker>
        </l-map>
      </v-row>
    </v-layout>
  </v-container>
</template>

<script>
import { LMap, LTileLayer, LMarker, LPopup, LIcon } from "vue2-leaflet";
import firebase from "firebase/app";
import "firebase/auth";
import { db } from "../configFirebase";

export default {
  name: "Home",
  components: {
    LMap,
    LTileLayer,
    LMarker,
    LPopup,
    LIcon,
  },
  data() {
    return {
      url: "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
      zoom: 8,
      center: [18.123,74.213],
      bounds: null,
      markerLatLng: [18.123,74.213],
      iconSize: [40, 40],
      iconUrl: "men.svg",
    };
  },
  methods: {
    zoomUpdated(zoom) {
      this.zoom = zoom;
    },
    centerUpdated(center) {
      this.center = center;
    },
    boundsUpdated(bounds) {
      this.bounds = bounds;
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
  },
  created() {
    let user = firebase.auth().currentUser;
    this.iconUrl = user.photoURL;

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        let pos = [position.coords.latitude, position.coords.longitude];
        this.markerLatLng = pos;
        this.center = this.markerLatLng;
      });
    }

    // db.collection("groups").doc('test').collection('chats').doc().set({
    //   name: 'chat is working hopefully'
    // })

    // db.collection("groups").doc().set({
    //   msg: 'new group hopefully'
    // })
  },
};
</script>
