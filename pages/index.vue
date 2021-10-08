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
      <div>
        <h1>Color mode: {{ $colorMode.value }}</h1>
        <select v-model="$colorMode.preference">
          <option value="system">System</option>
          <option value="light">Light</option>
          <option value="dark">Dark</option>
          <option value="sepia">Sepia</option>
        </select>
      </div>
      <button
        v-if="$device.isMobile"
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
          <!--body-->
          <div class="mt-5 md:mt-0 md:col-span-2">
            <form action="#" method="POST">
              <div class="sm:overflow-hidden">
                <div class="px-4 py-5 space-y-6 sm:p-6">
                  <div class="grid grid-cols-3 gap-6">
                    <div class="col-span-6 sm:col-span-3">
                      <label
                        for="first-name"
                        class="
                          block
                          text-sm
                          font-medium
                          text-gray-700
                          dark:text-gray-200
                        "
                      >
                        Titel
                      </label>
                      <input
                        id="first-name"
                        type="text"
                        name="first-name"
                        autocomplete="given-name"
                        class="
                          mt-1
                          focus:ring-indigo-500 focus:border-indigo-500
                          block
                          w-full
                          shadow-sm
                          sm:text-sm
                          bg-transparent
                          dark:text-white
                          border-gray-300
                          dark:border-gray-600
                          rounded-md
                        "
                      />
                    </div>
                  </div>

                  <div>
                    <label
                      for="about"
                      class="
                        block
                        text-sm
                        font-medium
                        text-gray-700
                        dark:text-gray-200
                      "
                    >
                      Notitie
                    </label>
                    <div class="mt-1">
                      <textarea
                        id="about"
                        name="about"
                        rows="3"
                        class="
                          shadow-sm
                          focus:ring-indigo-500 focus:border-indigo-500
                          mt-1
                          block
                          w-full
                          sm:text-sm
                          bg-transparent
                          dark:text-white
                          border border-gray-300
                          dark:border-gray-600
                          rounded-md
                        "
                        placeholder="you@example.com"
                      />
                    </div>
                    <p class="mt-2 text-sm text-gray-500 dark:text-gray-400">
                      Brief description for your profile. URLs are hyperlinked.
                    </p>
                  </div>

                  <div>
                    <label
                      class="
                        block
                        text-sm
                        font-medium
                        text-gray-700
                        dark:text-gray-200
                      "
                    >
                      Foto
                    </label>
                    <div
                      class="
                        mt-1
                        flex
                        justify-center
                        px-6
                        pt-5
                        pb-6
                        border-2 border-gray-300
                        dark:border-gray-600
                        border-dashed
                        rounded-md
                      "
                    >
                      <div class="space-y-1 text-center">
                        <svg
                          class="
                            mx-auto
                            h-12
                            w-12
                            text-gray-400
                            dark:text-gray-500
                          "
                          stroke="currentColor"
                          fill="none"
                          viewBox="0 0 48 48"
                          aria-hidden="true"
                        >
                          <path
                            d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                            stroke-width="2"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          />
                        </svg>
                        <div
                          class="flex text-sm text-gray-600 dark:text-gray-300"
                        >
                          <label
                            for="file-upload"
                            class="
                              relative
                              cursor-pointer
                              bg-transparent
                              rounded-md
                              font-medium
                              text-indigo-600
                              dark:text-indigo-500
                              hover:text-indigo-500
                              focus-within:outline-none
                              focus-within:ring-2
                              focus-within:ring-offset-2
                              focus-within:ring-indigo-500
                            "
                          >
                            <span>Upload a file</span>
                            <input
                              id="file-upload"
                              name="file-upload"
                              type="file"
                              class="sr-only"
                            />
                          </label>
                          <p class="pl-1">or drag and drop</p>
                        </div>
                        <p class="text-xs text-gray-500 dark:text-gray-400">
                          PNG, JPG, GIF up to 10MB
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </form>
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
import { SafeArea } from 'capacitor-plugin-safe-area'

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

    this.setSafeAreaInsets()
  },
  methods: {
    async setSafeAreaInsets() {
      const { insets } = await SafeArea.getSafeAreaInsets()

      // FIXME
      // for (const inset in insets) {
      //   document.documentElement.style.setProperty(
      //     `--safe-area-inset-${inset}`,
      //     `${insets[`inset`]}px`
      //   )
      // }
      document.documentElement.style.setProperty(
          `--safe-area-inset-top`,
          `${insets.top}px`
        )
      document.documentElement.style.setProperty(
          `--safe-area-inset-right`,
          `${insets.right}px`
        )
      document.documentElement.style.setProperty(
          `--safe-area-inset-bottom`,
          `${insets.bottom}px`
        )
      document.documentElement.style.setProperty(
          `--safe-area-inset-left`,
          `${insets.left}px`
        )

      console.log(`Insets: ${insets}`)
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
