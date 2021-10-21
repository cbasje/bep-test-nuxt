<template>
  <popup-content>
    <template #header>Feedback: {{ moodEmoji(currentResponse.mood) }}</template>

    <template #body>
      <p class="text-base text-black dark:text-white">
        {{ currentResponse.note }}
      </p>
    </template>
  </popup-content>
</template>

<script lang="ts">
import Vue from 'vue'
import { mapGetters } from 'vuex'

import PopupContent from '~/components/PopupContent.vue'
import { FeedbackResponse, Mood } from '~/types/feedback-response'

export default Vue.extend({
  components: { PopupContent },
  data() {
    return {
      currentResponse: {} as FeedbackResponse,
    }
  },
  computed: {
    ...mapGetters({
      getFeedbackById: 'feedback/getFeedbackById',
    }),
  },
  mounted() {
    this.checkForId()
  },
  methods: {
    checkForId() {
      if (this.$route.params.id && this.$route.params.id !== '0') {
        const id = Number(this.$route.params.id)

        const currentResponse: FeedbackResponse = this.getFeedbackById(id)
        if (currentResponse) {
          this.currentResponse = currentResponse
        }
      }
    },
    moodEmoji(mood: Mood): string {
      switch (mood) {
        case Mood.WARMER:
          return '🥵'
        case Mood.NEUTRAL:
          return '😐'
        case Mood.COLDER:
          return '🥶'
      }
    },
  },
})
</script>
