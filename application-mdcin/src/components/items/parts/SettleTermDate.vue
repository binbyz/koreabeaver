<template lang="pug">
span.computed-settle-term-date-box(v-if="termDate.length")
  i.far.fa-calendar-check
  time(:datetime="computedDateMoment('start').format('YYYY-MM-DD')")
    span {{ computedDateMoment('start').format('YYYY년 MM월 DD일') }}
  span.during ~
  time(:datetime="computedDateMoment('end').format('YYYY-MM-DD')")
    span {{ computedDateMoment('end').format('YYYY년 MM월 DD일') }}
</template>

<style lang="scss" scoped>
@import '@/scss/_variables.scss';

.computed-settle-term-date-box {
  font-size: 14px;
  > .fa-calendar-check {
    display: inline-block;
    margin-right: 5px;
    color: $color-red-bold;
  }
  > .during {
    display: inline-block;
    margin: 0 5px;
  }
}
</style>

<script lang="ts">
import moment from 'moment'
import { computed, defineComponent, toRefs } from 'vue'

export default defineComponent({
  props: {
    termDate: {
      type: String,
      required: true
    }
  },
  setup (props) {
    const { termDate } = toRefs(props)

    const computedDateMoment = computed(() => {
      const splitted = termDate.value.split('~')
      return (p: 'start' | 'end') => moment((p === 'start') ? splitted[0] : splitted[1])
    })

    return {
      computedDateMoment
    }
  }
})
</script>
