<template lang="pug">
article.main-content
  ItemTitle(:title="title")
  div.content-wrap
    section.preview-one(v-for="item in items" :key="item.id")
      .item-image Image
      .item-name
        strong {{ item.ITEM_NAME }}
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'
import ItemTitle from '@/components/items/ItemTitle.vue'
import { MdcinItem } from '@/api/types'

export default defineComponent({
  props: {
    title: {
      type: String,
      required: true
    },
    items: {
      type: Object as PropType<Partial<MdcinItem>[]>,
      required: true
    }
  },
  components: {
    ItemTitle
  }
})
</script>

<style lang="scss" scoped>
.main-content {
  margin-bottom: 30px;
  .title {
    margin: 5px 0 10px 5px;
    font-size: 160%;
    font-weight: 500;
  }
  .content-wrap {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: space-around;
    justify-content: space-evenly;
    align-content: space-around;
    align-content: space-evenly;
    align-items: stretch;
    .preview-one {
      display: flex;
      flex-direction: column;
      flex-basis: 22%;
      flex-grow: 0;
      flex-shrink: 1;
      height: 200px;
      border: 1px solid;
      margin-bottom: 15px;
      .item-image {
        flex-grow: 3;
      }
      .item-name {
        display: flex;
        flex-grow: 1;
        justify-content: center;
        align-items: center;
      }
    }
  }
}
</style>
