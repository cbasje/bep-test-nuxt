<template>
  <div id="map-wrap" style="height: 100vh">
    <client-only>
      <l-map
        :zoom="zoom"
        :center="location"
        :options="{ zoomControl: false, attributionControl: false }"
      >
        <l-tile-layer :url="tileUrl" />
        <l-control-zoom v-if="$device.isMobile" position="bottomright" />
        <!-- TODO -->
        <!-- <l-control-attribution position="topright" /> -->

        <l-circle-marker
          v-for="response in feedback"
          :key="response.id"
          :lat-lng="[response.lat, response.lng]"
          :color="response.color"
          :fill-color="response.color"
          @click="clickFeedback(response)"
        />

        <l-polygon
          v-for="polygon in polygons"
          :key="polygon.id"
          :lat-lngs="polygon.square_latlngs"
          :color="polygon.color"
          :fill-color="polygon.color"
          :fill-opacity="0.33"
          @click="clickSquare(polygon)"
        />
      </l-map>
    </client-only>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import L from 'leaflet'

import { Square } from '~/types/square'
import { FeedbackResponse } from '~/types/feedback-response'

export default Vue.extend({
  props: {
    location: L.LatLng,
    zoom: { type: Number, default: 8 },
    polygons: { type: Array, default: () => [] },
    feedback: { type: Array, default: () => [] },
  },
  data() {
    return {
      timestamp: Date.now(),
    }
  },
  computed: {
    tileUrl() {
      const accessToken = process.env.VUE_APP_MAPBOX_TOKEN
      const username = 'benjamiin'
      const styleId = 'ckud8w32h00ju17pmqbkh7x0u'

      return `https://api.mapbox.com/styles/v1/${username}/${styleId}/tiles/{z}/{x}/{y}?access_token=${accessToken}`
    },
  },
  methods: {
    clickFeedback(response: FeedbackResponse) {
      const currentTimestamp = Date.now()
      if (currentTimestamp - this.timestamp > 100) this.alertClickFeedback(response)
      this.timestamp = Date.now()
    },
    alertClickFeedback(response: FeedbackResponse) {
      alert(`Clicked feedback from ${response.person}!`)
    },
    clickSquare(square: Square) {
      const currentTimestamp = Date.now()
      if (currentTimestamp - this.timestamp > 100) this.alertClickSquare(square)
      this.timestamp = Date.now()
    },
    alertClickSquare(square: Square) {
      alert(`Clicked square ${square.name}!`)
    },
  },
})
</script>

<style>
.leaflet-control-zoom {
  margin-bottom: calc(10px + var(--safe-area-inset-bottom)) !important;
}
.leaflet-control-attribution {
  margin-top: var(--safe-area-inset-top) !important;
}
</style>
