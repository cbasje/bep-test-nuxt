<template>
  <main>
    <!-- <Tutorial/> -->
    <Map
      :location="location"
      :zoom="zoom"
      :feedback="feedback"
      :polygons="squares"
      class="absolute inset-0 z-0"
    />
    <!-- <div class="absolute inset-0 z-50"> -->
      <div
        class="
          absolute
          inset-y-0
          z-50
          right-0
          p-3
          flex flex-col
          justify-between
          items-end
        "
      >
        <!-- Button trigger modal -->
        <button
          class="
            inline-flex
            justify-center
            py-2
            px-3
            border border-transparent
            shadow-sm
            text-sm
            font-medium
            rounded-md
            text-black
            bg-white
            hover:bg-gray-100
            focus:outline-none
            focus:ring-2
            focus:ring-offset-2
            focus:ring-gray-300
            ease-linear
            transition-all
            duration-150
          "
          @click="showSettingsModal = true"
        >
          <user />
        </button>
        <popup
          v-show="showSettingsModal"
          :save-button="false"
          @close="showSettingsModal = false"
        >
          <template #title>Settings</template>
          <template #content>
            <div class="sm:overflow-hidden">
              <div class="px-4 py-5 space-y-6 sm:p-6">
                <div class="grid grid-cols-3 gap-6">
                  <div class="col-span-6 sm:col-span-3">
                    <label
                      for="title"
                      class="
                        block
                        text-sm
                        font-medium
                        text-gray-700
                        dark:text-gray-200
                      "
                    >
                      Color mode
                    </label>
                    <select
                      v-model="$colorMode.preference"
                      class="
                        mt-1
                        focus:ring-blue-500 focus:border-blue-500
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
                    >
                      <option value="system">System</option>
                      <option value="light">Light</option>
                      <option value="dark">Dark</option>
                    </select>
                  </div>
                </div>

                <div>
                  <p class="dark:text-white">
                    Map data &copy;
                    <a
                      class="text-blue-700 dark:text-blue-500 underline"
                      href="https://www.openstreetmap.org/copyright"
                    >
                      OpenStreetMap
                    </a>
                    contributors, Imagery ©
                    <a
                      class="text-blue-700 dark:text-blue-500 underline"
                      href="https://www.mapbox.com/"
                    >
                      Mapbox
                    </a>
                  </p>
                </div>
              </div>
            </div>
          </template>
        </popup>
        <modal-button
          v-if="$device.isMobile"
          class="mb-1"
          :is-filled="true"
          @click="locateUser()"
        >
          Locate
        </modal-button>

        <!-- Button trigger modal -->
        <button
          class="
            inline-flex
            justify-center
            p-2
            border border-transparent
            shadow-sm
            rounded-full
            text-white
            bg-blue-600
            hover:bg-blue-700
            focus:outline-none
            focus:ring-2
            focus:ring-offset-2
            focus:ring-blue-500
            ease-linear
            transition-all
            duration-150
          "
          @click="showMarkerPopup = true"
        >
          <smile class="w-20 h-20" />
        </button>
        <popup
          v-show="showMarkerPopup"
          :save-button="true"
          @close="
            closeModal($event)
            showMarkerPopup = false
          "
        >
          <template #title>Add Marker</template>
          <template #content>
            <form id="submitForm" @submit.prevent>
              <div class="sm:overflow-hidden">
                <div class="px-4 py-5 space-y-6 sm:p-6">
                  <div class="grid grid-cols-3 gap-6">
                    <div class="col-span-6 sm:col-span-3">
                      <label
                        for="select"
                        class="
                          block
                          text-sm
                          font-medium
                          text-gray-700
                          dark:text-gray-200
                        "
                      >
                        Hoe voel je je hier?
                      </label>
                      <select
                        id="select"
                        v-model="mood"
                        class="
                          mt-1
                          focus:ring-blue-500 focus:border-blue-500
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
                      >
                        <option
                          v-for="option in moodOptions"
                          :key="option.id"
                          :value="option.value"
                        >
                          {{ option.name }}
                        </option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label
                      for="note"
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
                        id="note"
                        v-model="note"
                        rows="3"
                        class="
                          shadow-sm
                          focus:ring-blue-500 focus:border-blue-500
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
                              text-blue-600
                              dark:text-blue-500
                              hover:text-blue-500
                              focus-within:outline-none
                              focus-within:ring-2
                              focus-within:ring-offset-2
                              focus-within:ring-blue-500
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
          </template>
        </popup>
      </div>
    <!-- </div> -->
  </main>
</template>

<script lang="ts">
import Vue from 'vue'
import { mapGetters, mapMutations } from 'vuex'

import L from 'leaflet'
// FIXME
// eslint-disable-next-line import/named
import { Geolocation, Position } from '@capacitor/geolocation'

import { Square } from '~/types/square'
import ModalButton from '~/components/ModalButton.vue'
import Popup from '~/components/Popup.vue'
import Smile from '~/components/icons/Smile.vue'
import User from '~/components/icons/User.vue'
import { FeedbackResponse } from '~/types/feedback-response'

export default Vue.extend({
  components: { ModalButton, Popup, Smile, User },
  data() {
    return {
      mood: 5,
      moodOptions: [
        { id: 1, name: 'Ongemakkelijk', value: 2 },
        { id: 2, name: 'Oké', value: 5 },
        { id: 3, name: 'Lekker', value: 8 },
      ],
      note: '',
      gettingLocation: false,
      errorStr: '',
      // location: L.latLng(52.175982, 5.645263),
      location: L.latLng(52.002, 4.371),
      zoom: 17,
      platform: '',
      showSettingsModal: false,
      showMarkerPopup: false,
    }
  },
  computed: {
    ...mapGetters({
      squares: 'squares/getSquares',
      feedback: 'feedback/getFeedback',
    }),
  },
  mounted() {
    this.getSquaresFromDatabase()
    this.getFeedbackFromDatabase()
  },
  methods: {
    async getSquaresFromDatabase() {
      const { body } = await this.$supabase.from<Square>('squares').select(`
        id,
        name,
        created_at,
        square_latlngs (
          lat, lng
        ),
        color
      `)

      if (body == null) return
      this.setSquares(body)
    },
    async getFeedbackFromDatabase() {
      const { body } = await this.$supabase.from<FeedbackResponse>('feedback').select('*')

      if (body == null) return
      this.setFeedback(body)
    },
    async locateUser() {
      await Geolocation.getCurrentPosition()
        .then((pos: Position) => {
          this.location = L.latLng(pos.coords.latitude, pos.coords.longitude)
        })
        .catch((error: Error) => {
          this.zoom = 8
          // eslint-disable-next-line no-console
          console.error(error.message)
        })
    },
    closeModal(event: Event) {
      // If clicked 'Save'
      if (event) {
        this.locateUser().then(() => {
          // FIXME
          this.$supabase
            .from<FeedbackResponse>('feedback')
            .insert([
              {
                person: 'Persoon',
                mood: this.mood,
                note: this.note,
                lat: this.location.lat,
                lng: this.location.lng,
              },
            ])
            .then(
              (data) => {
                this.addFeedback(data)
                this.mood = 5
                this.note = ''
              },
              (error) => {
                // eslint-disable-next-line no-console
                console.error(error.message)
              }
            )
        })
      }
    },
    ...mapMutations({
      setSquares: 'squares/setSquares',
      setFeedback: 'feedback/setFeedback',
      addFeedback: 'feedback/add',
    }),
  },
})
</script>

<style scoped>
.container {
  margin: var(--safe-area-inset-top) var(--safe-area-inset-right)
    var(--safe-area-inset-bottom) var(--safe-area-inset-left);
}
</style>
