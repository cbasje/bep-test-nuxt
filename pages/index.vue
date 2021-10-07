<template>
  <!-- <Tutorial/> -->
  <Map :markers="markers" />
</template>

<script>
export default {
  async asyncData({ $supabase }) {
    const { body } = await $supabase.from('locations').select('*')

    return {
      markers: body,
    }
  },
}
</script>
