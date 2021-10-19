<template>
  <section>
    <!--header-->
    <div
      class="
        flex
        items-start
        justify-between
        p-5
        border-b border-solid border-gray-200
        dark:border-gray-700
        rounded-t
      "
    >
      <h3 class="text-3xl font-semibold dark:text-white">
        {{ currentSolution.name }}
      </h3>
    </div>
    <!--body-->
    <div class="mt-5 md:mt-0 md:col-span-2">
      <form id="submitForm" @submit.prevent>
        <div class="sm:overflow-hidden">
          <div class="px-4 py-5 space-y-6 sm:p-6">
            <div class="flex">
              <span class="text-9xl mx-auto">{{ moodOptions[mood-1].emoji }}</span>
            </div>

            <div class="grid grid-cols-3 gap-6">
              <div class="col-span-6 sm:col-span-3">
                <label
                  for="range"
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
                        bg-purple-600
                        hover:bg-purple-700
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
                  <div class="flex justify-between mt-2 text-xs text-gray-600">
                    <span
                      v-for="option in moodOptions"
                      :key="option.id"
                      class="w-8 text-center"
                      >{{ option.name }}</span
                    >
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>

    <!--footer-->
    <div
      class="
        flex
        items-center
        justify-end
        p-5
        border-t border-solid border-gray-200
        dark:border-gray-700
        rounded-b
      "
    >
      <popup-button
        :is-filled="true"
        @click="
          $router.push({
            path: `${currentSolution.id}/note`,
            query: { mood: mood },
          })
        "
      >
        Volgende
      </popup-button>
    </div>
  </section>
</template>

<script lang="ts">
import Vue from 'vue'
import { mapGetters, mapMutations } from 'vuex'

import L from 'leaflet'

import { Solution } from '~/types/solution'
import { Mood } from '~/types/feedback-response'

export default Vue.extend({
  data() {
    return {
      mood: Mood.NEUTRAL,
      moodOptions: [
        { id: 1, name: 'Warm', value: Mood.WARMER, emoji: '🥵' },
        { id: 2, name: 'Neutraal', value: Mood.NEUTRAL, emoji: '😐' },
        { id: 3, name: 'Koel', value: Mood.COLDER, emoji: '🥶' },
      ],
      note: '',
      currentSolution: {
        id: 0,
        name: 'Feedback',
      },
    }
  },
  computed: {
    ...mapGetters({
      getSolutionById: 'solutions/getSolutionById',
    }),
  },
  mounted() {
    this.checkForId()
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
    ...mapMutations({
      setLocation: 'setLocation',
    }),
  },
})
</script>
