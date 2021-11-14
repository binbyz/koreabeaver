<template lang="pug">
item-table(group-title="의약품 행정처분", :items="recentlySettleItems")
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from 'vue'
import ItemTable from '@/components/items/ItemTable.vue'
import { fetchLatestGoods } from '@/api/goods'

export default defineComponent({
  components: {
    ItemTable
  },
  setup () {
    const recentlySettleItems = ref([])

    async function getLatestsGoods () {
      const response = await fetchLatestGoods()
      recentlySettleItems.value = response.data
    }

    onMounted(getLatestsGoods)

    return {
      recentlySettleItems,
      getLatestsGoods
    }
  }
})
</script>

<style lang="scss" scoped>
</style>
