<template lang="pug">
#app
  AppHeader
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import AppHeader from '@/components/AppHeader.vue'

export default defineComponent({
  components: {
    AppHeader
  }
})
</script>

<style lang="scss">
@import '@/scss/_app.scss';

#app {
  display: flex;
  flex-direction: column;
  width: 100%;
  margin: 0 auto;
}
</style>
