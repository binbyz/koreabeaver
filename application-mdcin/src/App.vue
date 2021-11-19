<template lang="pug">
.core
  horizontal-progress-bar
  .responsive-contents
    app-header
    app-nav-search
    app-body
      router-view
  app-footer
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import HorizontalProgressBar from '@/components/contents/HorizontalProgressBar.vue'
import AppHeader from '@/components/AppHeader.vue'
import AppNavSearch from '@/components/AppNavSearch.vue'
import AppBody from '@/components/AppBody.vue'
import AppFooter from '@/components/AppFooter.vue'

export default defineComponent({
  components: {
    HorizontalProgressBar,
    AppHeader,
    AppNavSearch,
    AppBody,
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
  min-height: 100%;
  margin: 0 auto;
  box-sizing: border-box;
  padding-bottom: 100px;
  .responsive-contents {
    display: flex;
    height: 100%;
    width: $content-width;
    margin: 0 auto;
    flex-direction: column;
  }
}
</style>
