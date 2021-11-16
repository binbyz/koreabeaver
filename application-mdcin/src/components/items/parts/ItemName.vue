<template lang="pug">
span.item-name-box
  span.status.bad
  router-link(:to="{ path: '/item/' + id }")
    span {{ itemName }}
</template>

<style lang="scss" scoped>
@import '@/scss/_variables.scss';

.item-name-box {
  display: inline-block;
  width: 100%;
  text-align: left;
  font-size: 130%;
  line-height: 130%;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  padding: 0 10px;
  span.status {
    $font-color-normal: #aaaaaa;
    $font-color-good: #1aaa55;
    $font-color-bad: #db3b21;
    display: inline-block;
    text-align: center;
    padding: 0 5px;
    line-height: 14px;
    border: 1px solid $font-color-normal;
    background-color: #fff;
    color: $font-color-normal;
    border-radius: 5px;
    font-size: 11px;
    margin-right: 5px;
    vertical-align: middle;
    &.bad:before {
      display: block;
      content: "나쁨";
    }
  }
  a {
    color: $accent-color;
  }
}
</style>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  props: {
    id: Number,
    itemName: String
  }
})
</script>
