<template>
  <component :is="'b-card'">
    <!-- form Admin -->
    <b-form>
      <b-row>
        <!-- Field: Username -->
        <b-col
            cols="12"
            md="3"
        >
          <b-form-group
              label="Name"
          >
            <b-form-input
                disabled
                v-model="dataPayment.billing_details.name"
            />
          </b-form-group>
        </b-col>

        <!-- Field: Full Name -->
        <b-col
            cols="12"
            md="3"
        >
          <b-form-group
              label="Email"
          >
            <b-form-input
                disabled
                v-model="dataPayment.billing_details.email"
            />
          </b-form-group>
        </b-col>
        <b-col
            cols="12"
            md="3"
        >
          <b-form-group
              label="Phone"
          >
            <b-form-input
                disabled
                v-model="dataPayment.billing_details.phone"
            />
          </b-form-group>
        </b-col>
        <b-col
            cols="12"
            md="3"
        >
          <b-form-group
              label="City"
          >
            <b-form-input
                disabled
                v-model="dataPayment.billing_details.address.city"
            />
          </b-form-group>
        </b-col>

      </b-row>
    </b-form>

    <!-- form corporate -->
    <b-form>
      <b-row>
        <!-- Field: Username -->
        <b-col
            cols="12"
            md="3"
        >
          <b-form-group
              label="Country"

          >
            <b-form-input
                disabled
                v-model="dataPayment.billing_details.address.country"
            />
          </b-form-group>
        </b-col>

        <!-- Field: Full Name -->
        <b-col
            cols="12"
            md="3"
        >
          <b-form-group
              label="Postal code"
          >
            <b-form-input
                disabled
                v-model="dataPayment.billing_details.address.postal_code"
            />
          </b-form-group>
        </b-col>

        <!-- Field: Email -->
        <b-col
            cols="12"
            md="3"
        >
          <b-form-group
              label="Description"
          >
            <b-form-textarea
                disabled
                v-model="dataPayment.description"
            />
          </b-form-group>
        </b-col>
        <b-col
            cols="12"
            md="3"
        >
          <b-form-group
              label="Destination"
          >
            <b-form-textarea
                disabled
                v-model="dataPayment.destination"
            />
          </b-form-group>
        </b-col>
      </b-row>
    </b-form>
    <hr>

    <b-form>
      <div class="d-flex align-items-center mb-2">
        <h3>Payment method </h3>
      </div>
      <b-row>
        <b-col
            cols="12"
            md="3"
        >
          <b-form-group
              label="Card"
          >
            <b-form-input
                v-model="dataPayment.payment_method_details.card.brand"
                disabled
            />
          </b-form-group>
        </b-col>

        <b-col
            cols="12"
            md="3"
        >
          <b-form-group
              label="Funding"
          >
            <b-form-input
                disabled
                v-model="dataPayment.payment_method_details.card.funding"
            />
          </b-form-group>
        </b-col>

        <b-col
            cols="12"
            md="3"
        >
          <b-form-group
              label="Expiration month"
          >
            <b-form-input
                disabled
                v-model="dataPayment.payment_method_details.card.exp_month"

            />
          </b-form-group>
        </b-col>
        <b-col
            cols="12"
            md="3"
        >
          <b-form-group
              label="Expiration year"
          >
            <b-form-input
                disabled
                v-model="dataPayment.payment_method_details.card.exp_year"
            />
          </b-form-group>
        </b-col>
        <b-col
            cols="12"
            md="3"
        >
          <b-form-group
              label="Number credit card"
          >
            <b-form-input
                disabled
                v-model="'*******'+ dataPayment.payment_method_details.card.last4"
            />
          </b-form-group>
        </b-col>
      </b-row>
      <hr>
    </b-form>
  </component>
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
  VBTooltip,
} from 'bootstrap-vue'
import vSelect from 'vue-select'
import {mapGetters} from "vuex";

export default {
  name: 'DetailsTransactionsMade',
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
    vSelect,
  },
  data() {
    return {
      dataPayment: {}
    }
  },
  methods: {
    getPayment() {
      this.$swal({
        title: 'Please, wait...',
        didOpen: () => {
          this.$swal.showLoading()
        },
      })
      this.$http.get(`admin/panel/charges/${this.$route.params.id}/show`)
          .then((response) => {
            this.dataPayment = response.data.data;
            this.$swal.close();
          }).catch((res) => console.log(res.data))
    }
  },
  mounted() {
    this.getPayment();
  }
}
</script>

<style lang="scss">
@import '@core/scss/vue/libs/vue-select.scss';

.circle-number-additional {
  background-color: #332b7b;
  padding: 5px 12px;
  border-radius: 16px;
  color: white;

}
</style>
