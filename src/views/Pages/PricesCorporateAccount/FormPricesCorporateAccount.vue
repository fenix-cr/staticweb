<template>
  <div>
    <EditPricesCorporateAccount :item-data="info" :companies="listCompanies"></EditPricesCorporateAccount>
  </div>
</template>

<script>

import EditPricesCorporateAccount from '@core/components/prices-corporate-account/FormPricesCorporateAccount.vue'

export default {
  components: {
    EditPricesCorporateAccount,
  },
  data() {
    return {
      info: {},
      listCompanies:  [],
    }
  },
  beforeMount() {
    this.info = this.$route.params.item;
    this.listCompanies = this.$route.params.listCompanies;
    let id = this.$route.params.id

    //If is edit but has not info return to list
    if (this.info === undefined && id > 0) {
      this.$router.go(-1);
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
