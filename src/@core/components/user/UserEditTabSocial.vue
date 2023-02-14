<template>
  <div>
    <!-- Show info payment -->
    <!-- <div v-if="(infoPayment !== null || paymentMethods !== null) "> -->
    <div class="d-flex flex-wrap mt-2 mb-2" v-if="saveData === false">
      <b-button :variant="inhabilitar === true ? 'primary' : 'outline-secondary'" @click="setEditInfo">
        <span class="d-none d-sm-inline">Edit</span>
        <feather-icon icon="EditIcon" class="d-inline d-sm-none" />
      </b-button>

      <b-button v-if="inhabilitar === false" :variant="inhabilitar === true ? 'primary' : 'primary'" class="ml-1"
        @click="saveChanges">
        <span class="d-none d-sm-inline">Save</span>
        <feather-icon icon="TrashIcon" class="d-inline d-sm-none" />
      </b-button>
    </div>

    <div v-if="userData.corporate_account_personal_info && this.$hasPermission('client-sensitive-information')">
      <div  v-if="showData === true && (this.paymentMethods.brand !== '' || cargando == true) && userData.corporate_account_personal_info.payment_type == 'cc'">
        <!-- Header: Personal Info -->
        <div class="d-flex">
          <feather-icon icon="CreditCardIcon" size="19" />
          <h4 class="mb-0 ml-50" v-if="cargando === false">
            Payment method
          </h4>
          <h4 class="mb-0 ml-50" v-if="cargando === true">
            Retrieving Information. Please wait...
          </h4>
        </div>

        <b-form class="mt-1">
          <b-row>
            <b-col cols="12" md="6" lg="4">
              <b-form-group label="Name on Credit Card">
                <b-form-input v-model="paymentMethods.name" disabled />
              </b-form-group>
            </b-col>
            <b-col cols="12" md="6" lg="4">
              <b-form-group label="Card Number">
                <b-form-input v-model="'********' + paymentMethods.last4" disabled />
              </b-form-group>
            </b-col>

            <b-col cols="12" md="6" lg="4">
              <b-form-group label="Expiration date">
                <b-form-input v-model="paymentMethods.exp_month + ' / ' + paymentMethods.exp_year" disabled />
              </b-form-group>
            </b-col>


          </b-row>
        </b-form>
      </div>
    </div>


    <!-- Add new payment -->
    <div v-if="userData.corporate_account_personal_info">
      <template v-if="show_invoice_later === true">
        <b-row v-if='userData.corporate_account_personal_info.payment_type == "il"'>
          <b-col md="6">
            <b-form-group label="Invoice Later Notes">
              <b-form-input v-model="userData.corporate_account_personal_info.invoice_later" disabled />
            </b-form-group>
          </b-col>
        </b-row>
      </template>
    </div>
    <!-- Edit payment -->
    <!-- <template v-if="aggPayment === true"> -->
    <template v-if="saveData === true">
      <b-form class="mt-1">
        <b-row>
          <b-col md="4">
            <b-form-group label="Payment Type">
              <b-form-select v-model="userData.corporate_account_personal_info.payment_type" :options="option"
                label="title" placeholder="Please select">
                <option value="">Select Option</option>
              </b-form-select>
            </b-form-group>
          </b-col>
        </b-row>
        <b-row v-if="userData.corporate_account_personal_info.payment_type == 'cc'">
          <b-col cols="12" md="6" lg="4">
            <b-form-group label="Name on Credit Card">
              <b-form-input v-model="paymentMethods.name_on_cc" @keypress="isText" maxlength="30" />
            </b-form-group>
          </b-col>
          <b-col cols="12" md="6" lg="4">
            <b-form-group label="Card Number">
              <b-form-input v-model="paymentMethods.cc_number" @keypress="isNumber($event)" maxlength="16" />
            </b-form-group>
          </b-col>


          <b-col cols="12" md="6" lg="4">
            <b-form-group label="Code of cc">
              <b-form-input v-model="paymentMethods.code_of_cc" @keypress="isNumber($event)" maxlength="3"
                placeholder="***" />
            </b-form-group>
          </b-col>

          <b-col cols="12" md="6" lg="4">
            <b-form-group label="Expiration">
              <b-form-input v-model="paymentMethods.exp" v-mask="'##/####'" hint="MM/YYYY" placeholder="MM/YYYY" />
            </b-form-group>
          </b-col>
        </b-row>
        <b-row v-if='userData.corporate_account_personal_info.payment_type == "il"'>
          <b-col md="6">
            <b-form-group label="Invoice Later Notes">
              <b-form-input v-model="userData.corporate_account_personal_info.invoice_later" />
            </b-form-group>
          </b-col>
        </b-row>
        <b-row>
          <b-col class="mt-2">
            <b-button variant="primary" class="mb-1 mb-sm-0 mr-0 mr-sm-1"
              :block="$store.getters['app/currentBreakPoint'] === 'xs'" @click="SavePaymentMethod">
              Save Changes
            </b-button>
            <b-button v-if="newData === false" variant="outline-secondary"
              :block="$store.getters['app/currentBreakPoint'] === 'xs'" @click="setShowInfo">
              Cancel
            </b-button>
          </b-col>
        </b-row>
      </b-form>
    </template>
  </div>
</template>

<script>
import {
  BRow, BCol, BForm, BFormGroup, BFormInput, BButton, BInputGroup, BInputGroupPrepend, BFormSelect
} from 'bootstrap-vue'
import Stripe from 'stripe'
import infocontact from '@/navigation/vertical/infocontact'
import { mapGetters } from 'vuex'
import { getMessageError } from '@core/utils/utils'

export default {
  components: {
    BRow,
    BCol,
    BForm,
    BFormGroup,
    BFormInput,
    BButton,
    BInputGroup,
    BInputGroupPrepend,
    BFormSelect
  },
  computed: {
    ...mapGetters({
      userData: 'Users/usersData'
    }),
  },
  props: {
    infoPayment: {},
    corporateAccountId: 0
  },
  data() {
    return {
      reset: false,
      paymentMethods:
      {
        name_on_cc: "",
        cc_number: "",
        brand: "",
        code_of_cc: "",
        exp: "",
        exp_month: "00",
        exp_year: "0000",
        last4: "",

      },
      cargando: true,
      inhabilitar: true,
      showData: true,
      saveData: false,
      newData: false,
      show_invoice_later: true,
      option: [
        {
          text: "Credit Card",
          value: "cc"
        },
        {
          text: "Invoice Later",
          value: "il"
        }
      ]
    }
  },
  methods: {
    setShowInfo() {
      this.showData = true;
      this.saveData = false;
      this.newData = false;
      if (this.userData.corporate_account_personal_info.payment_type == 'il') {
        this.show_invoice_later = true
      }
    },
    setEditInfo() {
      this.showData = false;
      this.saveData = true;
      this.newData = false;
      this.show_invoice_later = false
    },
    setSaveInfo() {
      this.showData = false;
      this.saveData = true;
      this.newData = true;
    },
    setNewInfo() {
      this.showData = false;
      this.saveData = false;
      this.newData = true;
    },
    saveChanges() {
      this.formSubmitted()
    },
    setVariables(data) {
      this.cargando = false
      if (data.brand !== '') {
        this.setShowInfo();
      } else {
        this.setNewInfo();
      }
    },
    SavePaymentMethod() {
      this.inhabilitar = true
      let stripeCustomerId = this.paymentMethods.customer
      let url = `ca/panel/corporate/${stripeCustomerId}/${this.corporateAccountId}/UpdateStripePaymentMethod`

      //Get month and year expiration
      if (this.userData.corporate_account_personal_info.payment_type == 'cc') {
        let expirationTimeData = this.paymentMethods.exp.split("/");
        this.paymentMethods.exp_month = expirationTimeData[0]
        this.paymentMethods.exp_year = expirationTimeData[1]
      }

      this.$swal({
        title: 'Please, wait...',
        didOpen: () => {
          this.$swal.showLoading()
        },
      })
      if (this.newData === true) {
        url = `ca/panel/corporate/${stripeCustomerId}/${this.corporateAccountId}/AddStripePaymentMethod`
      }
      this.paymentMethods['userData'] = this.userData
      this.$http.post(url, this.paymentMethods)
        .then((res) => {
          if (res.data.status === 200) {
            this.$swal({
              title: "Record modified successfully",
              icon: 'success',
              customClass: {
                confirmButton: 'btn btn-primary',
              },
              buttonsStyling: false,
            })
            this.getCard()
            this.setShowInfo()
          } else {
            this.$swal({
              title: res.data.message,
              icon: 'error',
              customClass: {
                confirmButton: 'btn btn-primary',
              },
              buttonsStyling: false,
            })
          }
        })
        .catch((res) => {
          this.$swal({
            title:  getMessageError(res),
            icon: 'error',
            customClass: {
              confirmButton: 'btn btn-primary',
            },
            buttonsStyling: false,
          })
        })
    },
    isText: function (event) {
      let regex = new RegExp('^[a-zA-Z ]+$')
      let key = String.fromCharCode(!event.charCode ? event.which : event.charCode)
      if (!regex.test(key)) {
        event.preventDefault()
        return false
      }
    },
    isNumber: function (evt) {
      evt = evt ? evt : window.event
      let charCode = evt.which ? evt.which : evt.keyCode
      if (
        charCode > 31 &&
        (charCode < 48 || charCode > 57) &&
        charCode !== 46
      ) {
        evt.preventDefault()
      } else {
        return true
      }
    },
    clearInputs() {
      this.paymentMethods.name_on_cc = ''
      this.paymentMethods.cc_number = ''
      this.paymentMethods.type_of_cc = ''
      this.paymentMethods.code_of_cc = ''
    },
    getCard() {
      if (this.$store.getters['Users/userData'].user.role.id === 1 || this.$store.getters['Users/userData'].user.role.id === 2) {
        this.$http.get(`admin/panel/ca/${this.$route.params.id}/paymentMethod`)
          .then((response) => {
            if (response.data.data) {
              this.paymentMethods = response.data.data;
            }

            this.setVariables(this.paymentMethods)
          }).catch((error) => {
            console.log(error)
          })
      } else {
        this.$http.get(`ca/${this.$store.getters['Users/userData'].user.corporate_account.id}/panel/paymentMethod`)
          .then((response) => {
            if (response.data.data) {
              this.paymentMethods = response.data.data;
            }
            this.setVariables(this.paymentMethods)
          }).catch((error) => {
            this.$swal({
              title: getMessageError(error),
              icon: 'error',
              customClass: {
                confirmButton: 'btn btn-primary',
              },
              buttonsStyling: false,
            })
          })
      }
    }
  },
  mounted() {
  },
  beforeMount() {
    this.getCard()
  },
}
</script>

<style>

</style>
