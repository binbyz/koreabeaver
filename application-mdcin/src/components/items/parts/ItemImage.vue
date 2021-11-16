<template lang="pug">
.item-image-box
  span.image-not-found(v-if="!imageUrl") 이미지 준비 중입니다.
</template>

<style lang="scss" scoped>
@import '@/scss/_variables.scss';

.item-image-box {
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: $component-radius;
  width: 100%;
  height: 100%;
  .image-not-found {
    font-size: 150%;
    color: $color-silver-bold;
  }
}
</style>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  props: {
    imageUrl: String
  }
})
</script>
