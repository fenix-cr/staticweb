<template>
  <div>
    <ListUsers></ListUsers>
<!--    <AddGoogleMap></AddGoogleMap>-->
  </div>
</template>

<script>


import ListUsers from '@core/components/infoClients/ListUsers.vue'
import AddGoogleMap from '@core/components/AddGoogleMap'

export default {
  components: {
    ListUsers,
    // AddGoogleMap,
  },
  data() {
    return {}
  },
}
</script>

<style>

</style>
