<template>
  <div>
    <EditPricesSelftPay :item-data="info"></EditPricesSelftPay>
  </div>
</template>

<script>


import EditPricesSelftPay from '@core/components/priceselfpay/FormPricesSelftPay.vue'

export default {
  components: {
    EditPricesSelftPay,
  },
  data() {
    return {
      info: {},
    }
  },
  mounted() {
    this.info = this.$route.params.item;
    let id = this.$route.params.id
    console.log(this.info)

    //If is edit but has not info return to list
    if (this.info === undefined && id > 0) {
      this.$router.push({ name: 'all-prices-selfpaids' })
    }

    //if is add set the value of info variable
    if (this.info === undefined) {
      this.info = {}
    }
  }
}
</script>

<style>
</style>
