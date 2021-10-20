<template>
  <section>
    <!--header-->
    <div
      class="
        flex
        items-start
        justify-between
        p-5
        border-b border-solid border-gray-200
        dark:border-gray-700
        rounded-t
      "
    >
      <h3 class="text-3xl font-semibold dark:text-white">
        <slot name="header" />
      </h3>
    </div>
    <!--body-->
    <div class="mt-5 md:mt-0 md:col-span-2">
      <div class="sm:overflow-hidden">
        <div class="px-4 py-5 space-y-6 sm:p-6">
          <slot name="body" />
        </div>
      </div>
    </div>

    <!--footer-->
    <div
      v-if="hasFooterSlot"
      class="
        flex
        items-center
        justify-end
        p-5
        border-t border-solid border-gray-200
        dark:border-gray-700
        rounded-b
      "
    >
      <slot name="footer" />
    </div>
  </section>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  computed: {
    hasFooterSlot() {
      return !!this.$slots.footer
    },
  },
})
</script>
