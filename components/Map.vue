<template>
  <div id="map-wrap" style="height: 100vh">
    <client-only>
      <l-map
        :zoom="zoom"
        :center="location"
        :options="{ zoomControl: false, attributionControl: false }"
      >
        <l-tile-layer v-if="$colorMode.value == 'dark'" :url="tileUrlDark" />
        <l-tile-layer v-else :url="tileUrl" />
        <!-- TODO -->
        <!-- <l-control-zoom v-if="$device.isMobile" position="bottomright" /> -->
        <!-- <l-control-attribution position="topright" /> -->

        <l-circle-marker
          v-for="response in feedback"
          :key="response.id"
          :lat-lng="[response.lat, response.lng]"
          :color="moodColor(response.mood)"
          :fill-color="moodColor(response.mood)"
          :fill-opacity="0.33"
          @click="clickFeedback(response)"
        />

        <l-polygon
          v-for="square in squares"
          :key="square.id"
          :lat-lngs="square.square_latlngs"
          :color="square.color"
          :fill-color="square.color"
          :fill-opacity="0.33"
          @click="clickSquare(square)"
        />
      </l-map>
    </client-only>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { mapGetters } from 'vuex'

import { Square } from '~/types/square'
import { FeedbackResponse, Mood } from '~/types/feedback-response'

export default Vue.extend({
  data() {
    return {
      timestamp: Date.now(),
    }
  },
  computed: {
    tileUrl(): string {
      const accessToken = process.env.VUE_APP_MAPBOX_TOKEN
      const username = 'benjamiin'
      const styleId = 'ckud8w32h00ju17pmqbkh7x0u'

      return `https://api.mapbox.com/styles/v1/${username}/${styleId}/tiles/{z}/{x}/{y}?access_token=${accessToken}`
    },
    tileUrlDark(): string {
      const accessToken = process.env.VUE_APP_MAPBOX_TOKEN
      const username = 'benjamiin'
      const styleId = 'ckikyehft1ese17qsrgq50p2n'

      return `https://api.mapbox.com/styles/v1/${username}/${styleId}/tiles/{z}/{x}/{y}?access_token=${accessToken}`
    },
    ...mapGetters({
      location: 'getLocation',
      zoom: 'getZoom',
      squares: 'squares/getSquares',
      feedback: 'feedback/getFeedback',
      solutions: 'solutions/getSolutions'
    })
  },
  methods: {
    clickFeedback(response: FeedbackResponse) {
      const currentTimestamp = Date.now()
      if (currentTimestamp - this.timestamp > 100)
        this.alertClickFeedback(response)
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
    moodColor(mood: Mood): string {
      switch (mood) {
        case Mood.WARMER:
          return '#F3573B'
        case Mood.NEUTRAL:
          return '#F6BF42'
        case Mood.COLDER:
          return '#007AFF'
      }
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
