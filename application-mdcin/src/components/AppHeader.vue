<template lang="pug">
header.app-header
  h1.logo
    a(href="./") <strong>코리아비버</strong>
    span.slogun 대한민국 <strong>소비자</strong>의 알 권리
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
    .slogun {
      display: block;
      color: $color-white;
      font-size: 18px;
    }
    a {
      color: #65beff;
      font-size: 24px;
    }
  }
}
</style>
