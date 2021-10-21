<template>
  <popup-content>
    <template #header>
      {{ currentSolution.name ? currentSolution.name : title }}
    </template>

    <template #body>
      <form id="submitForm" @submit.prevent>
        <div class="flex justify-center pb-5">
          <span class="text-9xl">{{ moodOptions[mood - 1].emoji }}</span>
        </div>

        <div class="grid grid-cols-3 gap-6">
          <div class="col-span-6 sm:col-span-3">
            <label
              for="range"
              class="block text-base font-medium text-black dark:text-white"
            >
              {{ $t('feedback.question') }}
            </label>

            <div class="mt-1">
              <!-- <div class="bg-gray-300 h-2 w-full rounded-full relative">
                  <input
                    id="range"
                    v-model="mood"
                    type="range"
                    min="1"
                    max="3"
                  />
                  <span
                    :class="`
                      bg-yellow-600
                      hover:bg-yellow-700
                      h-2
                      absolute
                      left-0
                      top-0
                      rounded-full
                    `"
                    :style="`width: ${
                      ((mood - 1) / (moodOptions.length - 1)) * 100
                    }%`"
                  />
                </div> -->
              <input
                id="range"
                v-model="mood"
                type="range"
                min="1"
                max="3"
                class="w-full"
              />
              <div
                class="
                  flex
                  justify-between
                  mt-2
                  text-xs text-gray-600
                  dark:text-gray-400
                "
              >
                <span
                  v-for="option in moodOptions"
                  :key="option.id"
                  class="w-8 text-center"
                >
                  {{ option.name }}
                </span>
              </div>
            </div>
          </div>
        </div>
      </form>
    </template>

    <template #footer>
      <popup-button
        :is-filled="true"
        @click="
          $router.push(
            localeLocation({
              path: `${currentSolution.id}/note`,
              query: { mood: mood },
            })
          )
        "
      >
        {{ $t('feedback.nextButton') }}
      </popup-button>
    </template>
  </popup-content>
</template>

<script lang="ts">
import Vue from 'vue'
import { mapActions, mapGetters, mapMutations } from 'vuex'

import L from 'leaflet'

import PopupContent from '~/components/PopupContent.vue'
import PopupButton from '~/components/PopupButton.vue'

import { Solution } from '~/types/solution'
import { Mood } from '~/types/feedback-response'

export default Vue.extend({
  components: { PopupContent, PopupButton },
  data() {
    return {
      mood: Mood.NEUTRAL,
      moodOptions: [
        {
          id: 1,
          name: this.$t('feedback.moodOptions.cold'),
          value: Mood.COLDER,
          emoji: '🥶',
        },
        {
          id: 2,
          name: this.$t('feedback.moodOptions.neutral'),
          value: Mood.NEUTRAL,
          emoji: '😐',
        },
        {
          id: 3,
          name: this.$t('feedback.moodOptions.hot'),
          value: Mood.WARMER,
          emoji: '🥵',
        },
      ],
      note: '',
      currentSolution: {} as Solution,
      title: this.$t('feedback.title'),
    }
  },
  computed: {
    ...mapGetters({
      getSolutionById: 'solutions/getSolutionById',
    }),
  },
  mounted() {
    this.checkForId()
    this.updateLocation()
  },
  methods: {
    checkForId() {
      if (this.$route.params.id && this.$route.params.id !== '0') {
        const id = Number(this.$route.params.id)

        const currentSolution: Solution = this.getSolutionById(id)
        if (currentSolution) {
          this.currentSolution = currentSolution
          this.setLocation(L.latLng(currentSolution.lat, currentSolution.lng))
        }
      }
    },
    async getWeather(location: L.LatLng) {
      const { data } = await this.$axios.get(
        `https://api.openweathermap.org/data/2.5/weather?lat=${location.lat}&lon=${location.lng}&appid=4b3ab421eec8ff1a3dd622d82f1225d6&units=metric&lang=nl`
      )
      console.log('getWeather', data)
    },
    async updateLocation() {
      const location = await this.locateUser()

      this.getWeather(location)
    },
    ...mapActions({
      locateUser: 'locateUser',
    }),
    ...mapMutations({
      setLocation: 'setLocation',
    }),
  },
})
</script>
