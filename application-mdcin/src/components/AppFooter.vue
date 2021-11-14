<template lang="pug">
footer.app-footer
  a(href="/") 코리아비버
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({

})
</script>

<style lang="scss" scoped>
@import '@/scss/_variables.scss';

.app-footer {
  display: flex;
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  flex-wrap: wrap;
  justify-content: center;
  background-color: $color-silver-soft;
  border-top: 1px solid $color-silver;
  margin-top: 15px;
  a {
    display: block;
    padding: 15px;
    color: $color-silver-bold;
    font-size: 14px;
    border-left: 1px solid $color-silver;
    &:last-child {
      border-right: 1px solid $color-silver;
    }
  }
}
</style>
