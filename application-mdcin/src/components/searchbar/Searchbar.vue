<template lang="pug">
form.form-searchbar
  input#search.search(
    type="text",
    name="query",
    placeholder="상품명, 상호명, 주소지 검색",
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
    color: $accent-color;
    border: 1px solid $color-silver;
    border-radius: 15px;
    width: 100%;
  }
  button.submit {
    display: none;
  }
}
</style>
