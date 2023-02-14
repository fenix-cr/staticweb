<template>
  <div>

    <!-- Media -->
    <b-media class="mb-2">
      <template #aside>
        <b-avatar ref="previewEl" :src="ProfileName(userData.name)" size="90px" rounded
          class="backgroundProfile-driver">
          <p class="text-name-driver" v-if='userData.profile_picture === null'>
            {{ ProfileName(userData.name) }}
          </p>
        </b-avatar>
      </template>
      <h4 class="">
        {{ userData.name }} ( <span style="font-size: 0.9rem">
          {{ userData.email }}
        </span>)
      </h4>

      <div class="d-flex flex-wrap">
        <b-button :variant="inhabilitar === true ? 'primary' : 'outline-secondary'" @click="inhabilitar = false">
          <span class="d-none d-sm-inline">Edit</span>
          <feather-icon icon="EditIcon" class="d-inline d-sm-none" />
        </b-button>

        <b-button v-if="inhabilitar === false" :variant="inhabilitar === true ? 'primary' : 'primary'" class="ml-1"
          @click="saveChanges">
          <span class="d-none d-sm-inline">Save</span>
          <feather-icon icon="TrashIcon" class="d-inline d-sm-none" />
        </b-button>
      </div>
    </b-media>

    <validation-observer ref="formRules" tag="form">
      <!-- form Admin -->
      <b-form>
        <b-row>
          <!-- Field: Username -->
          <b-col cols="12" md="3">
            <b-form-group label="Name">
              <validation-provider #default="{ errors }" rules="required">
                <b-form-input v-model="userData.name" :state="errors.length > 0 ? false : null" @keypress="isText"
                  maxlength="40" :disabled="inhabilitar === true" />
                <small class="text-danger" v-if="errors[0]">This field is required</small>
              </validation-provider>
            </b-form-group>
          </b-col>
          <b-col cols="12" md="3">
            <b-form-group label="Lastname">
              <validation-provider #default="{ errors }" rules="required">
                <b-form-input v-model="userData.lastname" :state="errors.length > 0 ? false : null" @keypress="isText"
                  maxlength="40" :disabled="inhabilitar === true" />
                <small class="text-danger" v-if="errors[0]">This field is required</small>
              </validation-provider>
            </b-form-group>
          </b-col>
          <!-- Field: Full Name -->
          <b-col cols="12" md="3">
            <b-form-group label="Email">
              <validation-provider #default="{ errors }" rules="required|email">
                <b-form-input v-model="userData.email" type="email" :state="errors.length > 0 ? false : null"
                  maxlength="50" :disabled="inhabilitar === true" />
                <small class="text-danger" v-if="errors[0]">This field is required</small>
              </validation-provider>
            </b-form-group>
          </b-col>
          <b-col cols="12" md="3">
            <b-form-group label="Birthday">
              <validation-provider #default="{ errors }" rules="required">

                <cleave id="date" v-model="userData.birthday" class="form-control" :raw="false" :options="options.date"
                  placeholder="MM-DD-YYYY" :disabled="inhabilitar === true" :state="errors.length > 0 ? false : null" />

                <small class="text-danger" v-if="errors[0]">This field is required</small>
              </validation-provider>
            </b-form-group>
          </b-col>
          <b-col cols="12" md="3">
            <b-form-group label="Gender">
              <validation-provider #default="{ errors }" rules="required">
                <div style="display: flex; gap: 10px">
                  <b-form-radio v-model="userData.gender" name="Female" value="Female" class="custom-control-secondary"
                    :state="errors.length > 0 ? false : null" :disabled="inhabilitar === true">
                    Female
                  </b-form-radio>
                  <!-- secondary -->
                  <b-form-radio v-model="userData.gender" name="Male" value="Male" class="custom-control-secondary"
                    :state="errors.length > 0 ? false : null" :disabled="inhabilitar === true">
                    Male
                  </b-form-radio>
                  <!-- success -->
                  <b-form-radio v-model="userData.gender" name="Other" value="Other" class="custom-control-secondary"
                    :state="errors.length > 0 ? false : null" :disabled="inhabilitar === true">
                    Other
                  </b-form-radio>
                </div>
                <small class="text-danger" v-if="errors[0]">This field is required</small>
              </validation-provider>
            </b-form-group>
          </b-col>
          <b-col cols="12" md="3">
            <b-form-group label="Phone number">
              <validation-provider #default="{ errors }" rules="required">
                <b-form-input v-model="userData.phone_number" :state="errors.length > 0 ? false : null"
                  @keypress="isNumber($event)" maxlength="11" :disabled="inhabilitar === true" />
                <small class="text-danger" v-if="errors[0]">This field is required</small>
              </validation-provider>
            </b-form-group>
          </b-col>
          <b-col cols="12" md="3">
            <b-form-group label="Note">
              <b-form-textarea v-model="userData.note" :disabled="inhabilitar === true" />
            </b-form-group>
          </b-col>
        </b-row>
        <!-- Header: Personal Info -->
        <div class="d-flex mt-2">
          <feather-icon icon="UserPlusIcon" size="19" />
          <h4 class="mb-0 ml-50">
            Additional contact
          </h4>
        </div>
        <!-- Form: Personal Info Form -->
        <b-row class="mt-1">

          <!-- Field: Address Line 1 -->
          <b-col cols="12" md="6" lg="4">
            <b-form-group label="City">
              <validation-provider #default="{ errors }" rules="required">
                <b-form-input id="autocomplete" v-model="userData.city" :state="errors.length > 0 ? false : null"
                  @keypress="isDirection" :disabled="inhabilitar === true" />
                <small class="text-danger" v-if="errors[0]">This field is required</small>
              </validation-provider>
            </b-form-group>
          </b-col>

          <!-- Field: Address Line 2 -->
          <b-col cols="12" md="6" lg="4">
            <b-form-group label="Address">
              <b-form-input v-model="userData.address" placeholder="Address" :disabled="true" />
              <gmap-autocomplete class="form-control" :value="searchAddress" placeholder="write the address"
                :disabled="inhabilitar === true" @place_changed="initMarker">
              </gmap-autocomplete>
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
    userData: {},
  },
  data() {
    return {
      inhabilitar: true,
      searchAddress: null,
      existingPlace: {},
      options: {
        date: {
          date: true,
          delimiter: '-',
          datePattern: ['m', 'd', 'Y'],
        },
      },
    }
  },
  methods: {
    validationForm() {
      return new Promise((resolve, reject) => {
        this.$refs.formRules.validate()
          .then(success => {
            if (success) {
              this.formSubmitted()
            }
          })
      })
    },
    saveChanges() {
      this.validationForm()
    },
    ProfileName(name) {
      if (this.userData.profile_picture === null) {
        return name.charAt(0).toUpperCase() + name.charAt(1).toUpperCase();
      } else {
        return this.userData.profile_picture;
      }
    },
    formSubmitted() {
      let mes = this.userData.birthday.slice(0, 2);
      let dia = this.userData.birthday.slice(3, 5);
      let year = this.userData.birthday.slice(6, 10);

      //validate date
      let date = `${year}-${mes}-${dia}`

      if (moment(date).isValid() === false) {
        this.$swal({
          title: 'Error, invalid date',
          icon: 'error',
          customClass: {
            confirmButton: 'btn btn-primary',
          },
          buttonsStyling: false,
        })
        this.validFecha = false;
        return
      }

      let data = { ...this.userData };
      data.birthday = date

      this.$swal({
        title: 'Please, wait...',
        didOpen: () => {
          this.$swal.showLoading()
        }
      })

      this.$http.post(`admin/panel/selfpay/${data.client_id}/modify`, data)
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
            this.inhabilitar = true;

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
    isDirection: function (event) {
      let regex = new RegExp('^[a-zA-Z0-9 ]+$')
      let key = String.fromCharCode(!event.charCode ? event.which : event.charCode)
      if (!regex.test(key)) {
        event.preventDefault()
        return false
      }
    },
    isText: function (event) {
      let regex = new RegExp('^[a-zA-Z ]+$')
      let key = String.fromCharCode(!event.charCode ? event.which : event.charCode)
      if (!regex.test(key)) {
        event.preventDefault()
        return false
      }
    },
    initMarker(loc) {
      this.existingPlace = loc
      this.userData.address = this.existingPlace.formatted_address
      this.userData.gps_address = this.existingPlace.geometry.location.lat() + ',' + this.existingPlace.geometry.location.lng()
    },
  },
  mounted() {
    console.log(this.userData.birthday)
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