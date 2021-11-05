<template lang="pug">
table.item-table
  thead
    tr
      th 상태
      th 회사명
      th 상품명
      th 주소지
  tbody
    tr
      td
        span.g-status.bad 나쁨
      td 비즈
      td 인벤커뮤니케이션즈
      td 서울시 금천구 금하로5길 17, 나인팰리스 504호
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({

})
</script>

<style lang="scss" scoped>
table.item-table {
  width: 100%;
}
</style>
