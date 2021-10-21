<template>
  <popup-content>
    <template #header>{{ $t('onboarding.title') }}</template>

    <template #body>
      <div class="flex justify-center pb-5">
        <undraw-map class="text-yellow-500 w-auto h-32" />
      </div>
      <p
        class="text-base text-black dark:text-white"
        v-html="$t('onboarding.body')"
      />
      <p
        class="text-sm text-gray-600 dark:text-gray-400"
        v-html="$t('onboarding.disclaimer')"
      />
    </template>

    <template #footer>
      <popup-button :is-filled="true" @click="$router.push(localePath('/'))">
        {{ $t('onboarding.closeButton') }}
      </popup-button>
    </template>
  </popup-content>
</template>

<script lang="ts">
import Vue from 'vue'
import PopupButton from '~/components/PopupButton.vue'

import PopupContent from '~/components/PopupContent.vue'
import UndrawMap from '~/components/svg/UndrawMap.vue'

export default Vue.extend({
  components: { PopupContent, UndrawMap, PopupButton },
})
</script>
