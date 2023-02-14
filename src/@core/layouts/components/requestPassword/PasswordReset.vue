<template>

  <b-col
      sm="8"
      md="6"
      lg="12"
      class="px-xl-2 mx-auto"
  >
    <b-card-title
        title-tag="h2"
        class="font-weight-bold mb-1"
    >
      Reset Password 🔒
    </b-card-title>
    <b-card-text class="mb-2">
      Your new password must be different from previously used passwords
    </b-card-text>

    <!-- form -->
    <validation-observer ref="simpleRules">
      <b-form
          class="auth-reset-password-form mt-2"
          method="POST"
          @submit.prevent="validationFormChangePass"
      >
        <!-- password -->
        <b-form-group
            label="New Password"
            label-for="reset-password-new"
        >
          <validation-provider
              #default="{ errors }"
              name="Password"
              vid="Password"
              rules="required|password"
          >
            <b-input-group
                class="input-group-merge"
                :class="errors.length > 0 ? 'is-invalid':null"
            >
              <b-form-input
                  id="reset-password-new"
                  v-model="password"
                  :type="password1FieldType"
                  :state="errors.length > 0 ? false:null"
                  class="form-control-merge"
                  name="reset-password-new"
                  placeholder="············"
              />
              <b-input-group-append is-text>
                <feather-icon
                    class="cursor-pointer"
                    :icon="password1ToggleIcon"
                    @click="togglePassword1Visibility"
                />
              </b-input-group-append>
            </b-input-group>
            <small class="text-danger">{{ errors[0] }}</small>
          </validation-provider>
        </b-form-group>

        <!-- confirm password -->
        <b-form-group
            label-for="reset-password-confirm"
            label="Confirm Password"
        >
          <validation-provider
              #default="{ errors }"
              name="Confirm Password"
              rules="required|confirmed:Password"
          >
            <b-input-group
                class="input-group-merge"
                :class="errors.length > 0 ? 'is-invalid':null"
            >
              <b-form-input
                  id="reset-password-confirm"
                  v-model="cPassword"
                  :type="password2FieldType"
                  class="form-control-merge"
                  :state="errors.length > 0 ? false:null"
                  name="reset-password-confirm"
                  placeholder="············"
              />
              <b-input-group-append is-text>
                <feather-icon
                    class="cursor-pointer"
                    :icon="password2ToggleIcon"
                    @click="togglePassword2Visibility"
                />
              </b-input-group-append>
            </b-input-group>
            <small class="text-danger">{{ errors[0] }}</small>
          </validation-provider>
        </b-form-group>

        <!-- submit button -->
        <b-button
            block
            type="submit"
            variant="primary"
        >
          Set New Password
        </b-button>
      </b-form>
    </validation-observer>

    <p class="text-center mt-2">
      <b-link :to="{name:'login'}">
        <feather-icon icon="ChevronLeftIcon"/>
        Back to login
      </b-link>
    </p>
  </b-col>

</template>

<script>
import {ValidationProvider, ValidationObserver} from 'vee-validate'
import VuexyLogo from '@core/layouts/components/Logo.vue'
import {
  BRow,
  BCol,
  BCardTitle,
  BCardText,
  BForm,
  BFormGroup,
  BInputGroup,
  BInputGroupAppend,
  BLink,
  BFormInput,
  BButton,
  BImg,
} from 'bootstrap-vue'
import {required} from '@validations'
import store from '@/store/index'
import ToastificationContent from '@core/components/toastification/ToastificationContent.vue'


export default {
  name: "PasswordReset",
  components: {
    VuexyLogo,
    BRow,
    BCol,
    BButton,
    BCardTitle,
    BCardText,
    BForm,
    BFormGroup,
    BImg,
    BInputGroup,
    BLink,
    BFormInput,
    BInputGroupAppend,
    ValidationProvider,
    ValidationObserver,
  },
  data() {
    return {
      userEmail: '',
      cPassword: '',
      password: '',


      sideImg: require('@/assets/images/pages/reset-password-v2.svg'),
      // validation
      required,

      recoveryPass: {
        email: '',
        password: '',
        code: ''
      },

      // Toggle Password
      password1FieldType: 'password',
      password2FieldType: 'password',
    }
  },
  computed: {
    passwordToggleIcon() {
      return this.passwordFieldType === 'password' ? 'EyeIcon' : 'EyeOffIcon'
    },
    imgUrl() {
      if (store.state.appConfig.layout.skin === 'dark') {
        // eslint-disable-next-line vue/no-side-effects-in-computed-properties
        this.sideImg = require('@/assets/images/pages/reset-password-v2-dark.svg')
        return this.sideImg
      }
      return this.sideImg
    },
    password1ToggleIcon() {
      return this.password1FieldType === 'password' ? 'EyeIcon' : 'EyeOffIcon'
    },
    password2ToggleIcon() {
      return this.password2FieldType === 'password' ? 'EyeIcon' : 'EyeOffIcon'
    },
  },
  methods: {
    togglePassword1Visibility() {
      this.password1FieldType = this.password1FieldType === 'password' ? 'text' : 'password'
    },
    togglePassword2Visibility() {
      this.password2FieldType = this.password2FieldType === 'password' ? 'text' : 'password'
    },
    validationFormChangePass() {
      if (this.password !== this.cPassword) {
        this.$swal({
          title: 'Password does not match',
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
        this.recoveryPass.email = this.$store.getters['Users/userData'].email;
        this.recoveryPass.code = parseInt(this.$store.getters['Users/userData'].code);
        this.recoveryPass.password = this.password;


        this.$http.post(`auth/users/recoverPassword/changePassword`, this.recoveryPass)
            .then((response) => {
              this.$swal({
                title: response.data.message,
                icon: 'success',
                customClass: {
                  confirmButton: 'btn btn-primary',
                },
                buttonsStyling: false,
              }).then((result) => {
                if (result.isConfirmed) {
                  this.$router.push({name: 'login'})
                }
              })
            }).catch((error) => {
          this.$swal({
            title: error.response.data.data,
            icon: 'error',
            customClass: {
              confirmButton: 'btn btn-primary',
            },
            buttonsStyling: false,
          })
        })
      }
    },

  },
}
</script>

<style scoped>

</style>