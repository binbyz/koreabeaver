<template lang="pug">
.company-name-box
  .rows.company-name
    span.status 나쁨
    span {{ itemName }}
  .rows.address(v-if="address.trim().length") {{ address }}
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  props: {
    itemName: String,
    address: String
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
  span.status {
    $font-color-normal: #aaaaaa;
    $font-color-good: #1aaa55;
    $font-color-bad: #db3b21;
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
    }
  }
}
</style>
