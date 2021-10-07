<template>
  <div id="map-wrap" style="height: 100vh">
    <client-only>
      <l-map :zoom="8" :center="[52.175982, 5.645263]">
        <l-tile-layer :url="tileUrl"></l-tile-layer>

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

export default {
  props: { markers: { type: Array, default: () => [] } },
  data() {
    return {
      username: 'benjamiin',
      styleId: 'ckud8w32h00ju17pmqbkh7x0u',
      accessToken: process.env.VUE_APP_MAPBOX_TOKEN,
      icon: L.icon({
        iconUrl: require('~/assets/leaf-green.png'),
        iconSize: [38, 95],
        iconAnchor: [19, 47.5]
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
