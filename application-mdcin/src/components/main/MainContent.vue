<template lang="pug">
app-body
  article.main-content
    h3.title 가장 많이본 행정처분
    div.content-wrap
      section.preview-one test1
      section.preview-one test2
      section.preview-one test3
      section.preview-one test4
      section.preview-one test5
      section.preview-one test6

  //- article.main-content
  //-   h3.title 최근 등록된 행정처분
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import AppBody from '@/components/AppBody.vue'

export default defineComponent({
  components: {
    AppBody
  }
})
</script>

<style lang="scss" scoped>
.main-content {
  margin-bottom: 30px;
  .title {
    margin: 5px 0 10px 5px;
    font-size: 120%;
    font-weight: 500;
  }
  .content-wrap {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: space-around;
    justify-content: space-evenly;
    align-content: space-around;
    align-content: space-evenly;
    align-items: stretch;
    border: 1px solid red;
    height: 400px;
    .preview-one {
      flex-basis: 30%;
      flex-grow: 0;
      flex-shrink: 1;
      height: 45%;
      border: 1px solid;
    }
  }
}
</style>
