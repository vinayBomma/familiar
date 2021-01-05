<template>
  <v-container>
    <v-layout row>
      <!-- <v-row align-self="start" justify="center">
        <v-select solo :items="items"></v-select>
      </v-row> -->
      <v-row justify="center" style="height: 750px">
        <l-map
          style="height: 50%; width: 70%"
          :zoom="zoom"
          :center="center"
          @update:zoom="zoomUpdated"
          @update:center="centerUpdated"
          @update:bounds="boundsUpdated"
        >
          <l-tile-layer :url="url"></l-tile-layer>

          <div v-for="(data, j) in mapData" :key="j">
            <l-marker :lat-lng="data.location">
              <l-icon :icon-size="iconSize" :icon-url="data.photo" />
              <l-popup>
                <h3 class="my-2">{{ data.displayName }} is in Mumbai</h3>
                <v-list light>
                  <v-list-item>
                    <v-list-item-icon>
                      <v-icon>mdi-battery-high</v-icon>
                    </v-list-item-icon>
                    <v-list-item-content>
                      <v-list-title>Battery Level</v-list-title>
                    </v-list-item-content>
                    <v-list-item-action>
                      <v-list-title>{{data.battery}}</v-list-title>
                    </v-list-item-action>
                  </v-list-item>

                  <v-list-item ripple :href="'https://www.google.com/maps/search/?api=1&query=' + data.location" target="_blank">
                    <v-list-item-icon>
                      <v-icon>mdi-open-in-new</v-icon>
                    </v-list-item-icon>
                    <v-list-item-content>
                      <v-list-title>Get Directions</v-list-title>
                    </v-list-item-content>
                  </v-list-item>
                </v-list>
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
    user() {
      return this.$store.getters.user;
    },
  },
  data() {
    return {
      url: "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
      zoom: 10,
      center: [18.123, 74.213],
      bounds: null,
      markerLatLng: [18.123, 74.213],
      iconSize: [40, 40],
      iconUrl: "men.svg",
      mapData: [],
      items: ["Foo", "Bar", "Fizz", "Buzz"],
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
        db.collection("users")
          .doc(this.user.data.uid)
          .set(
            {
              location: pos,
            },
            { merge: true }
          );
      });
    }

    navigator.getBattery().then((battery) => {
      let batteryLevel = Math.floor(battery.level * 100);
      db.collection("users")
        .doc(this.user.data.uid)
        .set(
          {
            battery: batteryLevel,
          },
          { merge: true }
        );
    });

    let groupId = "dpqEysrHTPTE0ts4gdkL";

    db.collection("users")
      .where("inGroup", "array-contains", groupId)
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          let userData = {};
          userData = doc.data();
          this.mapData.push(userData);
        });
      });
  },
};
</script>
