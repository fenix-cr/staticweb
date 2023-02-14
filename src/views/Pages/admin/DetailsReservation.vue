<template>
  <div>
    <h5 v-if="bookingInfo != null">
      Booking type:
      {{
        bookingInfo.self_pay.corporate_account == null
          ? "Selfpaid"
          : "Corporate Account"
      }}
    </h5>
    <hr />
    <component :is="'b-card'">
      <!-- Alert: No item found -->
      <b-tabs pills>
        <!-- Tab: Account -->
        <b-tab active>
          <template #title>
            <feather-icon icon="UserIcon" size="16" class="mr-0 mr-sm-50" />
            <span class="d-none d-sm-inline">SelfPay information</span>
          </template>
          <details-view-reserva class="mt-2 pt-75" />
        </b-tab>

        <!-- Tab: Information -->
        <b-tab>
          <template #title>
            <feather-icon icon="InfoIcon" size="16" class="mr-0 mr-sm-50" />
            <span class="d-none d-sm-inline">Driver information</span>
          </template>
          <details-view-driver-asignado class="mt-2 pt-75" />
        </b-tab>

        <!-- Tab: Social -->
        <b-tab>
          <template #title>
            <feather-icon icon="InfoIcon" size="16" class="mr-0 mr-sm-50" />
            <span class="d-none d-sm-inline">Service information</span>
          </template>
          <details-info-service
            :data-service="bookingInfo"
            class="mt-2 pt-75"
          />
        </b-tab>
        <b-tab>
          <template #title>
            <feather-icon icon="InfoIcon" size="16" class="mr-0 mr-sm-50" />
            <span class="d-none d-sm-inline">Detail of payment</span>
          </template>
          <details-info-payment-booking
            :data-service="bookingInfo"
            class="mt-2 pt-75"
          />
        </b-tab>
      </b-tabs>
    </component>
  </div>
</template>

<script>
import { BTab, BTabs, BCard, BAlert, BLink } from "bootstrap-vue";
import { ref, onUnmounted } from "@vue/composition-api";
import router from "@/router";
import store from "@/store";
import DetailsViewReserva from "@core/components/details-reservas/DetailsViewReserva";
import DetailsViewDriverAsignado from "@core/components/details-reservas/DetailsViewDriverAsignado";
import DetailsInfoService from "@core/components/details-reservas/DetailsInfoService";
import DetailsInfoPaymentBooking from "@core/components/details-reservas/DetailsInfoPaymentBooking";
import { getMessageError } from "@core/utils/utils";
import { ValidationProvider, ValidationObserver } from "vee-validate";

export default {
  components: {
    BTab,
    BTabs,
    BCard,
    BAlert,
    BLink,
    DetailsViewReserva,
    DetailsViewDriverAsignado,
    DetailsInfoService,
    DetailsInfoPaymentBooking,
    ValidationProvider,
    ValidationObserver,
  },
  name: "DetailsReservation",
  data() {
    return {
      bookingInfo: null,
      reservaId: 0,
    };
  },
  methods: {
    getInfoBooking() {
      this.$store.commit("Users/usersData", "");
      this.$swal({
        title: "Please, wait...",
        didOpen: () => {
          this.$swal.showLoading();
        },
      });
      this.reservaId = this.$route.params.id;
      this.$http
        .get(`admin/panel/booking/${this.reservaId}/info`)
        .then((response) => {
          this.bookingInfo = response.data.data;
          this.$store.commit("Users/usersData", this.bookingInfo);
          this.$swal.close();
          console.log(this.bookingInfo);
        })
        .catch((error) => {
          let message = getMessageError(error);
          console.log(message);
          this.$swal({
            title: message,
            icon: "error",
            customClass: {
              confirmButton: "btn btn-primary",
            },
            buttonsStyling: false,
          });
        });
    },
  },
  mounted() {
    this.getInfoBooking();
  },
};
</script>

<style scoped>
</style>
