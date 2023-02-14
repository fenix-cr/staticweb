<template>
  <!-- /Left Text-->

  <!-- Forgot password-->
  <b-col
      lg="4"
      class="d-flex align-items-center auth-bg px-2 p-lg-5"

  >
    <b-col
        sm="8"
        md="6"
        lg="12"
        class="px-xl-2 mx-auto form-login"
        v-if="formCode === false"
    >
      <b-card-title
          title-tag="h2"
          class="font-weight-bold mb-1"
      >
        Verification code 🔒
      </b-card-title>
      <b-card-text class="mb-2">
        Enter the verification code sent to your email
      </b-card-text>

      <!-- form -->

      <b-form
          class="auth-forgot-password-form mt-2"
          @submit.prevent="validationForm"
          ref="otpProcess"
      >
        <div class="groupOtp">
          <b-form-group

          >
            <b-form-input
                class="inputOtp"
                v-model="value1"
                data-next="value2"
                id="value1"
                maxlength=1
            />

          </b-form-group>
          <b-form-group
          >
            <b-form-input
                class="inputOtp"
                id="value2"
                v-model="value2"
                data-next="value3"
                data-previous="value1"
                maxlength=1
            />
          </b-form-group>
          <b-form-group
          >
            <b-form-input
                class="inputOtp"
                id="value3"
                v-model="value3"
                data-next="value4"
                data-previous="value2"
                maxlength=1
            />
          </b-form-group>
          <b-form-group
          >
            <b-form-input
                class="inputOtp"
                id="value4"
                v-model="value4"
                data-next="value5"
                data-previous="value3"
                maxlength=1
            />
          </b-form-group>
          <b-form-group
          >
            <b-form-input
                class="inputOtp"
                id="value5"
                v-model="value5"
                data-next="digit-2"
                data-previous="value4"
                maxlength=1
            />
          </b-form-group>


        </div>
        <b-button
            type="submit"
            variant="primary"
            block
        >
          Send reset link
        </b-button>
      </b-form>


      <p class="text-center mt-2">
        <b-link :to="{name:'login'}">
          <feather-icon icon="ChevronLeftIcon"/>
          Back to login
        </b-link>
      </p>
    </b-col>

    <template v-if="formCode === true">
      <password-reset />
    </template>
  </b-col>
</template>

<script>
import VuexyLogo from '@core/layouts/components/Logo.vue'
import {
  BRow, BCol, BLink, BCardTitle, BCardText, BImg, BForm, BFormGroup, BFormInput, BButton,
} from 'bootstrap-vue'
import {required} from '@validations'
import store from '@/store/index'
import passwordReset from "@core/layouts/components/requestPassword/PasswordReset";

export default {
  name: "CodeVerification",
  components: {
    VuexyLogo,
    BRow,
    BCol,
    BLink,
    BImg,
    BForm,
    BButton,
    BFormGroup,
    BFormInput,
    BCardTitle,
    BCardText,
    passwordReset,
  },

  data() {
    return {
      forgot: {
        email: '',
        code: 0,
      },
      value1: '',
      value2: '',
      value3: '',
      value4: '',
      value5: '',
      focus: false,
      formCode: false,
      sideImg: require('@/assets/images/pages/forgot-password-v2.svg'),
      // validation
      required,

    }
  },
  computed: {
    imgUrl() {
      if (store.state.appConfig.layout.skin === 'dark') {
        // eslint-disable-next-line vue/no-side-effects-in-computed-properties
        this.sideImg = require('@/assets/images/pages/forgot-password-v2-dark.svg')
        return this.sideImg
      }
      return this.sideImg
    },
    // autofocus() {
    //   if(this.value1 !== ''){
    //     return 'autofocus'
    //   }
    // }
  },
  watch: {
    value1() {
      if (this.value1 !== '') {
        return document.getElementById('value2').focus()
      }
    },
    value2() {
      if (this.value2 !== '') {
        return document.getElementById('value3').focus()
      } else if (this.value2 === '') {
        return document.getElementById('value1').focus()
      }
    },
    value3() {
      if (this.value3 !== '') {
        return document.getElementById('value4').focus()
      } else if (this.value3 === '') {
        return document.getElementById('value2').focus()
      }
    },
    value4() {
      if (this.value4 !== '') {
        return document.getElementById('value5').focus()
      } else if (this.value4 === '') {
        return document.getElementById('value3').focus()
      }
    },
    value5() {
      if (this.value5 === '') {
        return document.getElementById('value4').focus()
      }
    },
  },
  methods: {
    validationForm() {
      if (this.value1 === '' || this.value2 === '' || this.value3 === '' || this.value4 === '' || this.value5 === '') {
        this.$swal({
          title: 'Fill in the fields correctly',
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
        this.forgot.email = this.$store.getters['Users/userData'].email;
        this.forgot.code = parseInt(this.value1 + this.value2 + this.value3 + this.value4 + this.value5);


        this.$http.post(`/auth/users/recoverPassword/validateCode`, this.forgot)
            .then((response) => {
              this.$swal({
                title: response.data.message,
                icon: 'success',
                customClass: {
                  confirmButton: 'btn btn-primary',
                },
                buttonsStyling: false,
              })
              this.$store.commit('Users/userData', this.forgot)
              this.formCode = true;
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
  }
}
</script>

<style lang="scss" scoped>
@import '@core/scss/vue/pages/page-auth.scss';
@import "src/assets/scss/variables/variables-components.scss";


.groupOtp {
  display: flex !important;
  gap: 32px !important;
}

.inputOtp {
  width: 92% !important;
  height: 59px !important;
}

input[type="text"] {
  text-align: center;
  font-size: 3em;
}

@media screen and (min-width: 425px) and (max-width: 768px) {
  .inputOtp {
    height: 59px !important;
  }
  .groupOtp {
    gap: 19px !important;
  }
  input[type="text"] {
   padding: 0;
  }
}

@media screen and (min-width: 320px) and (max-width: 424px) {
  .inputOtp {
    height: 39px !important;
  }
  .groupOtp {
    gap: 19px !important;
  }
  input[type="text"] {
    text-align: center;
    font-size: 1.5rem;
    padding: 0;
  }

}

@media screen and (min-width: 1024px) and (max-width: 1440px){
  .inputOtp {
    height: 37px !important;
  }
  .groupOtp {
    gap: 6px !important;
  }
  input[type="text"] {
    text-align: center;
    font-size: 1em;
    padding: 0;
  }
}
</style>