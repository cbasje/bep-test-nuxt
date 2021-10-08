<template>
  <Nuxt />
</template>

<script lang="ts">
import Vue from 'vue'

import { StatusBar, Style } from '@capacitor/status-bar'
import { SafeArea } from 'capacitor-plugin-safe-area'

export default Vue.extend({
  mounted() {
    this.setSafeAreaInsets()

    if (this.$colorMode.value === 'dark') this.setStatusBarStyleDark()
    else this.setStatusBarStyleLight()
  },
  methods: {
    async setSafeAreaInsets() {
      const { insets } = await SafeArea.getSafeAreaInsets()

      // FIXME
      // for (const inset in insets) {
      //   document.documentElement.style.setProperty(
      //     `--safe-area-inset-${inset}`,
      //     `${insets[`inset`]}px`
      //   )
      // }
      document.documentElement.style.setProperty(
        `--safe-area-inset-top`,
        `${insets.top}px`
      )
      document.documentElement.style.setProperty(
        `--safe-area-inset-right`,
        `${insets.right}px`
      )
      document.documentElement.style.setProperty(
        `--safe-area-inset-bottom`,
        `${insets.bottom}px`
      )
      document.documentElement.style.setProperty(
        `--safe-area-inset-left`,
        `${insets.left}px`
      )
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
