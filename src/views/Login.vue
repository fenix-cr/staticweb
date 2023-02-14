<template>
  <div class="auth-wrapper auth-v2">
    <b-row class="auth-inner m-0 container-logo-form">

      <!-- Brand logo-->
      <b-row class="main-logo-container">
        <b-link class="brand-logo">
          <vuexy-logo />
        </b-link>
      </b-row>

      <!-- /Brand logo-->

      <!-- Left Text-->
      <b-col lg="8" md="7" class="d-none d-lg-flex align-items-center p-5">
        <div class="w-100 d-lg-flex align-items-center justify-content-center px-5">
          <b-img fluid :src="imgUrl" alt="Login V2" class="imgLogin" />
        </div>
      </b-col>
      <!-- /Left Text-->

      <!-- Login-->
      <b-col lg="4" md="12" class="d-flex align-items-center auth-bg px-2 p-lg-5">
        <b-col sm="8" md="6" lg="12" class="px-xl-2 mx-auto form-login">

          <b-card-title title-tag="h2" class="font-weight-bold mb-1">
            Welcome to Amera! Test 12/08/2022👋
          </b-card-title>
          <b-card-text class="mb-2">
            <!--            Please sign-in to your account to start the adventure-->
          </b-card-text>

          <!-- form Admin -->
          <transition name="fade" mode="out-in">
            <validation-observer ref="loginValidation">

              <b-form class="auth-login-form mt-2" @submit.prevent>
                <!-- email -->
                <b-form-group label="Email" label-for="login-email">
                  <validation-provider #default="{ errors }" name="Email" rules="required|email">
                    <b-form-input id="login-email" v-model="person.userEmail" :state="errors.length > 0 ? false : null"
                      name="login-email" placeholder="john@example.com" type="email" />
                    <small v-if="errors[0]" class="text-danger">This field is required, enter a valid email </small>
                  </validation-provider>
                </b-form-group>

                <!-- forgot password -->
                <b-form-group>
                  <div class="d-flex justify-content-between">
                    <label for="login-password">Password</label>
                    <b-link :to="{ name: 'forgot-password' }">
                      <small class="colors-login">Forgot Password?</small>
                    </b-link>
                  </div>
                  <validation-provider #default="{ errors }" name="Password" rules="required">
                    <b-input-group class="input-group-merge" :class="errors.length > 0 ? 'is-invalid' : null">
                      <b-form-input id="login-password" v-model="person.password"
                        :state="errors.length > 0 ? false : null" class="form-control-merge" :type="passwordFieldType"
                        name="login-password" placeholder="············" />
                      <b-input-group-append is-text>
                        <feather-icon class="cursor-pointer" :icon="passwordToggleIcon"
                          @click="togglePasswordVisibility" />
                      </b-input-group-append>
                    </b-input-group>
                    <small v-if="errors[0]" class="text-danger">This field is required</small>
                  </validation-provider>
                </b-form-group>

                <!-- checkbox -->
                <b-form-group>
                  <b-form-checkbox id="remember-me" v-model="status" name="checkbox-1">
                    Remember Me
                  </b-form-checkbox>
                </b-form-group>

                <!-- submit buttons -->
                <b-button type="submit" variant="primary" block @click="validationForm" class="sigin">
                  Sign in
                </b-button>
              </b-form>
            </validation-observer>
          </transition>
          <b-card-text class="text-center mt-2">
            <span>New on our platform? </span>
            <b-link :to="{ name: 'register' }">
              <span class="colors-login">&nbsp;Create an account</span>
            </b-link>
          </b-card-text>

        </b-col>
      </b-col>
      <!-- /Login-->
    </b-row>
  </div>
</template>

<script>
/* eslint-disable global-require */
import { ValidationProvider, ValidationObserver } from 'vee-validate'
import VuexyLogo from '@core/layouts/components/Logo.vue'
import {
  BRow,
  BCol,
  BLink,
  BFormGroup,
  BFormInput,
  BInputGroupAppend,
  BInputGroup,
  BFormCheckbox,
  BCardText,
  BCardTitle,
  BImg,
  BForm,
  BButton,
} from 'bootstrap-vue'
import { required, email } from '@validations'
import { togglePasswordVisibility } from '@core/mixins/ui/forms'
import store from '@/store/index'
import ToastificationContent from '@core/components/toastification/ToastificationContent.vue'
import axios from 'axios'
import { getMessageError } from '@core/utils/utils'
export default {
  components: {
    BRow,
    BCol,
    BLink,
    BFormGroup,
    BFormInput,
    BInputGroupAppend,
    BInputGroup,
    BFormCheckbox,
    BCardText,
    BCardTitle,
    BImg,
    BForm,
    BButton,
    VuexyLogo,
    ValidationProvider,
    ValidationObserver,
  },
  mixins: [togglePasswordVisibility],
  data() {
    return {
      status: '',
      person: {
        password: '',
        userEmail: '',
        loginType: '',
      },
      viewFormCorporate: false,
      viewFormAdmin: false,
      btnUser: '',
      atras: false,
      sideImg: require('@/assets/images/pages/amera.png'),
      // validation rulesimport store from '@/store/index'
      required,
      email,
    }
  },
  computed: {
    passwordToggleIcon() {
      return this.passwordFieldType === 'password' ? 'EyeIcon' : 'EyeOffIcon'
    },
    imgUrl() {
      if (store.state.appConfig.layout.skin === 'dark') {
        // eslint-disable-next-line vue/no-side-effects-in-computed-properties
        this.sideImg = require('@/assets/images/pages/amera.png')
        return this.sideImg
      }
      return this.sideImg
    },
  },
  watch: {
    btnUser() {
      this.person.loginType = this.btnUser
    }
  },

  methods: {
    validationForm() {
      this.$refs.loginValidation.validate()
      if (this.person.userEmail === '' || this.person.password === '') {
        this.$swal({
          icon: 'error',
          title: 'Please fill out required fields',
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
          timer: 1000,
          customClass: {
            confirmButton: 'btn btn-primary',
          },
          buttonsStyling: false,
        })

        this.$store.dispatch('Users/retrieveToken', this.person)
          .then((res) => {
            this.$toast({
              component: ToastificationContent,
              props: {
                title: res.data.message,
                icon: 'CheckIcon',
                variant: 'success',
              },
            })

            // if(this.person.loginType === 'admin') {
            if (res.data.data.user.role.id === 3) {
              this.$router.push({ name: 'home-corporate-account' })
            } else if (res.data.data.user.role.id === 1) {
              this.$router.push({ name: 'home-admin' })
            } else if (res.data.data.user.role.id !== 1 && res.data.data.user.role.id !== 3) {
              
              this.$router.push({ name: 'home-user' })
            }
          })
          .catch((err) => {
            this.$swal({
              title: `Error`,
              icon: 'error',
              customClass: {
                confirmButton: 'btn btn-primary',
              },
              buttonsStyling: false,
            })
            
          })
      }
    },
    retornarInicio() {
      this.atras = true
      if (this.atras === true) {
        this.btnUser = ''
        this.person.userEmail = ''
        this.person.password = ''
      }
    },
  },
}
</script>

<style lang="scss">
@import '@core/scss/vue/pages/page-auth.scss';
@import "src/assets/scss/variables/variables-components.scss";

.fade-enter-active,
.fade-leave-active {
  transition: opacity .1ms;
}

.fade-enter,
.fade-leave-to

/* .fade-leave-active below version 2.1.8 */
  {
  opacity: 0;
}

.main-logo-container {
  padding-bottom: 372px;
  margin-bottom: 300px;
}


.imgLogin {
  height: 500px;
  border-radius: 10px;
  //box-shadow: 4px 2px 10px -2px #342b7b;
  box-shadow: 4px 2px 10px -2px #868498;
}

@media screen and (max-width: 1440px) {
  .imgLogin {
    height: 349px;
  }
}

@media screen and (min-width: 320px) and (max-width: 500px) {
  .container-logo-form {
    justify-content: space-between;
  }
}
</style>
