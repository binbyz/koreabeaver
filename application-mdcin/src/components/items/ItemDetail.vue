<template lang="pug">
.item-detail
  .item-db
    ItemName(:id="item.id", :item-name="item.ITEM_NAME")
    SettleDate(:settle-date="item.LAST_SETTLE_DATE")
    EntpName(:entp-name="item.ENTP_NAME", :address="item.ADDR")
  .item-image
    ItemImage()
</template>

<style lang="scss" scoped>
@import '@/scss/_variables.scss';

@mixin inforText($text) {
  display: inline-block;
  content: $text;
  margin-right: 5px;
  color: $color-silver-bold;
  font-size: 13px;
}

.item-detail {
  display: flex;
  flex-direction: row;
  height: 400px;
  justify-content: space-evenly;
  .item-db {
    display: flex;
    flex-direction: column;
    flex-basis: 35%;
    max-width: 35%;
    height: 100%;
    justify-content: space-evenly;
    .item-name-box {
      font-size: 200%;
      white-space: break-spaces;
    }
    .computed-settle-date-box {
      font-size: 120%;
      &:before {
        @include inforText("행정처분일자")
      }
    }
    .company-name-box {
      &:before {
        @include inforText("업소소재지");
      }
    }
  }
  .item-image {
    flex-basis: 40%;
  }
}
</style>

<script lang="ts">
import { defineComponent, onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'
import { fetchItem } from '@/api/mdcin'
import { MdcinItem } from '@/api/types'
import SettleDate from '@/components/items/parts/SettleDate.vue'
import EntpName from '@/components/items/parts/EntpName.vue'
import ItemName from '@/components/items/parts/ItemName.vue'
import ExposeContent from '@/components/items/parts/ExposeContent.vue'
import ItemImage from '@/components/items/parts/ItemImage.vue'

export default defineComponent({
  components: {
    SettleDate,
    EntpName,
    ItemName,
    ExposeContent,
    ItemImage
  },
  setup () {
    const route = useRoute()
    const item = ref<MdcinItem>({
      id: 0,
      ADM_DISPS_SEQ: 0,
      ENTP_NAME: '',
      ADDR: '',
      ENTP_NO: 0,
      ITEM_NAME: '',
      BEF_APPLY_LAW: null,
      EXPOSE_CONT: '',
      ADM_DISPS_NAME: '',
      LAST_SETTLE_DATE: null,
      DISPS_TERM_DATE: ''
    })

    const requestItem = async (newId?: number) => {
      const response = await fetchItem(newId || Number(route.params.id))
      item.value = response.data
    }

    onMounted(requestItem)

    return {
      item,
      requestItem
    }
  }
})
</script>
