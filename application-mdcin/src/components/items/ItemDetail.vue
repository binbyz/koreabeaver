<template lang="pug">

</template>

<script lang="ts">
import { defineComponent, onMounted, reactive } from 'vue'
import { useRoute } from 'vue-router'
import { fetchItem } from '@/api/mdcin'
import { MdcinItem } from '@/api/types'

export default defineComponent({
  setup () {
    const route = useRoute()
    let item = reactive<MdcinItem>({} as MdcinItem)

    const requestItem = async (newId?: number) => {
      const response = await fetchItem(newId || Number(route.params.id))
      item = response.data
    }

    // watch(
    //   () => route.params.id,
    //   async newId => {
    //     requestItem(Number(newId))
    //   }
    // )

    onMounted(requestItem)

    return {
      item,
      requestItem
    }
  }
})
</script>

<style lang="scss" scoped>

</style>
