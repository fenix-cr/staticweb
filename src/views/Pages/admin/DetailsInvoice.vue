<template>
  <div>
    <DetailsViewBooking></DetailsViewBooking>
    <hr>
    <DetailsViewTotalPrices></DetailsViewTotalPrices>
  </div>
</template>
  
<script>
import {
  BTab, BTabs, BCard, BAlert, BLink,
} from 'bootstrap-vue'

import DetailsViewBooking from '@core/components/details-reservas/DetailsViewBooking.vue'
import DetailsViewTotalPrices from '@core/components/details-reservas/DetailsViewTotalPrices.vue'


export default {
  name: "DetailsSelfpaid",
  components: {
    BTab,
    BTabs,
    BCard,
    BAlert,
    BLink,

    DetailsViewBooking,
    DetailsViewTotalPrices,
  },
  data() {
    return {

    }
  },
  methods: {

  },
  mounted() {

  }
}
</script>
  
<style scoped>

</style>