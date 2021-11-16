<template lang="pug">
span.computed-settle-date-box
  i.far.fa-calendar-check
  time(:datetime="computedDatetime") {{ computedSettleDate }}
  time(:datetime="computedDatetime").with-ymd(v-if="withYmd") ({{ computedYmdDate }})
</template>

<style lang="scss" scoped>
@import '@/scss/_variables.scss';

.computed-settle-date-box {
  font-size: 14px;
  > .fa-calendar-check {
    display: inline-block;
    margin-right: 5px;
    color: $color-red-bold;
  }
  .with-ymd {
    display: inline-block;
    margin-left: 5px;
    font-size: 90%;
    color: $color-silver-bolder;
  }
}
</style>

<script lang="ts">
import { defineComponent, computed, toRefs } from 'vue'
import moment from 'moment'
import 'moment/locale/ko'

export default defineComponent({
  props: {
    settleDate: String,
    withYmd: {
      type: Boolean,
      default: false
    }
  },
  setup (props) {
    const { settleDate } = toRefs(props)

    const computedSettleDate = computed(() => {
      return moment(settleDate.value).fromNow()
    })

    const computedYmdDate = computed(() => {
      return moment(settleDate.value).format('YYYY년 MM월 DD일')
    })

    const computedDatetime = computed(() => {
      return moment(settleDate.value).format('YYYY-MM-DD')
    })

    return {
      computedSettleDate,
      computedYmdDate,
      computedDatetime
    }
  }
})
</script>
