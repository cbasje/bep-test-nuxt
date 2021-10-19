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
        safe-area-container
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
      <div
        class="
          inline-flex
          flex-col
          border border-transparent
          shadow-sm
          text-sm
          font-medium
          rounded-md
          gap-1
          text-black
          bg-white
          ease-linear
          transition-all
          duration-150
        "
      >
        <!-- Button trigger popup -->
        <NuxtLink
          to="/settings"
          class="
            inline-flex
            justify-center
            py-2
            px-3
            bg-transparent
            hover:bg-gray-100
            focus:outline-none
            focus:ring-2
            focus:ring-offset-2
            focus:ring-gray-300
          "
          @click="showSettingsPopup = true"
        >
          <user />
        </NuxtLink>

        <div v-if="!isAdmin" class="h-[1px] mx-2 flex-grow bg-gray-400" />

        <button
          v-if="!isAdmin"
          class="
            inline-flex
            justify-center
            py-2
            px-3
            bg-transparent
            hover:bg-gray-100
            focus:outline-none
            focus:ring-2
            focus:ring-offset-2
            focus:ring-gray-300
          "
          :is-filled="true"
          @click="locateUser()"
        >
          <locate />
        </button>
      </div>

      <!-- Button trigger popup -->
      <NuxtLink
        v-if="!isAdmin"
        to="/settings"
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
      >
        <smile class="w-20 h-20" />
      </NuxtLink>
      <popup v-show="showPopup" :save-button="false">
        <template #title>{{
          currentRoute ? popups[currentRoute].title : ''
        }}</template>
        <template #content @closePopup="closePopup">
          <Nuxt />
        </template>
      </popup>
    </div>
  </main>
</template>

<script lang="ts">
import Vue from 'vue'

import { StatusBar, Style } from '@capacitor/status-bar'
import { SafeArea } from 'capacitor-plugin-safe-area'

import { mapGetters, mapMutations } from 'vuex'
import { Route } from 'vue-router/types'

import L from 'leaflet'

import { Square } from '~/types/square'
import { FeedbackResponse } from '~/types/feedback-response'
import { Solution } from '~/types/solution'

import Popup from '~/components/Popup.vue'
import Locate from '~/components/icons/Locate.vue'
import Smile from '~/components/icons/Smile.vue'
import User from '~/components/icons/User.vue'

export default Vue.extend({
  components: { Popup, Locate, Smile, User },
  data() {
    return {
      currentRoute: '',
      showPopup: false,
      popups: {
        feedback: {
          title: 'Feedback',
        },
        settings: {
          title: 'Settings',
        },
      },
      zoom: 17,
      currentFeedbackSolutionId: 0,
    }
  },
  computed: {
    ...mapGetters({
      squares: 'squares/getSquares',
      feedback: 'feedback/getFeedback',
      getSolutionById: 'solutions/getSolutionById',
      isAdmin: 'isAdmin',
      location: 'getLocation',
    }),
  },
  watch: {
    $route(to, _from) {
      // console.log('Route', to, from)
      this.checkForPopup(to)
    },
  },
  mounted() {
    this.checkForPopup(this.$route)

    this.setSafeAreaInsets()

    if (this.$colorMode.value === 'dark') this.setStatusBarStyleDark()
    else this.setStatusBarStyleLight()

    this.getSquaresFromDatabase()
    this.getFeedbackFromDatabase()
    this.getSolutionsFromDatabase()

    // FIXME
    this.setAdmin(!this.$device.isMobile)
    this.setAuthenticated(true)
  },
  methods: {
    checkForPopup(to: Route) {
      if (to.path !== '/') {
        this.showPopup = true
        this.currentRoute = String(to.name).toLowerCase()
      } else {
        this.showPopup = false
      }
    },
    async setSafeAreaInsets() {
      const { insets } = await SafeArea.getSafeAreaInsets()

      // FIXME
      for (const inset in insets) {
        let value = 0
        switch (inset) {
          case 'top':
            value = insets.top
            break
          case 'right':
            value = insets.right
            break
          case 'bottom':
            value = insets.bottom
            break
          case 'left':
            value = insets.left
            break
          default:
            break
        }
        document.documentElement.style.setProperty(
          `--safe-area-inset-${inset}`,
          `${value}px`
        )
      }
    },
    async setStatusBarStyleDark() {
      await StatusBar.setStyle({ style: Style.Dark })
    },
    async setStatusBarStyleLight() {
      await StatusBar.setStyle({ style: Style.Light })
    },
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
      const { body } = await this.$supabase
        .from<FeedbackResponse>('feedback')
        .select('*')

      if (body == null) return
      this.setFeedback(body)
    },
    async getSolutionsFromDatabase() {
      const { body } = await this.$supabase
        .from<Solution>('gv_solutions')
        .select('*')

      if (body == null) return
      this.setSolutions(body)
      this.openPopupForSolution()
    },
    openPopupForSolution() {
      if (this.$route.query.sol && typeof this.$route.query.sol === 'string') {
        this.currentFeedbackSolutionId = Number(this.$route.query.sol)

        const currentSolution: Solution = this.getSolutionById(
          this.currentFeedbackSolutionId
        )
        if (currentSolution) {
          this.feedback.title = currentSolution.name
          this.setLocation(L.latLng(currentSolution.lat, currentSolution.lng))

          this.showPopup = true
        }
      }
    },
    closePopup() {
      // this.$router.push({ path: '/' })
    },
    ...mapMutations({
      setSquares: 'squares/setSquares',
      setFeedback: 'feedback/setFeedback',
      addFeedback: 'feedback/add',
      setSolutions: 'solutions/setSolutions',
      setAdmin: 'setAdmin',
      setAuthenticated: 'setAuthenticated',
      setLocation: 'setLocation',
    }),
  },
})
</script>

<style scoped>
.safe-area-container {
  margin: var(--safe-area-inset-top) var(--safe-area-inset-right)
    var(--safe-area-inset-bottom) var(--safe-area-inset-left);
}
</style>
