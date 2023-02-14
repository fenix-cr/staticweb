<template>
  <div>
    <list-canceled-reservations></list-canceled-reservations>
  </div>
</template>

<script>
import ListCanceledReservations from "@core/layouts/components/admin-components/ListCanceledReservations";
export default {
  name: "CanceledReservations",
  components: {
    ListCanceledReservations,
  },
}
</script>

<style scoped>
</style>
