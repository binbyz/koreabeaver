<template lang="pug">
.expose-content-box
  .icon-section
    i.fa-solid.fa-triangle-exclamation
  .text {{ exposeContent }}
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  props: {
    exposeContent: String
  }
})
</script>

<style lang="scss" scoped>
@import '@/scss/_variables.scss';

.expose-content-box {
  display: flex;
  flex-direction: row;
  > .icon-section {
    display: flex;
    align-items: center;
    flex-shrink: 0;
    > .fa-triangle-exclamation {
      color: $color-red-soft;
      font-size: 120%;
    }
  }
  > .text {
    white-space: break-spaces;
    text-align: left;
    line-height: 130%;
    color: $color-silver-bolder;
    padding-left: 10px;
  }
}
</style>
