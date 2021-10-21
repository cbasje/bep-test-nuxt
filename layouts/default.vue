<template>
  <main class="bg-white dark:bg-gray-900">
    <!-- <Tutorial/> -->
    <Map class="absolute inset-0 z-0" />

    <safe-area-container x-corner="right" y-corner="top">
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
          :to="localePath('/settings')"
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
          @click="
            locateUser()
            setZoom(17)
          "
        >
          <locate v-if="!isLoadingLocation" />
          <loader v-else class="animate-spin" />
        </button>
      </div>
    </safe-area-container>

    <safe-area-container x-corner="right" y-corner="bottom">
      <!-- Button trigger popup -->
      <NuxtLink
        v-if="!isAdmin"
        :to="localePath('/feedback/0')"
        class="
          inline-flex
          justify-center
          p-2
          border border-transparent
          shadow-sm
          rounded-full
          text-white
          bg-yellow-600
          dark:bg-yellow-500
          hover:bg-yellow-700
          focus:outline-none
          focus:ring-2
          focus:ring-offset-2
          focus:ring-yellow-500
          ease-linear
          transition-all
          duration-150
        "
      >
        <smile class="w-20 h-20" />
      </NuxtLink>
    </safe-area-container>

    <safe-area-container>
      <popup v-show="showPopup" :save-button="false">
        <!-- The Nuxt content is all in popups -->
        <Nuxt />
      </popup>
    </safe-area-container>
  </main>
</template>

<script lang="ts">
import Vue from 'vue'

import { StatusBar, Style } from '@capacitor/status-bar'
import { Storage } from '@capacitor/storage'

import { mapActions, mapGetters, mapMutations } from 'vuex'
import { Route } from 'vue-router/types'

import Popup from '~/components/Popup.vue'
import SafeAreaContainer from '~/components/SafeAreaContainer.vue'
import Locate from '~/components/icons/Locate.vue'
import Loader from '~/components/icons/Loader.vue'
import Smile from '~/components/icons/Smile.vue'
import User from '~/components/icons/User.vue'

export default Vue.extend({
  components: { Popup, SafeAreaContainer, Locate, Loader, Smile, User },
  data() {
    return {
      currentRoute: '',
      showPopup: false,
    }
  },
  computed: {
    ...mapGetters({
      isAdmin: 'user/isAdmin',
      isLoadingLocation: 'isLoadingLocation',
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

    if (this.$device.isMobileOrTablet) {
      // Display content under transparent status bar (Android only)
      if (this.$device.isAndroid)
        StatusBar.setOverlaysWebView({ overlay: true })

      if (this.$colorMode.value === 'dark') this.setStatusBarStyleDark()
      else this.setStatusBarStyleLight()
    }

    // this.loadSquaresFromDatabase()
    this.loadFeedbackFromDatabase()
    // this.loadSolutionsFromDatabase()

    // FIXME
    this.setAdmin(false)
    this.setAuthenticated(true)
  },
  methods: {
    checkForPopup(to: Route) {
      if (to.path !== this.localePath('/')) {
        this.showPopup = true
        this.currentRoute = String(to.name).toLowerCase()
      } else {
        this.showPopup = false
      }
    },
    async checkForOnboarding() {
      const { value } = await Storage.get({ key: 'userId' })

      if (value == null) {
        this.$router.push(this.localePath('/onboarding'))

        this.addNewUser()
      }
    },
    async setStatusBarStyleDark() {
      await StatusBar.setStyle({ style: Style.Dark })
    },
    async setStatusBarStyleLight() {
      await StatusBar.setStyle({ style: Style.Light })
    },
    ...mapActions({
      addNewUser: 'user/addNewUser',
      locateUser: 'locateUser',
      loadSquaresFromDatabase: 'squares/loadSquares',
      loadFeedbackFromDatabase: 'feedback/loadFeedback',
      loadSolutionsFromDatabase: 'solutions/loadSolutions',
    }),
    ...mapMutations({
      setAdmin: 'user/setAdmin',
      setAuthenticated: 'user/setAuthenticated',
      setZoom: 'setZoom',
    }),
  },
})
</script>
