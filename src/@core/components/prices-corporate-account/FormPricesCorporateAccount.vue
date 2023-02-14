<template>
  <div>

    <!-- Media -->
    <b-media class="mb-2">

      <h3 class="mb-2">
        <span v-if="itemData.id !== undefined && this.$hasPermission('modifying-rates')">Edit Record</span>
        <span v-if="itemData.id === undefined">Save Record</span>
      </h3>


      <div class="d-flex flex-wrap">

        <b-button :variant="inhabilitar === true ? 'primary' : 'primary'" class="ml-1" @click="saveChanges"
          v-if="itemData.id === undefined">
          <span class="d-none d-sm-inline">Save</span>
          <feather-icon icon="TrashIcon" class="d-inline d-sm-none" />
        </b-button>

        <b-button :variant="inhabilitar === true ? 'primary' : 'primary'" class="ml-1" @click="saveChanges"
          v-if="itemData.id !== undefined && this.$hasPermission('modifying-rates')">
          <span class="d-none d-sm-inline">Update</span>
          <feather-icon icon="TrashIcon" class="d-inline d-sm-none" />
        </b-button>
      </div>
    </b-media>

    <validation-observer ref="formRules" tag="form">
      <!-- form Admin -->
      <b-form ref="registerForm">
        <b-row>
          <!-- Field: Username -->
          <b-col cols="12" md="3">
            <b-form-group label="Type service">
              <validation-provider #default="{ errors }" rules="required" name="type service">
                <v-select v-model="typeServiceSelected" :options="optionTypeService" label="title"
                  placeholder="Type service" />
                <small class="text-danger" v-if="errors[0]">{{ errors[0] }}</small>
              </validation-provider>
            </b-form-group>
          </b-col>
          <b-col cols="12" md="3">
            <b-form-group label="Base each way fee">
              <validation-provider #default="{ errors }" rules="required" name="base each way">
                <cleave id="date" v-model="itemData.base_each_way" class="form-control" :raw="false"
                  :options="options.numeral" :state="errors.length > 0 ? false : null" />
                <small class="text-danger" v-if="errors[0]">{{ errors[0] }}</small>
              </validation-provider>
            </b-form-group>
          </b-col>
          <!-- Field: Full Name -->
          <b-col cols="12" md="3">
            <b-form-group label="Price per mile">
              <validation-provider #default="{ errors }" rules="required" name="mileage">
                <cleave id="mileage" v-model="itemData.mileage" class="form-control" :raw="false"
                  :options="options.numeral" :state="errors.length > 0 ? false : null" />
                <small class="text-danger" v-if="errors[0]">{{ errors[0] }}</small>
              </validation-provider>
            </b-form-group>
          </b-col>
          <b-col cols="12" md="3">
            <b-form-group label="Wait time per hour fee">
              <validation-provider #default="{ errors }" rules="required" name="wait time per hour">
                <b-form-input v-model="itemData.wait_time_per_hour" :state="errors.length > 0 ? false : null"
                  maxlength="2" />
                <small class="text-danger" v-if="errors[0]">{{ errors[0] }}</small>
              </validation-provider>
            </b-form-group>
          </b-col>
          <b-col cols="12" md="3">
            <b-form-group label="Additional stop fee">
              <validation-provider #default="{ errors }" rules="required" name="base each way">
                <cleave id="date" v-model="itemData.additional_stop" class="form-control" :raw="false"
                  :options="options.numeral" :state="errors.length > 0 ? false : null" />
                <small class="text-danger" v-if="errors[0]">{{ errors[0] }}</small>
              </validation-provider>
            </b-form-group>
          </b-col>
          <b-col cols="12" md="3">
            <b-form-group label="Cancellation fee">
              <validation-provider #default="{ errors }" rules="required" name="cancellation">
                <cleave id="cancellation" v-model="itemData.cancellation" class="form-control" :raw="false"
                  :options="options.numeral" :state="errors.length > 0 ? false : null" />
                <small class="text-danger" v-if="errors[0]">{{ errors[0] }}</small>
              </validation-provider>
            </b-form-group>
          </b-col>
          <b-col cols="12" md="3">
            <b-form-group label="Minimum fee">
              <validation-provider #default="{ errors }" rules="required" name="minimum">
                <cleave id="minimum" v-model="itemData.minimum" class="form-control" :raw="false"
                  :options="options.numeral" :state="errors.length > 0 ? false : null" />
                <small class="text-danger" v-if="errors[0]">This field is required</small>
              </validation-provider>
            </b-form-group>
          </b-col>
          <b-col cols="12" md="3">
            <b-form-group label="Minimum miles fee">
              <validation-provider #default="{ errors }" rules="required|integer" name="minimum_miles">
                <b-form-input v-model="itemData.minimum_miles" :state="errors.length > 0 ? false : null"
                  maxlength="5" />
                <small class="text-danger" v-if="errors[0]">{{ errors[0] }}</small>
              </validation-provider>
            </b-form-group>
          </b-col>
          <b-col cols="12" md="3">
            <b-form-group label="Corporate Account">
              <validation-provider #default="{ errors }" rules="required" name="company">
                <v-select v-model="company" label="company_legal_name" :options="listCompanies" :reduce="c => `${c.id}`"
                  :state="errors.length > 0 ? false : null"
                  :disabled="$store.getters['Users/userData'].user.role.id === 3">
                  <template #option="{ company_legal_name }">
                    {{ company_legal_name }}
                  </template>
                </v-select>
                <small class="text-danger" v-if="errors[0]">This field is required</small>
              </validation-provider>
            </b-form-group>
          </b-col>
        </b-row>
      </b-form>
    </validation-observer>

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
  BFormTextarea,
  BFormRadio,
} from 'bootstrap-vue'
import vSelect from 'vue-select'
import { ValidationProvider, ValidationObserver } from 'vee-validate'
import moment from "moment"
import Cleave from 'vue-cleave-component'


export default {
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
    BFormTextarea,
    BFormRadio,
    vSelect,
    ValidationProvider,
    ValidationObserver,
    moment,
    Cleave
  },
  props: {
    itemData: {
    },
    companies: [],
  },
  data() {
    return {
      inhabilitar: true,
      company: {
        id: 0,
        company_legal_name: '',
      },
      listCompanies: [],
      options: {
        numeral: {
          numeral: true,
          numeralDecimalMark: '.',
          delimiter: '',
          numeralIntegerScale: 5
        },
      },
      optionTypeService: [
        {
          title: 'Sedan',
          value: 'sedan',
        },
        {
          title: 'Wheelchair Van',
          value: 'wheelchairvan',
        },
        {
          title: 'Gurney Van',
          value: 'gurneygan',
        },
        {
          title: 'BLS',
          value: 'bls',
        },
      ],
      typeServiceSelected: {},
    }
  },
  methods: {
    saveChanges() {
      this.itemData.corporate_account_id = this.company.id == undefined ? this.company : this.company.id
      this.validationForm()
    },
    validationForm() {
      return new Promise((resolve, reject) => {
        this.$refs.formRules.validate()
          .then(success => {
            if (success) {
              this.formSubmit()
            }
          })
      })
    },
    formSubmit() {
      let data = { ...this.itemData };
      data.type_service = this.typeServiceSelected.value

      this.$swal({
        title: 'Please, wait...',
        didOpen: () => {
          this.$swal.showLoading()
        }
      })

      let url = ""

      //if is add action
      if (this.itemData.id === undefined) {
        url = `ca/panel/corporate/price_corporate_account/add`
      } else {
        //if is update action
        url = `ca/panel/corporate/price_corporate_account/${data.id}/modify`
      }

      let message = this.itemData.id > 0 ? "Record modified successfully" : "Record added successfully"
      this.$http.post(url, data)
        .then((res) => {
          if (res.data.status === 200) {
            if (this.itemData.id === undefined) {
              this.$refs.formRules.reset()
              this.itemData = {}
            }

            this.$swal({
              title: message,
              icon: 'success',
              customClass: {
                confirmButton: 'btn btn-primary',
              },
              buttonsStyling: false,
            })
            this.$router.push({ name: 'all-prices-corporate-account' })
          } else {
            console.log(res.data.message.data)
            this.$swal({
              title: res.data.message.data,
              icon: 'error',
              customClass: {
                confirmButton: 'btn btn-primary',
              },
              buttonsStyling: false,
            })
          }
        })
        .catch((res) => {
          let message = res.response.data.data !== undefined ? res.response.data.data : res.response.data.message
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
    getCompanies() {
      let url = "ca/panel/ca/list"

      this.$swal({
        title: 'Please, wait...',
        didOpen: () => {
          this.$swal.showLoading()
        }
      })

      this.$http.get(url).then((response) => {
        this.listCompanies = response.data.data

        //if role is corporate account
        if (this.$store.getters['Users/userData'].user.role.id === 3) {
          this.company = this.$store.getters['Users/userData'].user.corporate_account
        }
        this.$swal.close();
      }).catch((error) => {
        console.log(error)
        this.$swal({
          title: error.response.data.message,
          icon: 'error',
          customClass: {
            confirmButton: 'btn btn-primary',
          },
          buttonsStyling: false,
        })
      })
    },
  },
  mounted() {
    this.company = this.itemData.corporate_account

    if (this.companies) {
      this.listCompanies = this.companies
    } else {
      this.getCompanies()
    }

    //set type of service combo box
    this.typeServiceSelected = this.optionTypeService.find(x => x.value === this.itemData.type_service);
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
</style>
