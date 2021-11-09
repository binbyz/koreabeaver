<template lang="pug">
.core
  app-header
  app-nav-search
  main-content
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import AppHeader from '@/components/AppHeader.vue'
import AppNavSearch from '@/components/AppNavSearch.vue'
import MainContent from '@/components/main/MainContent.vue'

export default defineComponent({
  components: {
    AppHeader,
    AppNavSearch,
    MainContent
  }
})
</script>

<style lang="scss">
@import '@/scss/app.scss';
@import '@/scss/global.scss';
@import '@/scss/_variables.scss';

.core {
  display: flex;
  flex-direction: column;
  width: 100%;
  margin: 0 auto;
  border-top: 6px solid $accent-color;
}
</style>
