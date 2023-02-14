<template>
    <div>
        <FormSelfpaidPaymentMethod :userData="info"></FormSelfpaidPaymentMethod>
    </div>
</template>

<script>

import FormSelfpaidPaymentMethod from '@/@core/components/user-details-selfpaids/SelfpaidPaymentMethod.vue'

export default {
    components: {
        FormSelfpaidPaymentMethod,
    },
    data() {
        return {
            info: {},
        }
    },
    mounted() {
        let client_id = this.$route.params.client_id
        let item = this.$route.params.item

        //If is edit but has not info return to list
        if (item === undefined || client_id == undefined) {
            this.$router.go(-1)
        } else {
            this.info = this.$route.params.item
        }
    }
}
</script>

<style>
</style>
