<template>
  <div>
    <list-reservation-to-accept></list-reservation-to-accept>
  </div>
</template>

<script>
import ListReservationToAccept from "@core/layouts/components/admin-components/ListReservationToAccept.vue";
export default {
  name: "ReservationToAccept",
  components: {
    ListReservationToAccept,
  },
}
</script>

<style scoped>
</style>
