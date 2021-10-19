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
                    focus:ring-purple-500 focus:border-purple-500
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
                  placeholder="Typ hier wat meer over je ervaring"
                />
              </div>
              <p class="mt-2 text-sm text-gray-500 dark:text-gray-400">
                Wat vind je niet goed aan deze plek? Of wat vind je wel goed?
              </p>
            </div>

            <!-- <upload-area /> -->
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
        :is-filled="false"
        class="mr-2"
        @click="
          saveChanges()
          $emit('closePopup')
          $router.push({ path: '/' })
        "
      >
        Skip
      </popup-button>
      <popup-button
        :is-filled="true"
        @click="
          saveChanges()
          $emit('closePopup')
          $router.push({ path: '/' })
        "
      >
        Save Changes
      </popup-button>
    </div>
  </section>
</template>

<script lang="ts">
import Vue from 'vue'
import { mapActions, mapGetters, mapMutations } from 'vuex'

import L from 'leaflet'

import { FeedbackResponse, Mood } from '~/types/feedback-response'
import { Solution } from '~/types/solution'

export default Vue.extend({
  data() {
    return {
      mood: Mood.NEUTRAL,
      moodOptions: [
        { id: 1, name: 'Ongemakkelijk', value: 2 },
        { id: 2, name: 'Oké', value: 5 },
        { id: 3, name: 'Lekker', value: 8 },
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
      location: 'getLocation',
      getSolutionById: 'solutions/getSolutionById',
    }),
  },
  mounted() {
    this.checkForId()
    this.checkParams()
  },
  methods: {
    checkForId() {
      if (this.$route.params.id) {
        const id = Number(this.$route.params.id)

        const currentSolution: Solution = this.getSolutionById(id)
        if (currentSolution) {
          this.currentSolution = currentSolution
          this.setLocation(L.latLng(currentSolution.lat, currentSolution.lng))
        }
      }
    },
    checkParams() {
      if (this.$route.query) {
        this.mood = Number(this.$route.query.mood)
      }
    },
    saveChanges() {
      try {
        this.locateUser()

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
      } catch (e) {
        // eslint-disable-next-line no-console
        console.error(e.message)
      }
    },
    ...mapActions({
      locateUser: 'locateUser',
    }),
    ...mapMutations({
      addFeedback: 'feedback/add',
      setLocation: 'setLocation',
    }),
  },
})
</script>
