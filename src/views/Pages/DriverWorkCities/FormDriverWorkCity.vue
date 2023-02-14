<template>
  <div>
    <FormDriverWorkCities :item-data="info"></FormDriverWorkCities>
  </div>
</template>

<script>


import FormDriverWorkCities from '@/@core/components/driver-work-cities/FormDriverWorkCities.vue'

export default {
  components: {
    FormDriverWorkCities,
  },
  data() {
    return {
      info: {},
    }
  },
  mounted() {
    this.info = this.$route.params.item;
    let id = this.$route.params.id

    //If is edit but has not info return to list
    if (this.info === undefined && id > 0) {
      this.$router.push({ name: 'all-drivers-work-cities' })
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
