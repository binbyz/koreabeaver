<template lang="pug">
ItemTitle(:title="groupTitle")
table.item-table
  caption {{ groupTitle }}
  colgroup
    col.settle-date
    col.entp-name
    col.item-name
    col.expose-content
  thead
    tr
      th 행정처분일자
      th 회사명
      th 제품명
      th
        i.fa-solid.fa-triangle-exclamation
        span 위반내용
  tbody
    tr(v-for="item in items", :key="item.id")
      td
        SettleDate(:settle-date="item.LAST_SETTLE_DATE")
      td
        EntpName(:entp-name="item.ENTP_NAME", :address="item.ADDR")
      td
        ItemName(:id="item.id", :item-name="item.ITEM_NAME")
      td
        ExposeContent(:expose-content="item.EXPOSE_CONT")
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'
import { MdcinItem } from '@/api/types'
import ItemTitle from '@/components/items/ItemTitle.vue'
import SettleDate from '@/components/items/parts/SettleDate.vue'
import EntpName from '@/components/items/parts/EntpName.vue'
import ItemName from '@/components/items/parts/ItemName.vue'
import ExposeContent from '@/components/items/parts/ExposeContent.vue'

export default defineComponent({
  props: {
    title: String,
    items: Object as PropType<Partial<MdcinItem>[]>
  },
  components: {
    ItemTitle,
    SettleDate,
    EntpName,
    ItemName,
    ExposeContent
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
    col.settle-date { width: 10%; }
    col.entp-name { width: 20%; }
    col.item-name { width: 35%; }
    col.expose-content { width: 35%; }
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
    .fa-triangle-exclamation {
      margin-right: 3px;
    }
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
    &.expose-content {
      text-align: left;
    }
  }
}
</style>
