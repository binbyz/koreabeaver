<template lang="pug">
span.computed-settle-date-box {{ computedSettleDate }}
</template>

<style lang="scss" scoped>
.computed-settle-date-box {
  font-size: 14px;
}
</style>

<script lang="ts">
import { defineComponent, computed, toRefs } from 'vue'
import moment from 'moment'
import 'moment/locale/ko'

export default defineComponent({
  props: {
    settleDate: String
  },
  setup (props) {
    const { settleDate } = toRefs(props)

    const computedSettleDate = computed(() => {
      return moment(settleDate.value).fromNow()
    })

    return {
      computedSettleDate
    }
  }
})
</script>
