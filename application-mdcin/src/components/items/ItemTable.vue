<template lang="pug">
table.item-table
  caption 최근 올라온 행정처분목록
  colgroup
    col.status
    col.company-name
    col.goodsname
    col.company-address
    col.regdate
  thead
    tr
      th 상태
      th 회사명
      th 상품명
      th 주소지
      th 등록일
  tbody
    tr(v-for="i in [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]")
      td
        span.g-status.bad 나쁨
      td 비즈
      td 인벤커뮤니케이션즈
      td.company-address 서울시 금천구 금하로5길 17, 나인팰리스 504호
      td 1달전
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({

})
</script>

<style lang="scss" scoped>
@import '@/scss/_variables.scss';

$line-height: 100%;

table.item-table {
  width: 100%;
  border-spacing: 0 0;
  caption {
    display: none;
  }
  th, td {
    padding: 10px 10px;
  }
  th {
    color: $accent-color;
    font-weight: bold;
    border-color: $color-silver;
    border-width: 1px 0 1px 0;
    border-style: solid;
    line-height: $line-height;
    border-spacing: 0 0;
  }
  td {
    text-align: center;
    line-height: $line-height;
    border-spacing: 0 0;
    border-color: $color-silver-soft;
    border-width: 0 0 1px 0;
    border-style: solid;
    &.company-address {
      text-align: left;
    }
  }
}
</style>
