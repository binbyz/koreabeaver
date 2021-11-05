<template lang="pug">
app-body
  item-table
</template>

<script lang="ts">
import { defineComponent, onMounted } from 'vue'
import AppBody from '@/components/AppBody.vue'
import ItemTable from '@/components/items/ItemTable.vue'
import axios from 'axios'

export default defineComponent({
  components: {
    AppBody,
    ItemTable
  },
  setup () {
    onMounted(() => console.log('test'))
  }
})
</script>

<style lang="scss" scoped>
</style>
