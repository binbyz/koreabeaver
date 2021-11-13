<template lang="pug">
h3.g-item-title {{ groupTitle }}
table.item-table
  caption {{ groupTitle }}
  colgroup
    col.status
    col.company-name
    col.item-name
    col.company-address
    col.settle-date
  thead
    tr
      th 상태
      th 회사명
      th 상품명
      th 주소지
      th 행정처분일자
  tbody
    tr(v-for="item in items")
      td
        span.g-status.bad 나쁨
      td {{ item.ENTP_NAME }}
      td.item-name {{ item.ITEM_NAME }}
      td.company-address {{ item.ADDR }}
      td {{ item.LAST_SETTLE_DATE }}
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'
import { ItemTableRow } from '@/components/items/types'

export default defineComponent({
  props: {
    groupTitle: String,
    items: Object as PropType<ItemTableRow[]>
  }
})
</script>

<style lang="scss" scoped>
@import '@/scss/_variables.scss';

$line-height: 100%;

table.item-table {
  width: 100%;
  border-spacing: 0 0;
  table-layout: fixed;
  caption {
    display: none;
  }
  colgroup {
    col.status { width: 7%; }
    col.company-name { width: 18%; }
    col.item-name { width: 35%; }
    col.company-address { width: 30%; }
    col.settle-date { width: 10%; }
  }
  th, td {
    padding: 10px 10px;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
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
    &.item-name {
      text-align: left;
    }
    &.company-address {
      text-align: left;
    }
  }
}
</style>
