<template>
    <div>
        <table class="tbTotal" v-if="booking!=null">
            <tr>
                <td class="title">Distance</td>
                <td class="description">{{ booking.total_miles }} miles</td>
            </tr>
            <tr>
                <td class="title">Total additionals stops</td>
                <td class="description">{{ listAdditionalStops.length }}</td>
            </tr>
            <tr>
                <td class="title">Total waiting time</td>
                <td class="description">{{ booking.total_waiting_time==null?0: booking.total_waiting_time }}</td>
            </tr>
            <tr>
                <td class="title">Total Price</td>
                <td class="description">$ {{booking.price}}</td>
            </tr>
        </table>
    </div>
</template>
  
<script>
import {
    BButton,
    BMedia,
    BAvatar,
    BRow,
    BCol,
    BFormGroup,
    BFormInput,
    BFormTextarea,
    BForm,
    BTable,
    BCard,
    BCardHeader,
    BCardTitle,
    BFormCheckbox,
    BFormSelect,
} from 'bootstrap-vue'
import { getMessageError } from '@core/utils/utils'
import {getItemWaitingTime} from '@core/utils/additionalServices'
import {getItemsAdditionalStops} from '@core/utils/additionalServices'

export default {
    components: {
        BButton,
        BMedia,
        BAvatar,
        BRow,
        BCol,
        BFormGroup,
        BFormInput,
        BFormTextarea,
        BForm,
        BTable,
        BCard,
        BCardHeader,
        BCardTitle,
        BFormCheckbox,
        BFormSelect,
    },
    data() {
        return {
            booking: null,
            waitingTime:null,
            listAdditionalStops: [],
        }
    },
    methods: {
        getBookingById(bookingId) {
            let url = ""
            this.$swal({
                title: 'Please, wait...',
                didOpen: () => {
                    this.$swal.showLoading()
                },
            })
            if (this.$store.getters['Users/userData'].user.role.id === 1 || this.$store.getters['Users/userData'].user.role.id === 2) {
            url = `admin/panel/booking/${bookingId}/info`
            }
            if (this.$store.getters['Users/userData'].user.role.id === 3) {
                url = `ca/panel/corporate/booking/${bookingId}/info`                
            }

            this.$http.get(url).then((response) => {
                this.booking = response.data.data
                this.getWaitTime() 
                this.getaditionalStops()
                this.$swal.close();
            }).catch((error) => {
                let message = getMessageError(error)
                this.$swal({
                    title: message,
                    icon: 'error',
                    customClass: {
                        confirmButton: 'btn btn-primary',
                    },
                    buttonsStyling: false,
                })
            })
        },
        getWaitTime() {
            if (this.booking.additional_service) {
                this.waitingTime = getItemWaitingTime(this.booking.additional_service);
            }
        },
        getaditionalStops() {
            if (this.booking.additional_service) {
                this.listAdditionalStops = getItemsAdditionalStops(this.booking.additional_service);                
            }
        },
    },
    beforeMount() {
        let bookid = this.$route.params.id

        if (bookid == null) {
            this.$router.go(-1)
        } else {
            this.getBookingById(bookid)
        }
    },

}
</script>
  
<style lang="scss">
@import '@core/scss/vue/libs/vue-select.scss';

.text-name-driver {
    font-size: 1.5rem;
    margin-bottom: 0 !important;
}

.backgroundProfile-driver {
    background-color: $primary;
}

.btn-primary {
    background: #7367f0 !important;
}

.tbTotal,
table.tbTotal th,
table.tbTotal td {
    border: 2px solid #c6c6c6;
    margin-left: auto;
    margin-bottom: 20px;
}

.title {
    font-size: medium;
    font-weight: 700;
    padding: 8px;
}

.description {
    font-size: medium;
    padding: 8px;
}
</style>