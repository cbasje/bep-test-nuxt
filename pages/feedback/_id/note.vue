<template>
  <popup-content>
    <template #header>
      {{ currentSolution.name ? currentSolution.name : title }}
    </template>

    <template #body>
      <form id="submitForm" @submit.prevent>
        <div>
          <label
            for="note"
            class="block text-sm font-medium text-gray-700 dark:text-gray-200"
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
                focus:ring-yellow-500 focus:border-yellow-500
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
      </form>
    </template>

    <template #footer>
      <popup-button
        :is-filled="false"
        class="mr-2"
        @click="
          saveChanges()
          $emit('closePopup')
          $router.push({ path: '/' })
        "
      >
        Overslaan
      </popup-button>
      <popup-button
        :is-filled="true"
        @click="
          saveChanges()
          $emit('closePopup')
          $router.push({ path: '/' })
        "
      >
        Opslaan
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

import { FeedbackResponse, Mood } from '~/types/feedback-response'
import { Solution } from '~/types/solution'

export default Vue.extend({
  components: { PopupContent, PopupButton },
  data() {
    return {
      mood: Mood.NEUTRAL,
      note: '',
      currentSolution: {} as Solution,
      title: 'Feedback geven',
    }
  },
  computed: {
    ...mapGetters({
      location: 'getLocation',
      getSolutionById: 'solutions/getSolutionById',
      user: 'user/getUser',
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
    async saveChanges() {
      let feedbackResponse: FeedbackResponse

      try {
        // FIXME
        // const temp = await this.getWeather()
        const temp = 0

        // Check if feedback is for solution or not
        if (this.currentSolution.id === 0) {
          const location: L.LatLng = await this.locateUser()

          feedbackResponse = {
            user: this.user.id,
            mood: this.mood,
            note: this.note,
            temp,
            lat: location.lat,
            lng: location.lng,
          }
        } else {
          feedbackResponse = {
            user: this.user.id,
            mood: this.mood,
            note: this.note,
            temp,
            solution: this.currentSolution.id,
            lat: 0,
            lng: 0,
          }
        }

        this.saveFeedback(feedbackResponse)
      } catch (e) {
        // eslint-disable-next-line no-console
        console.log(e)
      } finally {
        this.mood = Mood.NEUTRAL
        this.note = ''
      }
    },
    ...mapActions({
      locateUser: 'locateUser',
      getWeather: 'feedback/getWeather',
      saveFeedback: 'feedback/saveFeedback',
    }),
    ...mapMutations({
      addFeedback: 'feedback/add',
      setLocation: 'setLocation',
      setZoom: 'setZoom',
    }),
  },
})
</script>
