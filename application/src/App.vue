<template lang="pug">
#app
  AppHeader
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import AppHeader from './components/AppHeader.vue'

export default defineComponent({
  components: {
    AppHeader
  }
})
</script>

<style lang="scss">
body {
  background-color: rgb(238, 240, 241);
  font-family: -apple-system, system-ui, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
  line-height: 24px;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  margin: 0;
  padding: 0;
}
#app {
  display: flex;
  flex-direction: column;
  min-height: 900px;
  width: 1200px;
  margin: 0 auto;
}
</style>
