<template lang="pug">
h3.item-title
  span.text {{ title }}
</template>

<style lang="scss" scoped>
@import '@/scss/_variables.scss';
@import '@/scss/_mixins.scss';

.item-title {
  display: block;
  color: $accent-color;
  font-size: 24px;
  font-weight: normal;
  margin-bottom: 15px;
  > .text {
    @include highlight-text();
  }
}
</style>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  props: {
    title: String
  }
})
</script>
