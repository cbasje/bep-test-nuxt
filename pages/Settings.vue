<template>
  <popup-content>
    <template #header>{{ $t('settings.title') }}</template>

    <template #body>
      <div class="grid grid-cols-3 gap-6">
        <div class="col-span-6 sm:col-span-3">
          <label
            for="title"
            class="block text-sm font-medium text-gray-700 dark:text-gray-200"
          >
            {{ $t('settings.language') }}
          </label>
          <select
            v-model="$i18n.locale"
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
          >
            <option
              v-for="locale in availableLocales"
              :key="locale.code"
              :value="locale.code"
            >
              {{ locale.icon }} {{ locale.name }}
            </option>
          </select>
        </div>
      </div>

      <div class="grid grid-cols-3 gap-6">
        <div class="col-span-6 sm:col-span-3">
          <label
            for="title"
            class="block text-sm font-medium text-gray-700 dark:text-gray-200"
          >
            {{ $t('settings.colorMode') }}
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
            <option value="system">{{ $t('settings.modes.system') }}</option>
            <option value="light">{{ $t('settings.modes.light') }}</option>
            <option value="dark">{{ $t('settings.modes.dark') }}</option>
          </select>
        </div>
      </div>

      <div>
        <p
          class="mt-2 text-sm text-gray-500 dark:text-gray-400"
          v-html="$t('settings.mapAttribution')"
        />
      </div>
    </template>
  </popup-content>
</template>

<script lang="ts">
import Vue from 'vue'
// import { LocaleObject } from '@nuxtjs/i18n'

import { StatusBar, Style } from '@capacitor/status-bar'

import PopupContent from '~/components/PopupContent.vue'

export default Vue.extend({
  components: { PopupContent },
  computed: {
    availableLocales() {
      // FIXME
      return [
        { code: 'en', name: 'English', icon: '🇺🇸' },
        { code: 'nl', name: 'Nederlands', icon: '🇳🇱' },
      ]
    },
  },
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
