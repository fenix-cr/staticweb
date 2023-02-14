<template>
  <div>
    <b-form v-if="dataCaSelfpaids !== ''">
      <b-row>
        <!-- Field: Username -->
        <b-col
            cols="12"
            md="4"
        >
          <b-form-group
              label="Company Legal Name"

          >
            <b-form-input
                v-model="dataCaSelfpaids.corporate_account.company_legal_name"
                disabled

            />
          </b-form-group>
        </b-col>

        <!-- Field: Full Name -->
        <b-col
            cols="12"
            md="4"
        >
          <b-form-group
              label="DBA"
          >
            <b-form-input
                v-model="dataCaSelfpaids.corporate_account.dba"
                disabled
            />
          </b-form-group>
        </b-col>

        <!-- Field: Email -->
        <b-col
            cols="12"
            md="4"
        >
          <b-form-group
              label="TIN"
          >
            <b-form-input
                v-model="dataCaSelfpaids.corporate_account.tin"
                disabled
            />
          </b-form-group>
        </b-col>

      </b-row>
      <b-row>
        <!-- Field: Email -->
        <b-col
            cols="12"
            md="4"
        >
          <b-form-group
              label="Office Location Address"
          >
            <b-form-input
                v-model="dataCaSelfpaids.corporate_account.office_location_address"
                disabled
            />
          </b-form-group>
        </b-col>

        <!-- Field: Email -->
        <b-col
            cols="12"
            md="4"
        >
          <b-form-group
              label="Billing Address"
          >
            <b-form-input
                v-model="dataCaSelfpaids.corporate_account.billing_address"
                disabled
            />
          </b-form-group>
        </b-col>

      </b-row>
    </b-form>
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
  BForm,
  BTable,
  BCard,
  BCardHeader,
  BCardTitle,
  BFormCheckbox,
} from 'bootstrap-vue'
import vSelect from 'vue-select'
import {mapGetters} from "vuex";

export default {
  name: "ProfileCorporateAccountSelf",
  components: {
    BButton,
    BMedia,
    BAvatar,
    BRow,
    BCol,
    BFormGroup,
    BFormInput,
    BForm,
    BTable,
    BCard,
    BCardHeader,
    BCardTitle,
    BFormCheckbox,
    vSelect,
  },

  computed: {
    ...mapGetters({
      dataCaSelfpaids: 'Users/usersData'
    })
  }
}
</script>

<style lang="scss">
@import '@core/scss/vue/libs/vue-select.scss';

.text-name {
  font-size: 1.5rem;
  margin-bottom: 0 !important;
}

.backgroundProfile {
  background-color: $primary;
}
</style>