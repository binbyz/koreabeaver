<template lang="pug">
.item-detail
  .item-db
    ItemName(:id="item.id", :item-name="item.ITEM_NAME")
    EntpName(:entp-name="item.ENTP_NAME", :address="item.ADDR")
    SettleDate(:settle-date="item.LAST_SETTLE_DATE", :with-ymd="true")
    SettleTermDate(:term-date="item.DISPS_TERM_DATE")
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
    justify-content: flex-start;
    .item-name-box {
      font-size: 200%;
      white-space: break-spaces;
      margin-bottom: 30px;
      a {
        h3.item-name {
          font-size: 120%;
        }
      }
    }
    .computed-settle-date-box {
      font-size: 120%;
      margin-bottom: 20px;
      &:before {
        @include inforText("행정처분일자")
      }
    }
    .computed-settle-term-date-box {
      font-size: 120%;
      margin-bottom: 20px;
      &:before {
        @include inforText("행정처분기간")
      }
    }
    .company-name-box {
      margin-bottom: 20px;
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
import { defineComponent, ref } from 'vue'
import { useRoute } from 'vue-router'
import { fetchItem } from '@/api/mdcin'
import { MdcinItem } from '@/api/types'
import SettleDate from '@/components/items/parts/SettleDate.vue'
import SettleTermDate from '@/components/items/parts/SettleTermDate.vue'
import EntpName from '@/components/items/parts/EntpName.vue'
import ItemName from '@/components/items/parts/ItemName.vue'
import ExposeContent from '@/components/items/parts/ExposeContent.vue'
import ItemImage from '@/components/items/parts/ItemImage.vue'

export default defineComponent({
  components: {
    SettleDate,
    SettleTermDate,
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

    requestItem()

    return {
      item
    }
  }
})
</script>
