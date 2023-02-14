<template>
  <div class="d-flex justify-content-center">
    <b-card class="col-lg-9">
      <b-row class="containerCreateAdmin">
        <b-col class="container-form">
          <div class="cols-12 col-lg-12 d-flex flex-column">
            <validation-observer ref="formRules" tag="form">
              <div class="">
                <b-col lg="12">
                  <b-form-group label="Full Name">
                    <validation-provider #default="{ errors }" rules="required">
                      <b-form-input :disabled="true" v-model="itemAdmin.name"
                        :state="errors.length > 0 ? false : null" />
                      <small class="text-danger" v-if="errors[0]">This field is required</small>
                    </validation-provider>
                  </b-form-group>
                </b-col>
                <b-col lg="12">
                  <b-form-group label="Email">
                    <validation-provider #default="{ errors }" rules="required|email">
                      <b-form-input :disabled="true" v-model="itemAdmin.email"
                        :state="errors.length > 0 ? false : null" />
                      <small class="text-danger" v-if="errors[0]">This field is required</small>
                    </validation-provider>
                  </b-form-group>
                </b-col>
                <b-row lg="12">
                  <b-col cols="6">
                    <b-form-group label="Password">
                      <validation-provider #default="{ errors }" name="Password" vid="Password" rules="required">
                        <b-form-input ref="password" type="password" v-model="itemAdmin.password"
                          :state="errors.length > 0 ? false : null" />
                        <small class="text-danger">{{ errors[0] }}</small>
                      </validation-provider>
                    </b-form-group>
                  </b-col>

                  <b-col cols="6">
                    <b-form-group label="Confirmation">
                      <validation-provider #default="{ errors }" rules="required|confirmed:Password"
                        name="Password Confirm">
                        <b-form-input type="password" v-model="passwordConfirmation"
                          :state="errors.length > 0 ? false : null" />
                        <small class="text-danger">{{ errors[0] }}</small>
                      </validation-provider>
                    </b-form-group>
                  </b-col>
                </b-row>

              </div>
              <div class="pl-1">
                <b-button variant="primary" @click="sendForm">
                  <span class="d-none d-sm-inline">Save</span>
                  <feather-icon icon="EditIcon" class="d-inline d-sm-none" />
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
import { required, email } from '@validations'
import { ValidationObserver, ValidationProvider } from 'vee-validate'
import Cleave from 'vue-cleave-component'

export default {
  name: 'FormChangePassword',
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
    Cleave,
  },
  data() {
    return {
      itemAdmin: {
        id: '',
        name: '',
        email: '',
        password: '',
        role: 1,
      },
      passwordConfirmation: '',
      option: [
        {
          text: 'Super Admin',
          value: 1
        },
        {
          text: 'Admin',
          value: 2
        },
      ],
    }
  },
  methods: {
    sendForm() {
      this.validateForm()
    },
    saveData(id) {
      this.$swal({
        title: 'Please, wait...',
        didOpen: () => {
          this.$swal.showLoading()
        },
      })
      this.$http.post(`auth/admin/changePassword/${id}`, this.itemAdmin)
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
    },
    validateForm() {
      return new Promise((resolve, reject) => {
        this.$refs.formRules.validate()
          .then(success => {
            if (success) {
              if (this.itemAdmin.id > 0) {
                this.saveData(this.itemAdmin.id)
              }
            } else {
              reject()
            }
          })
      })
    },
  },
  mounted() {
    let data = this.$route.params.item
    if (data) {
      this.itemAdmin = data
      this.itemAdmin.role = data.role.id
    }
  }
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
