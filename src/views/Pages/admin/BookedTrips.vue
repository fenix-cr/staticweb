<template>
  <div>
    <ListBookedTrips></ListBookedTrips>
  </div>
</template>

<script>
import ListBookedTrips from "@core/layouts/components/admin-components/ListBookedTrips";
export default {
  name: "BookedTrips",
  components: {
    ListBookedTrips,
  },
}
</script>

<style scoped>
</style>
