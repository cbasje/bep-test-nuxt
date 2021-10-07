<template>
  <div id="map-wrap" style="height: 100vh">
    <client-only>
      <l-map
        :zoom="zoom"
        :center="location"
        :options="{ zoomControl: false, attributionControl: false }"
      >
        <l-tile-layer :url="tileUrl" :attribution="attribution" />
        <l-control-zoom position="bottomright" class="pb-2" />
        <!-- TODO -->
        <l-control-attribution position="topright" />

        <l-marker
          v-for="marker in markers"
          :key="marker.id"
          :lat-lng="[marker.latitude, marker.longitude]"
          :icon="icon"
          @click="clickMarker(marker)"
        />
      </l-map>
    </client-only>
  </div>
</template>

<script>
// import Vue from 'vue'
// import { MapMarker } from '~/types/map-marker'
import L from 'leaflet'

export default {
  props: {
    location: L.LatLng,
    zoom: { type: Number, default: 8 },
    markers: { type: Array, default: () => [] },
  },
  data() {
    return {
      username: 'benjamiin',
      styleId: 'ckud8w32h00ju17pmqbkh7x0u',
      accessToken: process.env.VUE_APP_MAPBOX_TOKEN,
      attribution:
        'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
      icon: L.icon({
        iconUrl: require('~/assets/leaf-green.png'),
        iconSize: [38, 95],
        iconAnchor: [19, 47.5],
      }),
      timestamp: Date.now(),
    }
  },
  computed: {
    tileUrl() {
      return `https://api.mapbox.com/styles/v1/${this.username}/${this.styleId}/tiles/{z}/{x}/{y}?access_token=${this.accessToken}`
    },
  },
  methods: {
    clickMarker(marker) {
      const currentTimestamp = Date.now()
      if (currentTimestamp - this.timestamp > 100) this.alertClickMarker(marker)
      this.timestamp = Date.now()
    },
    alertClickMarker(marker) {
      alert(`Clicked marker ${marker.id}!`)
    },
  },
}
</script>

<style>
.leaflet-control-zoom {
  margin-bottom: 10em !important;
}
</style>
