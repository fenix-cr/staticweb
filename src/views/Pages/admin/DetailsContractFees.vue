<template>
  <div>
    <!-- Media -->
    <b-media class="mb-2">

      <h3 class="mb-2">
        <span >Edit Record</span>
        <span >Save Record</span>
      </h3>

      <div class="d-flex flex-wrap">

        <b-button v-if="inhabilitar === false" :variant="inhabilitar === true ? 'primary' : 'primary'" class="ml-1"
          @click="saveChanges">
          <span class="d-none d-sm-inline">Save</span>
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
            <b-form-group label="SettingCode">
              <validation-provider #default="{ errors }" rules="required">
                <b-form-input v-model="SettingCode" :state="errors.length > 0 ? false : null" 
                  :disabled="true" />
                <small class="text-danger" v-if="errors[0]">This field is required</small>
              </validation-provider>
            </b-form-group>
          </b-col>
          <b-col cols="12" md="3">
            <b-form-group label="SettingName">
              <validation-provider #default="{ errors }" rules="required">
                <b-form-input v-model="SettingName" :state="errors.length > 0 ? false : null"
                  :disabled="inhabilitar === true" />
                <small class="text-danger" v-if="errors[0]">This field is required</small>
              </validation-provider>
            </b-form-group>
          </b-col>
          <!-- Field: Full Name -->
          <b-col cols="12" md="3">
            <b-form-group label="SettingValue">
              <validation-provider #default="{ errors }" rules="required|integer" name="SettingValue">
                <b-form-input v-model="SettingValue" :state="errors.length > 0 ? false : null" maxlength="7"
                  :disabled="inhabilitar === true" />
                <small class="text-danger" v-if="errors[0]">{{ errors[0] }}</small>
              </validation-provider>
            </b-form-group>
          </b-col>
          <b-col cols="12" md="3">
            <b-form-group label="SettingDistance1">
              <validation-provider #default="{ errors }" rules="required|integer" name="SettingDistance1">
                <b-form-input v-model="SettingDistance1" :state="errors.length > 0 ? false : null"
                  maxlength="5" :disabled="inhabilitar === true" />
                <small class="text-danger" v-if="errors[0]">{{ errors[0] }}</small>
              </validation-provider>
            </b-form-group>
          </b-col>
          <b-col cols="12" md="3">
            <b-form-group label="SettingDistance2">
              <validation-provider #default="{ errors }" rules="required|integer" name="SettingDistance2">
                <b-form-input v-model="SettingDistance2" :state="errors.length > 0 ? false : null"
                  maxlength="5" :disabled="inhabilitar === true" />
                <small class="text-danger" v-if="errors[0]">{{ errors[0] }}</small>
              </validation-provider>
            </b-form-group>
          </b-col>
          <b-col cols="12" md="3">
            <b-form-group label="SettingType">
              <validation-provider #default="{ errors }" rules="required">
                <b-form-input v-model="SettingType" :state="errors.length > 0 ? false : null" maxlength="40"
                  :disabled="true" />
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
  },
  data() {
    return {
      inhabilitar: false,
    }
  },
  methods: {
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
    saveChanges() {
      this.validationForm()
    },
    formSubmit() {
      let data = { ...this.itemData };

      this.$swal({
        title: 'Please, wait...',
        didOpen: () => {
          this.$swal.showLoading()
        }
      })
      let url = ""
 this.idCA = parseInt(this.$route.params.id);
      //if is add action
      
        url = `admin/panel/ca/1/contractlist`
     
      this.$http.post(url, data)
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
            title: res.message,
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
    console.log(this.idCA);
    console.log(this.itemData);
    console.log('end');
  }
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