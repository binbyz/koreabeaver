<template lang="pug">
header.app-header
  h1.logo
    a(href="./") 맛동산
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({

})
</script>

<style lang="scss" scoped>
@import '@/assets/scss/_variables.scss';

.app-header {
  h1.logo {
    font-size: 0;
  }
}
</style>
