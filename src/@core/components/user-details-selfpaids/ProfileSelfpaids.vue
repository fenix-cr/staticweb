<template>
  <div v-if="dataSelfpaids !== ''">
    <!-- Media -->
    <b-media class="mb-2">
      <template #aside>
        <b-avatar ref="previewEl" :src="dataSelfpaids.profile_picture" size="90px" rounded
          class="backgroundProfile-driver">
          <p class="text-name-driver" v-if='dataSelfpaids.profile_picture === null'>
            {{ ProfileName(dataSelfpaids.name) }}
          </p>
        </b-avatar>
      </template>
      <h4 class="">
        {{ dataSelfpaids.name }} ( <span style="font-size: 0.9rem">
          {{ dataSelfpaids.email }}
        </span>)
      </h4>
      <template>
        <div class="d-flex flex-wrap">
          <b-button :variant="inhabilitar === false ? 'primary' : 'outline-secondary'" class="ml-1"
            @click="inhabilitar = true">
            <span class="d-none d-sm-inline">Edit</span>
            <feather-icon icon="EditIcon" class="d-inline d-sm-none" />
          </b-button>
          <b-button v-if="inhabilitar === true" :variant="inhabilitar === true ? 'primary' : 'primary'" class="ml-1"
            @click="saveChanges">
            <span class="d-none d-sm-inline">Save</span>
            <feather-icon icon="TrashIcon" class="d-inline d-sm-none" />
          </b-button>
          <b-button variant="danger" class="ml-1" @click="deleteSelfpaid()">
            <span class="d-none d-sm-inline">Delete</span>
            <feather-icon icon="EditIcon" class="d-inline d-sm-none" />
          </b-button>
        </div>
      </template>
    </b-media>

    <!-- form Admin -->
    <validation-observer ref="formRules" tag="form">
      <!-- form corporate -->
      <b-form ref="registerForm">
        <b-row>
          <!-- Field: Username -->
          <b-col cols="12" md="3">
            <b-form-group label="Name">
              <validation-provider #default="{ errors }" rules="required" name="name">
                <b-form-input :disabled="inhabilitar === false" v-model="dataSelfpaids.name" />
                <small class="text-danger" v-if="errors[0]">{{ errors[0] }}</small>
              </validation-provider>
            </b-form-group>
          </b-col>
          <!-- Field: Full Name -->
          <b-col cols="12" md="3">
            <b-form-group label="Lastname">
              <validation-provider #default="{ errors }" rules="required" name="lastname">
                <b-form-input :disabled="inhabilitar === false" v-model="dataSelfpaids.lastname" />
                <small class="text-danger" v-if="errors[0]">{{ errors[0] }}</small>
              </validation-provider>
            </b-form-group>
          </b-col>
          <b-form-group label="Gender">
            <validation-provider #default="{ errors }" rules="required">
              <div style="display: flex; gap: 10px">
                <b-form-radio v-model="dataSelfpaids.gender" name="Female" value="Female"
                  class="custom-control-secondary" :state="errors.length > 0 ? false : null"
                  :disabled="inhabilitar === false">
                  Female
                </b-form-radio>
                <!-- secondary -->
                <b-form-radio v-model="dataSelfpaids.gender" name="Male" value="Male" class="custom-control-secondary"
                  :state="errors.length > 0 ? false : null" :disabled="inhabilitar === false">
                  Male
                </b-form-radio>
                <!-- success -->
                <b-form-radio v-model="dataSelfpaids.gender" name="Other" value="Other" class="custom-control-secondary"
                  :state="errors.length > 0 ? false : null" :disabled="inhabilitar === false">
                  Other
                </b-form-radio>
              </div>
              <small class="text-danger" v-if="errors[0]">This field is required</small>
            </validation-provider>
          </b-form-group>
          <b-col cols="12" md="3">
            <label>Birthday</label>

            <cleave id="date" v-model="dataSelfpaids.birthday" class="form-control" :raw="false" :options="options.date"
              placeholder="MM-DD-YYYY" :disabled="inhabilitar === false" />

          </b-col>
        </b-row>

        <b-row>
          <!-- Field: Phone number -->
          <b-col cols="12" md="3">
            <b-form-group label="Phone number">
              <validation-provider #default="{ errors }" rules="required|integer" name="phone number">
                <b-form-input v-model="dataSelfpaids.phone_number" :disabled="inhabilitar === false" />
                <small class="text-danger" v-if="errors[0]">{{ errors[0] }}</small>
              </validation-provider>
            </b-form-group>
          </b-col>
          <!-- Field: Full Name -->
          <b-col cols="12" md="3">
            <b-form-group label="Email">
              <validation-provider #default="{ errors }" rules="required|email" name="email">
                <b-form-input :disabled="inhabilitar === false" v-model="dataSelfpaids.email" @mouseover="changeColor()"  v-bind:class="{ 'border border-danger' : isEmail == false}" />
                <p class="text-right"><small><a @click="submitCode(dataSelfpaids.email)" class="bg-primary text-light rounded" style="padding: 2px;">Verify Email</a></small></p>
                <small class="text-danger" v-if="errors[0]">{{ errors[0] }}</small>
              </validation-provider>
            </b-form-group>
          </b-col>

          <!-- Field: City -->
          <b-col cols="12" md="3">
            <b-form-group label="Zip code">
              <validation-provider #default="{ errors }" rules="required" name="zip code">
                <b-form-input :disabled="inhabilitar === false" v-model="dataSelfpaids.city" />
                <small class="text-danger" v-if="errors[0]">{{ errors[0] }}</small>
              </validation-provider>
            </b-form-group>
          </b-col>

        </b-row>
        <b-row>

          <!-- Field: Addres -->
          <b-col cols="12" md="6">
            <b-form-group label="Address">
              <b-form-input v-model="dataSelfpaids.address" :disabled="true" />
              <gmap-autocomplete class="form-control" :value="searchAddress" placeholder="Home Address" :disabled="inhabilitar === false"
                @place_changed="initMarker">
              </gmap-autocomplete>
            </b-form-group>
          </b-col>

          <!-- Field: Note -->
          <b-col cols="12" md="6">
            <b-form-group label="Note">
              <b-form-textarea :disabled="inhabilitar === false" v-model="dataSelfpaids.note" />
            </b-form-group>
          </b-col>
        </b-row>
      </b-form>
    </validation-observer>
    <b-modal id="modal-center" centered hide-footer>
            <div class="d-block text-center">
            <h3>Enter 5 digits code recived to user</h3>
            <b-col>
                    <b-form-group >
                            <b-form-input v-model="code" @mouseover="changeColorCode(code)" v-bind:class="{ 'border border-danger' : isCode == false}"/>
                    </b-form-group>
            </b-col>
            </div>
            <b-row class="mt-3">
                <b-col >
                    <b-button  block @click="verifyCode()" >Verify</b-button>
                </b-col>
                <b-col>
                    <b-button  block @click="$bvModal.hide('modal-center')">Close</b-button>
                </b-col>
            </b-row>
        </b-modal>
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
  BFormRadio,
  BFormSelect,
  BFormDatepicker
} from 'bootstrap-vue'
import vSelect from 'vue-select'
import { mapGetters } from "vuex";
import { ValidationProvider, ValidationObserver } from 'vee-validate'
import Cleave from 'vue-cleave-component'

export default {
  name: "ProfileSelfpaids",
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
    BFormDatepicker,
    BFormRadio,
    vSelect,
    ValidationProvider,
    ValidationObserver,
    Cleave
  },
  data() {
    return {
      code:'',
      isEmail:true,
      isCode:true,
      inhabilitar: false,
      existingPlace: {},
      SelfpaidsData: {
        name: '',
        lastname: '',
        gender: '',
        birthday: '',
        phone_number: '',
        email: '',
        address: '',
        gps_address: '',
        city: '',
        note: '',
      },
      searchAddress: null,
      options: {
        date: {
          date: true,
          delimiter: '-',
          datePattern: ['m', 'd', 'Y'],
        },
      },
    }
  },
  computed: {
    ...mapGetters({
      dataSelfpaids: 'Users/usersData'
    })
  },
  methods: {
    changeColor(){
            this.isEmail = true
        },
    changeColorCode(){
            this.isCode = true
        },
    submitCode(email){
            if(email == ''){
                this.isEmail = false
            }else{
                this.$bvModal.show('modal-center')
                let formData = new FormData();
                formData.append("email",email);
                this.$http.post('ca/panel/client/saveEmailCode', formData)
                    .then((res) => {
                        if (res.data.status === 200) {
                           
                        } 
                    })
                    .catch((res) => {
                        
                    })

            }
        },
        verifyCode(){
            if(this.code == ''){
                this.isCode = false
            }
            else{
            let formData = new FormData();
            formData.append("code", this.code);
            this.$http.post('ca/panel/client/verifyEmailCode', formData)
                    .then((res) => {
                        if (res.data.status === 200) {
                            this.$bvModal.hide('modal-center')
                            this.$swal({
                                title: res.data.message,
                                icon: 'success',
                                customClass: {
                                    confirmButton: 'btn btn-primary',
                                },
                                buttonsStyling: false,
                            })
                        } 
                         if(res.data.status === 201) {
                            
                            this.$swal({
                                title: res.data.message,
                                icon: 'error',
                                customClass: {
                                    confirmButton: 'btn btn-primary',
                                },
                                buttonsStyling: true,
                            })
                        } 
                    })
                    .catch((res) => {
                        
                    })
            }
            

        },
    ProfileName(name) {
      if (this.dataSelfpaids.profile_picture === null) {
        return name.charAt(0).toUpperCase() + name.charAt(1).toUpperCase();
      } else {
        return this.dataSelfpaids.profile_picture;
      }
    },
    saveChanges() {
      this.validationForm()
    },
    validationForm() {
      return new Promise((resolve, reject) => {
        this.$refs.formRules.validate()
          .then(success => {
            if (success) {
              this.sendForm()
            }
          })
      })
    },
    sendForm() {
      this.$swal({
        title: 'Please, wait...',
        didOpen: () => {
          this.$swal.showLoading()
        },
      })
      let idEdit = this.$store.getters["Users/usersData"].client_id;

      let dataToSend = { ...this.dataSelfpaids };
      dataToSend.birthday = this.formatDate_YYYYMMDD(this.dataSelfpaids.birthday)

      this.$http.post(`admin/panel/selfpay/${idEdit}/modify`, dataToSend).then((response) => {
        this.$swal({
          title: response.data.data,
          icon: 'success',
          customClass: {
            confirmButton: 'btn btn-primary',
          },
          buttonsStyling: false,
        }).then((result) => {

        })
      }).catch((error) => {
        let message = error.response.data.data !== undefined ? error.response.data.data : error.response.data.message
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
    deleteSelfpaid() {
      this.$swal({
        title: 'Please, wait...',
        didOpen: () => {
          this.$swal.showLoading()
        },
      })
      let idDelete = this.$store.getters["Users/usersData"].client_id;
      this.$http.post(`admin/panel/selfpay/${idDelete}/delete`)
        .then((res) => {
          this.$swal({
            title: res.data.data,
            icon: 'success',
            customClass: {
              confirmButton: 'btn btn-primary',
            },
            buttonsStyling: false,
          }).then((result) => {
            if (result.isConfirmed) {
              this.$router.push({ name: 'all-selfpaids' })
            }
          })

        }).catch((error) => {
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
    initMarker(loc) {
      this.existingPlace = loc
      this.dataSelfpaids.address = this.existingPlace.formatted_address
      this.dataSelfpaids.gps_address = this.existingPlace.geometry.location.lat() + ',' + this.existingPlace.geometry.location.lng()
    },
    formatDate_YYYYMMDD(element) {
      let mes = element.slice(0, 2);
      let dia = element.slice(3, 5);
      let year = element.slice(6, 10);

      return `${year}-${mes}-${dia}`
    }
  },
  mounted() {

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
