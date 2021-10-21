<template>
  <div class="absolute">
    <div
      class="
        flex
        overflow-x-hidden overflow-y-scroll
        fixed
        inset-0
        z-50
        outline-none
        focus:outline-none
        justify-center
        items-center
      "
    >
      <div class="relative w-screen p-3 mx-auto max-w-screen-sm max-h-screen">
        <!--content-->
        <div
          class="
            border-0
            rounded-lg
            shadow-lg
            relative
            flex flex-col
            w-full
            bg-white
            dark:bg-gray-900
            outline-none
            focus:outline-none
          "
        >
          <button class="absolute right-5 top-5 text-yellow-600" @click="$router.push(localePath('/'))">
            <close />
          </button>

          <slot />
        </div>
      </div>
    </div>
    <div class="opacity-50 fixed inset-0 z-40 bg-black" />
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

import Close from '~/components/icons/Close.vue'

export default Vue.extend({
  components: {
    Close,
  },
})
</script>
