<template>
  <div>

    <!-- Media -->
    <b-media class="mb-2">

      <h3 class="mb-2">
        <span v-if="itemData.id !== undefined">Edit Record</span>
        <span v-if="itemData.id === undefined">Save Record</span>
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
          <b-col cols="12" md="3">
            <b-form-group label="Name">
              <validation-provider #default="{ errors }" rules="required" name="name">
                <b-form-input v-model="itemData.driver.name" :state="errors.length > 0 ? false : null"
                  :disabled="true" />
                <small class="text-danger" v-if="errors[0]">{{ errors[0] }}</small>
              </validation-provider>
            </b-form-group>
          </b-col>
          <b-col cols="12" md="3">
            <b-form-group label="Lastname">
              <validation-provider #default="{ errors }" rules="required" name="lastname">
                <b-form-input v-model="itemData.driver.lastname" :state="errors.length > 0 ? false : null"
                  :disabled="true" />
                <small class="text-danger" v-if="errors[0]">{{ errors[0] }}</small>
              </validation-provider>
            </b-form-group>
          </b-col>

          <b-col cols="12" md="3">
            <b-form-group label="City">
              <validation-provider #default="{ errors }" rules="required" name="city">
                <b-form-input v-model="itemData.city" :state="errors.length > 0 ? false : null"
                  :disabled="inhabilitar === true" />
                <small class="text-danger" v-if="errors[0]">{{ errors[0] }}</small>
              </validation-provider>
            </b-form-group>
          </b-col>
          <b-col cols="12" md="3">
            <b-form-group label="State">
              <validation-provider #default="{ errors }" rules="required" name="state">
                <b-form-input v-model="itemData.state" :state="errors.length > 0 ? false : null"
                  :disabled="inhabilitar === true" />
                <small class="text-danger" v-if="errors[0]">{{ errors[0] }}</small>
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
      inhabilitar: true,
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

      //if is add action
      if (this.itemData.id === undefined) {
        url = `admin/panel/workcity/add`
      } else {
        //if is update action
        url = `admin/panel/workcity/${data.id}/modify`
      }


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
    GetName() {
      return `${this.itemData.driver.name}  ${this.itemData.driver.lastname}  ${this.itemData.driver.driver_id}`.toUpperCase()
    }
  },
  mounted() {
    if (this.itemData.id === undefined) {
      this.inhabilitar = false
    }
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
