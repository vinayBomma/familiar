<template>
  <v-container>
    <v-layout row>
      <v-row align="start" justify="center" style="height: 750px">
        <l-map
          style="height: 50%; width: 70%"
          :zoom="zoom"
          :center="center"
          @update:zoom="zoomUpdated"
          @update:center="centerUpdated"
          @update:bounds="boundsUpdated"
        >
          <l-tile-layer :url="url"></l-tile-layer>
          <!-- <l-marker :lat-lng="markerLatLng">
            <l-icon :icon-size="iconSize" :icon-url="user.data.photoURL" />
            <l-popup>
              <h3>{{user.data.displayName}} is in Mumbai</h3>
              <p>They are in a Park</p>
            </l-popup>
          </l-marker> -->

          <div v-for="(data, j) in mapData" :key="j">
            <l-marker :lat-lng="data.location">
            <l-icon :icon-size="iconSize" :icon-url="data.photo" />
            <l-popup>
              <h3>{{data.displayName}} is in Mumbai</h3>
              <p>They are in a Park</p>
            </l-popup>
          </l-marker>
          </div>


        </l-map>
      </v-row>
    </v-layout>
  </v-container>
</template>

<script>
import { LMap, LTileLayer, LMarker, LPopup, LIcon } from "vue2-leaflet";
import firebase from "firebase/app";
import { db } from "@/configFirebase";

export default {
  name: "Home",
  components: {
    LMap,
    LTileLayer,
    LMarker,
    LPopup,
    LIcon,
  },
  computed: {
    user(){
      return this.$store.getters.user
    }
  },
  data() {
    return {
      url: "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
      zoom: 12,
      center: [18.123,74.213],
      bounds: null,
      markerLatLng: [18.123,74.213],
      iconSize: [40, 40],
      iconUrl: "men.svg",
      mapData: [],
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
  },
  created() {

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        let pos = [position.coords.latitude, position.coords.longitude];
        this.markerLatLng = pos;
        this.center = this.markerLatLng;
        db.collection("users").doc(this.user.data.uid).set({
          location: pos,
        }, {merge: true})
      });
    }

    navigator.getBattery().then((battery) => {
      let batteryLevel = Math.floor(battery.level * 100)
      db.collection("users").doc(this.user.data.uid).set({
        battery: batteryLevel,
      }, {merge: true})
    });

    let groupId = 'dpqEysrHTPTE0ts4gdkL'

    db.collection("users").where("inGroup", "array-contains", groupId).get().then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        let userData = {}
        userData = doc.data()
        this.mapData.push(userData)
      })
    })
  },
};
</script>
