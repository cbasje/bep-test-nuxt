<template>
  <main class="bg-white dark:bg-gray-900">
    <!-- <Tutorial/> -->
    <Map class="absolute inset-0 z-0" />
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
          dark:text-white
          bg-white
          dark:bg-gray-900
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
            background-transparent
            hover:bg-gray-100
            dark:hover:bg-gray-800
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
            background-transparent
            hover:bg-gray-100
            dark:hover:bg-gray-800
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
        v-if="!isAdmin && !$device.isDesktop"
        to="/feedback/0"
        class="
          inline-flex
          justify-center
          p-2
          border border-transparent
          shadow-sm
          rounded-full
          text-white
          bg-purple-600
          hover:bg-purple-700
          focus:outline-none
          focus:ring-2
          focus:ring-offset-2
          focus:ring-purple-500
          ease-linear
          transition-all
          duration-150
        "
      >
        <smile class="w-20 h-20" />
      </NuxtLink>
      <popup v-show="showPopup" :save-button="false">
        <!-- The Nuxt content is all in popups -->
        <Nuxt />
      </popup>
    </div>
  </main>
</template>

<script lang="ts">
import Vue from 'vue'

import { StatusBar, Style } from '@capacitor/status-bar'
import { SafeArea } from 'capacitor-plugin-safe-area'
import { Storage } from '@capacitor/storage'

import { mapActions, mapGetters, mapMutations } from 'vuex'
import { Route } from 'vue-router/types'

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
    }
  },
  computed: {
    ...mapGetters({
      isAdmin: 'user/isAdmin',
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
    this.checkForOnboarding()

    if (!this.$device.isDesktop) {
      this.setSafeAreaInsets()

      // Display content under transparent status bar (Android only)
      if (this.$device.isAndroid)
        StatusBar.setOverlaysWebView({ overlay: true })

      if (this.$colorMode.value === 'dark') this.setStatusBarStyleDark()
      else this.setStatusBarStyleLight()

      this.getUserLocation()
    }

    // this.loadSquaresFromDatabase()
    this.loadFeedbackFromDatabase()
    // this.loadSolutionsFromDatabase()

    // FIXME
    // this.setAdmin(!this.$device.isMobile)
    this.setAdmin(false)
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
    async checkForOnboarding() {
      const { value } = await Storage.get({ key: 'userId' })

      if (value == null) {
        this.$router.push('/onboarding')

        this.addNewUser()
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
    async getUserLocation() {
      try {
        const latLng = await this.locateUser()

        console.log('locateUser', latLng)

        this.setLocation(latLng)
        this.setZoom(17)
      } catch (e) {
        console.log(e)
      }
    },
    ...mapActions({
      addNewUser: 'user/addNewUser',
      locateUser: 'user/locateUser',
      loadSquaresFromDatabase: 'squares/loadSquares',
      loadFeedbackFromDatabase: 'feedback/loadFeedback',
      loadSolutionsFromDatabase: 'solutions/loadSolutions',
    }),
    ...mapMutations({
      setSquares: 'squares/setSquares',
      setFeedback: 'feedback/setFeedback',
      addFeedback: 'feedback/add',
      setSolutions: 'solutions/setSolutions',
      setAdmin: 'user/setAdmin',
      setAuthenticated: 'user/setAuthenticated',
      setLocation: 'setLocation',
      setZoom: 'setZoom',
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
