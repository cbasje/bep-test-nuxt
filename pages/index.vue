<template>
  <main>
    <!-- <Tutorial/> -->
    <Map
      :location="location"
      :zoom="zoom"
      :markers="markers"
      class="absolute inset-0 z-0"
    />
    <div class="container absolute inset-x-0 bottom-0 z-50">
      <button
        v-if="platform != '' && platform != 'web'"
        class="
          bg-purple-500
          text-white
          active:bg-purple-600
          font-bold
          uppercase
          text-sm
          px-6
          py-3
          rounded
          mx-auto
          hover:shadow-lg
          outline-none
          focus:outline-none
          ease-linear
          transition-all
          duration-150
        "
        @click="locateUser()"
      >
        Locate
      </button>

      <Popup @close="closeModal($event)">
        <template #content>
          <!--header-->
          <div
            class="
              flex
              items-start
              justify-between
              p-5
              border-b border-solid border-gray-200
              rounded-t
            "
          >
            <h3 class="text-3xl font-semibold">Modal Title</h3>
          </div>
          <!--body-->
          <div class="relative p-6 flex-auto">
            <p class="my-4 text-gray-500 text-lg leading-relaxed">
              I always felt like I could do anything. That’s the main thing
              people are controlled by! Thoughts- their perception of
              themselves! They're slowed down by their perception of themselves.
              If you're taught you can’t do anything, you won’t do anything. I
              was taught I could do everything.
            </p>
          </div>
        </template>
      </Popup>
    </div>
  </main>
</template>

<script lang="ts">
import Vue from 'vue'
import { mapGetters, mapMutations } from 'vuex'

import L from 'leaflet'
import { Geolocation, Position } from '@capacitor/geolocation'
import { Device } from '@capacitor/device'

import { MapMarker } from '~/types/map-marker'

export default Vue.extend({
  data() {
    return {
      gettingLocation: false,
      errorStr: '',
      location: L.latLng(52.175982, 5.645263),
      zoom: 17,
      platform: '',
    }
  },
  computed: {
    ...mapGetters('markers', {
      markers: 'getMarkers',
    }),
  },
  mounted() {
    this.getMarkersFromDatabase()

    this.checkPlatform()
  },
  methods: {
    async checkPlatform() {
      const info = await Device.getInfo()
      this.platform = await info.platform
    },
    async getMarkersFromDatabase() {
      const { body } = await this.$supabase
        .from<MapMarker>('locations')
        .select('*')
      this.addMarkers(body)
    },
    getLocation() {
      return new Promise<L.LatLng>((resolve, reject) => {
        if (!('geolocation' in navigator)) {
          reject(new Error('Geolocation is not available.'))
        }

        navigator.geolocation.getCurrentPosition(
          (pos) => {
            resolve(L.latLng(pos.coords.latitude, pos.coords.longitude))
          },
          (err) => {
            reject(err)
          },
          { enableHighAccuracy: true }
        )
      })
    },
    async locateUser() {
      // this.gettingLocation = true
      // try {
      //   this.gettingLocation = false
      //   this.location = await this.getLocation()
      //   this.zoom = 19
      //   console.log(this.location.lat, this.location.lng)
      // } catch (e) {
      //   this.gettingLocation = false
      //   this.errorStr = e.message
      //   console.log(e)
      // }
      await Geolocation.getCurrentPosition()
        .then((pos: Position) => {
          this.location = L.latLng(pos.coords.latitude, pos.coords.longitude)

          console.log(
            'Current position:',
            pos.coords.latitude,
            pos.coords.longitude
          )
        })
        .catch((error: Error) => {
          this.zoom = 8
          console.log(error.message)
        })
    },
    async closeModal(e: Event) {
      // If clicked 'Save'
      if (e) {
        const { data, error } = await this.$supabase
          .from<MapMarker>('locations')
          .insert([
            {
              title: 'Test locatie',
              latitude: 52,
              longitude: 4,
            },
          ])

        console.log(data, error)

        this.addMarkers(data)
      }
    },
    ...mapMutations('markers', {
      addMarkers: 'addMultiple',
    }),
  },
})
</script>
