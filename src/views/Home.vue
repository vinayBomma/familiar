<template>
  <div style="height: 750px;">
    <!-- <div class="info">
      <span>Center: {{ center }}</span>
      <span>Zoom: {{ zoom }}</span>
      <span>Bounds: {{ bounds }}</span>
    </div> -->
    <l-map
      style="height: 80%; width: 80%"
      :zoom="zoom"
      :center="center"
      @update:zoom="zoomUpdated"
      @update:center="centerUpdated"
      @update:bounds="boundsUpdated"
    >
      <l-tile-layer :url="url"></l-tile-layer>
      <l-marker :lat-lng="markerLatLng" :icon="defIcon">
        <l-popup>
          <h3>Amyra is in Mumbai</h3>
          <p>She is in a Park</p>
        </l-popup>
      </l-marker>
    </l-map>
  </div>
</template>

<script>
// @ is an alias to /src
// import HelloWorld from '@/components/HelloWorld.vue'
import {LMap, LTileLayer, LMarker, LPopup} from 'vue2-leaflet';
import firebase from 'firebase'

export default {
  name: 'Home',
  components: {
    // HelloWorld,
    LMap,
    LTileLayer,
    LMarker,
    LPopup
  },
   data () {
    return {
      url: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
      zoom: 18,
      center: [19.01109, 72.82831],
      bounds: null,
      markerLatLng: [19.01109, 72.82831],
      markerStyle: {
        
      },
      defIcon: L.icon({
        iconUrl: 'https://lh3.googleusercontent.com/a-/AOh14GgSL9H-4yXSZcWrfQ3XKMBQZaqN70s6PR0mhkW8Zw=s96-c',
        iconSize: [50, 50],
      })
    };
  },
  methods: {
    zoomUpdated (zoom) {
      this.zoom = zoom;
    },
    centerUpdated (center) {
      this.center = center;
    },
    boundsUpdated (bounds) {
      this.bounds = bounds;
    }
  },
  // mounted(){
  //   let user = firebase.auth().currentUser;
  //   console.log(user.displayName);
  //   console.log(user.photoURL)
  //   this.defIcon.iconUrl = user.photoURL
  // }
}
</script>
