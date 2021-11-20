<template lang="pug">
form.form-searchbar
  input#search.search(
    type="text",
    name="query",
    placeholder="상품명, 상호명, 주소지 검색",
    autocomplete="off",
    @input="changeKeyword"
  )
  button.submit(type="submit") 검색
</template>

<style lang="scss" scoped>
@import '@/scss/_variables.scss';

.form-searchbar {
  position: relative;
  width: 80%;
  input.search {
    box-shadow: none;
    outline: none;
    padding: 10px 32px;
    font-size: 16px;
    color: $accent-color;
    border: 1px solid $color-silver;
    border-radius: $component-radius;
    width: 100%;
    box-sizing: border-box;
    &:focus {
      box-shadow: 0 2px 8px 1px rgb(64 60 67 / 24%);
    }
  }
  button.submit {
    display: none;
  }
}
</style>

<script lang="ts">
import { defineComponent, ref } from 'vue'

export default defineComponent({
  setup () {
    const keyword = ref('')

    const changeKeyword = (e: KeyboardEvent): void => {
      keyword.value = (e.target as HTMLInputElement).value
    }

    return {
      keyword,
      changeKeyword
    }
  }
})
</script>
