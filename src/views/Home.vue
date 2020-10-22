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
      defIcon: L.icon({
        iconUrl: 'men.svg',
        iconSize: [38, 95],
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
  }
}
</script>
