<template lang="pug">
div.app-body
  slot
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({

})
</script>

<style lang="scss" scoped>
@import '@/scss/_variables.scss';
@import '@/scss/_mixins.scss';

.app-body {
  @include box-center;
  width: $content-width;
}
</style>
