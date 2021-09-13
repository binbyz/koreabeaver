<template lang="pug">
#app
  AppHeader
  AppBody
  AppFooter
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import AppHeader from '@/components/AppHeader.vue'
import AppBody from '@/components/AppBody.vue'
import AppFooter from '@/components/AppFooter.vue'

export default defineComponent({
  components: {
    AppHeader,
    AppBody,
    AppFooter
  }
})
</script>

<style lang="scss">
@import '@/assets/scss/_app.scss';

#app {
  display: flex;
  flex-direction: column;
  width: 100%;
  margin: 0 auto;
}
</style>
