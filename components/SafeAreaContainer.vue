<template>
  <div
    class="safe-area-container absolute z-50 p-3"
    :style="`${xCorner}: 0; ${yCorner}: 0`"
  >
    <slot />
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

import { SafeArea } from 'capacitor-plugin-safe-area'

export default Vue.extend({
  props: {
    xCorner: { type: String, default: 'left' },
    yCorner: { type: String, default: 'top' },
  },
  mounted() {
    if (this.$device.isMobileOrTablet) {
      this.setSafeAreaInsets()
    }
  },
  methods: {
    async setSafeAreaInsets() {
      const { insets } = await SafeArea.getSafeAreaInsets()

      // TODO
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
  },
})
</script>

<style scoped>
.safe-area-container {
  margin: var(--safe-area-inset-top) var(--safe-area-inset-right)
    var(--safe-area-inset-bottom) var(--safe-area-inset-left);
}
</style>
