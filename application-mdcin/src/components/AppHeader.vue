<template lang="pug">
header.app-header
  div.logo(role="banner")
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
  flex-direction: column;
  align-items: center;
  text-align: center;
  min-height: 120px;
  margin: 0 auto;
  .logo {
    display: flex;
    flex: 1;
    align-items: flex-end;
    a {
      color: $accent-color;
      font-size: 32px;
      > strong {
        font-weight: normal;
      }
    }
  }
  .slogun {
    display: flex;
    flex: 1;
    align-items: center;
    color: $accent-color;
    font-size: 18px;
  }
}
</style>
