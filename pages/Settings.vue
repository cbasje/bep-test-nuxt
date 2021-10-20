<template>
  <popup-content>
    <template #header>Settings</template>

    <template #body>
      <div class="grid grid-cols-3 gap-6">
        <div class="col-span-6 sm:col-span-3">
          <label
            for="title"
            class="block text-sm font-medium text-gray-700 dark:text-gray-200"
          >
            Color mode
          </label>
          <select
            v-model="$colorMode.preference"
            class="
              mt-1
              focus:ring-yellow-500 focus:border-yellow-500
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
            @input="updateStatusBar"
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
            class="text-yellow-600 dark:text-yellow-500 underline"
            href="https://www.openstreetmap.org/copyright"
          >
            OpenStreetMap
          </a>
          contributors, Imagery ©
          <a
            class="text-yellow-600 dark:text-yellow-500 underline"
            href="https://www.mapbox.com/"
          >
            Mapbox
          </a>
        </p>
      </div>
    </template>
  </popup-content>
</template>

<script lang="ts">
import Vue from 'vue'

import { StatusBar, Style } from '@capacitor/status-bar'

import PopupContent from '~/components/PopupContent.vue'

export default Vue.extend({
  components: { PopupContent },
  methods: {
    updateStatusBar() {
      if (!this.$device.isMobileOrTablet) return

      if (this.$colorMode.value === 'dark') this.setStatusBarStyleDark()
      else this.setStatusBarStyleLight()
    },
    async setStatusBarStyleDark() {
      await StatusBar.setStyle({ style: Style.Dark })
    },
    async setStatusBarStyleLight() {
      await StatusBar.setStyle({ style: Style.Light })
    },
  },
})
</script>
