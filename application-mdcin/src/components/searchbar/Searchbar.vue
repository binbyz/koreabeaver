<template lang="pug">
form.form-searchbar
  input#search.search(
    type="text",
    name="query",
    placeholder="의약품 이름 검색",
    autocomplete="off",
  )
  button.submit(type="submit") 검색
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  components: {
  }
})
</script>

<style lang="scss" scoped>
@import '@/scss/_variables.scss';

.form-searchbar {
  width: 100%;
  input.search {
    box-shadow: none;
    outline: none;
    padding: 10px 32px;
    font-size: 16px;
    color: $font-color;
    border: 1px solid #e0e0e0;
    width: 100%;
  }
  button.submit {
    display: none;
  }
}
</style>
