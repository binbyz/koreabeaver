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
  flex-direction: column;
  align-items: center;
  text-align: center;
  min-height: 120px;
  width: $content-width;
  margin: 0 auto;
  background-color: $accent-color;
  border-bottom-left-radius: 50px;
  border-bottom-right-radius: 50px;
  .logo {
    display: flex;
    flex: 1;
    align-items: flex-end;
    a {
      color: $color-white;
      font-size: 32px;
    }
  }
  .slogun {
    display: flex;
    flex: 1;
    align-items: baseline;
    color: $color-white;
    font-size: 18px;
  }
}
</style>
