<template lang="pug">
header.app-header
  h1.logo
    a(href="./") <strong>의약품</strong> 행정처분 <strong>검색</strong>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({

})
</script>

<style lang="scss" scoped>
@import '@/scss/_variables.scss';

.app-header {
  display: flex;
  text-align: center;
  min-height: 100px;
  align-items: center;
  background-color: $accent-color;
  .logo {
    display: block;
    flex: 1;
    a {
      color: $color-white;
    }
  }
}
</style>
