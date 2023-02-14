<template>
  <div class="d-flex justify-content-center">
    <b-card class="col-lg-6">
      <b-row class="containerCreateAdmin">
        <!-- <b-col>
          <div>
            <b-img class="imgAdmin" src="@/assets/images/pages/amera.png">
            </b-img>
          </div>

        </b-col> -->
        <b-col class="container-form">
          <div class="cols-12 col-lg-12 d-flex flex-column">
            <validation-observer
                ref="accountRules"
                tag="form"
            >
              <div class="">
                <b-col lg="12">
                  <b-form-group
                      label="Website"
                  >
                    <validation-provider
                        #default="{ errors }"
                        rules="required"
                    >
                      <b-form-input
                          v-model="information.website"
                          :state="errors.length > 0 ? false:null"
                      />
                      <small class="text-danger" v-if="errors[0]">This field is required</small>
                    </validation-provider>
                  </b-form-group>
                </b-col>
                <b-col lg="12">
                  <b-form-group
                      label="Email"
                  >
                    <validation-provider
                        #default="{ errors }"
                        rules="required|email"
                    >
                      <b-form-input
                          v-model="information.email"
                          :state="errors.length > 0 ? false:null"
                      />
                      <small class="text-danger" v-if="errors[0]">This field is required</small>
                    </validation-provider>
                  </b-form-group>
                </b-col>
                <b-col lg="12">
                  <b-form-group
                      label="Phone number"
                  >
                    <validation-provider
                        #default="{ errors }"
                        rules="required"
                    >
                      <b-form-input
                          v-model="information.phone_number"
                          :state="errors.length > 0 ? false:null"
                          @keyup="focusOut" @blur="focusOut"
                      />
                      <small class="text-danger" v-if="errors[0]">This field is required</small>
                    </validation-provider>

                  </b-form-group>
                </b-col>
              </div>
              <div class="pl-1">
                <b-button
                    variant="primary"
                    @click="createInformationContact"
                >
                  <span class="d-none d-sm-inline">Update</span>
                  <feather-icon
                      icon="EditIcon"
                      class="d-inline d-sm-none"
                  />
                </b-button>
              </div>
            </validation-observer>
          </div>
        </b-col>
      </b-row>
    </b-card>
  </div>
</template>

<script>
import {
  BRow,
  BCol,
  BLink,
  BButton,
  BForm,
  BFormCheckbox,
  BFormGroup,
  BFormInput,
  BInputGroup,
  BInputGroupAppend,
  BImg,
  BCard,
  BCardTitle,
  BCardText,
  BFormSelect, BFormDatepicker,
} from 'bootstrap-vue'
import {required, email} from '@validations'
import {ValidationObserver, ValidationProvider} from 'vee-validate'

export default {
  name: 'ContactInformation',
  components: {
    BRow,
    BCol,
    BCard,
    BLink,
    BButton,
    BForm,
    BFormCheckbox,
    BFormGroup,
    BFormInput,
    BInputGroup,
    BInputGroupAppend,
    BImg,
    BCardTitle,
    BCardText,
    BFormSelect,
    BFormDatepicker,

    ValidationProvider,
    ValidationObserver,
  },
  data() {
    return {
      information: {
        email: '',
        website: '',
        phone_number: '',
      },
    }
  },
  methods: {
   
    focusOut(event) {
      var cleaned = ('' + this.information.phone_number).replace(/\D/g, '');
      var match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/);
      if (match) {
        this.information.phone_number = '(' + match[1] + ') ' + match[2] + '-' + match[3];
      }
    },
    getContactData(){
            this.$swal({
            title: 'Please, wait...',
            didOpen: () => {
              this.$swal.showLoading()
            },
          })
          this.$http.get('/contactUs')
            .then((response) => {
             const res = response.data.data
              console.log('res: ',res.email)
              this.information.email = res.email
              this.information.website = res.website
              this.information.phone_number = res.phone_number
              this.focusOut()
              this.$swal.close();
            })
           
    },
    createInformationContact() {
      if (this.information.website === '' || this.information.email === '' || this.information.phone_number === '') {
        this.$swal({
          title: 'Please fill out required fields',
          icon: 'error',
          customClass: {
            confirmButton: 'btn btn-primary',
          },
          buttonsStyling: false,
        })
      } else {
        this.$swal({
          title: 'Please, wait...',
          didOpen: () => {
            this.$swal.showLoading()
          },
        })
        this.$http.post('admin/panel/contactUs', this.information)
            .then((response) => {
              this.$swal({
                title: response.data.message,
                icon: 'success',
                customClass: {
                  confirmButton: 'btn btn-primary',
                },
                buttonsStyling: false,
              })
            })
            .catch((error) => {
              this.$swal({
                title: error.response.data.message,
                icon: 'error',
                customClass: {
                  confirmButton: 'btn btn-primary',
                },
                buttonsStyling: false,
              })
            })
      }
    },
    validationForm() {
      return new Promise((resolve, reject) => {
        this.$refs.accountRules.validate()
            .then(success => {
              if (success) {
                resolve(true)
              } else {
                reject()
              }
            })
      })
    },
  },
   mounted() {
    this.getContactData()
  },
}
</script>

<style lang="scss" scoped>

.containerCreateAdmin {

  .imgAdmin {
    max-height: 356px;
    border-radius: 14px;
  }

  .container-form {
    display: flex;
    align-items: center;
  }

}

@media screen and(min-width: 320px) and (max-width: 1024px) {
  .containerCreateAdmin {
    flex-direction: column;
    gap: 10px;

    .imgAdmin {
      width: 100%;
    }
  }
}

</style>
