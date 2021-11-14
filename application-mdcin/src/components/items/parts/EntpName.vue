<template lang="pug">
.company-name-box
  .rows.company-name
    span.bad-count 10
    span {{ entpName }}
  .rows.address(v-if="address.trim().length")
    i.fa-regular.fa-map(@click="redirectMap(address)")
    span {{ computedAddress }}
</template>

<script lang="ts">
import { computed, defineComponent, toRefs } from 'vue'

export default defineComponent({
  props: {
    entpName: String,
    address: String
  },
  setup (props) {
    const { address } = toRefs(props)

    const computedAddress = computed(() => {
      const splitted = (address.value as string).split(' ')

      splitted.shift()
      return splitted.join(' ')
    })

    return {
      computedAddress
    }
  },
  methods: {
    redirectMap (address: string) {
      window.open(`https://map.naver.com/v5/search/${address}`)
    }
  }
})
</script>

<style lang="scss" scoped>
@import '@/scss/_variables.scss';

.company-name-box {
  position: relative;
  display: flex;
  flex-direction: column;
  border-radius: $component-radius;
  background-color: $color-silver-soft;
  padding: 10px 15px;
  text-align: left;
  span.bad-count {
    $font-color-normal: #db3b21;
    position: absolute;
    top: 15px;
    right: 15px;
    display: inline-block;
    text-align: center;
    padding: 0 5px;
    line-height: 14px;
    border: 1px solid $font-color-normal;
    background-color: #fff;
    color: $font-color-normal;
    border-radius: 5px;
    font-size: 11px;
  }
  .rows {
    line-height: 28px;
    &.company-name {
      font-size: 110%;
      color: $accent-color;
      font-weight: bold;
    }
    &.address {
      font-size: 80%;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      border-top: 1px solid $color-silver;
      > .fa-map {
        display: inline-block;
        vertical-align: -1px;
        margin-right: 3px;
        font-size: 120%;
        color: $color-silver-bold;
        cursor: pointer;
      }
    }
  }
}
</style>
