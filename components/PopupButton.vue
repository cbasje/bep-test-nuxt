<template>
  <button
    v-if="isFilled"
    class="
      inline-flex
      justify-center
      py-2
      px-4
      border border-transparent
      shadow-sm
      text-sm
      font-medium
      rounded-md
      text-white
      bg-yellow-600
      dark:bg-yellow-500
      hover:bg-yellow-700
      focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500
      ease-linear
      transition-all
      duration-150
    "
    @click="$emit('click')"
  >
    <slot />
  </button>
  <button
    v-else
    class="
      inline-flex
      justify-center
      py-2
      px-4
      border border-transparent
      hover:shadow-sm
      text-sm
      font-medium
      rounded-md
      text-yellow-600
      dark:text-yellow-500
      background-transparent
      hover:bg-gray-100
      dark:hover:bg-gray-800
      focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500
      ease-linear
      transition-all
      duration-150
    "
    @click="$emit('click')"
  >
    <slot />
  </button>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  props: {
    isFilled: Boolean,
  },
})
</script>
