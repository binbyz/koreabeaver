<template lang="pug">
header.app-header
  h1.logo
    a(href="./") 대한민국 <strong>의약품</strong> 행정처분 정보
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
  min-height: 300px;
  align-items: center;
  .logo {
    display: block;
    flex: 1;
  }
}
</style>
