<template>
  <popup-content>
    <template #header>Welkom!</template>

    <template #body>
      <div class="flex justify-center pb-5">
        <undraw-map class="text-purple-500 w-auto h-32" />
      </div>
      <p class="text-base text-black dark:text-white">
        Heat City Map is een app om een overzicht te krijgen van koele plekken
        op hete dagen, op basis van de feedback van gebruikers. Zo kun je meteen
        zien waar je lekker koel kunt picknicken, wandelen of fietsen, etc.
        <br />
        <br />
        Om een duidelijker beeld te schetsen van de situatie hebben wij ook jouw
        feedback nodig! Druk op de grote knop rechtsonder om te laten weten of
        je het op een bepaalde plek warm of koud hebt en laat eventueel een
        notitie achter waarom je je zo voelt.
      </p>
      <p class="text-sm text-gray-600 dark:text-gray-400">
        Disclaimer: wij slaan alleen feedback en locatie op; geen persoonlijke
        data. De locatie is ook niet gelinkt aan uw persoonlijke informatie.
      </p>
    </template>
  </popup-content>
</template>

<script lang="ts">
import Vue from 'vue'

import PopupContent from '~/components/PopupContent.vue'
import UndrawMap from '~/components/svg/UndrawMap.vue'

export default Vue.extend({
  components: { PopupContent, UndrawMap },
})
</script>
