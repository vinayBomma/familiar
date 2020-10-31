<template>
  <v-container>
    <!-- <div> -->
    <!-- <v-layout row> -->
    <div style="height: 750px">
      <!-- <div class="info">
      <span>Center: {{ center }}</span>
      <span>Zoom: {{ zoom }}</span>
      <span>Bounds: {{ bounds }}</span>
    </div> -->
      <!-- <span @click="signOut">Signout</span> -->
      <l-map
        style="height: 80%; width: 80%"
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
    </div>
    <!-- </v-layout> -->
    <!-- </div> -->
  </v-container>
</template>

<script>
// @ is an alias to /src
// import HelloWorld from '@/components/HelloWorld.vue'
import { LMap, LTileLayer, LMarker, LPopup, LIcon } from "vue2-leaflet";
import firebase from "firebase";

export default {
  name: "home",
  components: {
    // HelloWorld,
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
      center: [19.01109, 72.82831],
      bounds: null,
      markerLatLng: [19.01109, 72.82831],
      iconSize: [40, 40],
      iconUrl: "men.svg",
      // defIcon: L.icon({
      //   iconUrl: 'men.svg',
      //   iconSize: [50, 50],
      // })
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
        navigator.geolocation.getCurrentPosition(getPosition);
      }
      function getPosition(position) {
        console.log(position.coords.latitude, position.coords.longitude);
      }
  },
};
</script>
