<template lang="pug">
item-table(group-title="의약품 행정처분", :items="recentlySettleItems")
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from 'vue'
import ItemTable from '@/components/items/ItemTable.vue'
import { fetchItems } from '@/api/mdcin'
import { MdcinItem } from '@/api/types'

export default defineComponent({
  components: {
    ItemTable
  },
  setup () {
    const recentlySettleItems = ref<Partial<MdcinItem>[]>([])

    async function requestItems () {
      const response = await fetchItems()
      recentlySettleItems.value = response.data
    }

    onMounted(requestItems)

    return {
      recentlySettleItems,
      requestItems
    }
  }
})
</script>

<style lang="scss" scoped>
</style>
