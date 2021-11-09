<template lang="pug">
.core
  app-header
  app-nav-search
  main-content
  app-footer
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import AppHeader from '@/components/AppHeader.vue'
import AppNavSearch from '@/components/AppNavSearch.vue'
import MainContent from '@/components/main/MainContent.vue'
import AppFooter from '@/components/AppFooter.vue'

export default defineComponent({
  components: {
    AppHeader,
    AppNavSearch,
    MainContent,
    AppFooter
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
  height: 100%;
  margin: 0 auto;
  border-top: 6px solid $accent-color;
  box-sizing: border-box;
}
</style>
