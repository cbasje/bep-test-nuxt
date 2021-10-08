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
      bg-indigo-600
      hover:bg-indigo-700
      focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500
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
      text-indigo-700
      dark:text-indigo-500
      background-transparent
      hover:bg-gray-100
      dark:hover:bg-gray-800
      focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500
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
