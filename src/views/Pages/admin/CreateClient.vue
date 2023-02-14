<template>
  <div class="auth-wrapper auth-v2" oncopy="return false" onpaste="return false">
    <b-row class="auth-inner m-0">
    
      <!-- Register-->
    
        <b-col sm="12" md="12" lg="12" class="px-xl-2 mx-auto form-login">

          <!-- form -->
          <template>
            <div
                class="cols-12 col-xl-12 justify-content-center"
             
            >
              <form-wizard
                  color="#7367F0"
                  :title="null"
                  :subtitle="null"
                  finish-button-text="Submit"
                  back-button-text="Previous"
                  ref="registerForm"
                  class="
                  steps-transparent
                  mb-3
                  d-lg-flex d-xl-flex d-md-flex
                  justify-content-center
                  flex-xl-column
                  formcreatepatient
                  flex-md-column
                "
                  @on-complete="formSubmitted"
                  style="background-color: #fff"

              >
               
                <!-- account detail tab -->
                <tab-content
                    title="Account Details"
                    :before-change="validationForm"
                >
                  <validation-observer
                      ref="accountRules"
                      tag="form"
                  >
                    <b-row>
                      <b-col cols="12" class="mb-2">
                        <h5 class="mb-0">Account Details</h5>
                        <small class="text-muted" style="color: #000000d6 !important">
                          Enter Your Account Details.
                        </small>
                      </b-col>
                      <b-col md="6">
                        <b-form-group
                            label="Company Legal Name"
                        >
                          <validation-provider
                              #default="{ errors }"
                              rules="required"
                          >
                            <b-form-input
                                v-model="dataregister.company_legal_name"
                                :state="errors.length > 0 ? false:null"
                                type="text"
                                pattern="^[A-Za-z]+$"

                            />
                            <small class="text-danger" v-if="errors[0]">This field is required</small>
                          </validation-provider>
                        </b-form-group>
                      </b-col>
                      <b-col md="6">
                        <b-form-group label="DBA">
                          <b-form-input
                              v-model="dataregister.dba"
                              type="text"
                          />
                        </b-form-group>
                      </b-col>
                   
                      <b-col md="6">
                        <b-form-group label="TIN">
                          <validation-provider
                              #default="{ errors }"
                              name="tin"
                              rules="required"
                          >
                            <b-form-input
                                v-model="dataregister.tin"
                                :state="errors.length > 0 ? false:null"
                                @keypress="isNumberVar($event)"
                            />
                            <small class="text-danger" v-if="errors[0]">This field is required</small>
                          </validation-provider>
                        </b-form-group>
                      </b-col>
                     
                      <b-col md="6">
                        <b-form-group
                            label="Corporate Address"
                        >

                          <gmap-autocomplete :style="errorstwo === true ? classError : classError "
                                             class="form-control" @place_changed="initMarkerTo"
                          >
                          </gmap-autocomplete>
                          <small class="text-danger" v-if="errorstwo === true">This field is required</small>
                        </b-form-group>

                      </b-col>
                      <b-col md="6">
                        <b-form-group
                            label="Billing Address"
                        >
                          <gmap-autocomplete :style="errorsbilling === true ? classErrorBilling : classErrorBilling "
                                             class="form-control" @place_changed="initMarker"
                          >
                          </gmap-autocomplete>
                          <small class="text-danger" v-if="errorsbilling === true">This field is required</small>
                        
                        </b-form-group>
                      </b-col>
                    </b-row>
                  </validation-observer>
                </tab-content>

                <!-- personal details -->
                <tab-content title="Contact Information"
                             :before-change="validationFormInfo"
                >
                  <validation-observer
                      ref="infoRules"
                      tag="form"
                  >
                    <b-row>
                      <b-col cols="12" class="mb-2">
                        <h5 class="mb-0">Contact Information</h5>
                        <small class="text-muted" style="color: #000000d6 !important"
                        >Enter Your Contact Information.</small
                        >
                      </b-col>
                      <b-col md="6">
                        <b-form-group
                            label="Company Phone Number"
                        >
                          <validation-provider
                              #default="{ errors }"
                              name="phone_number"
                              rules="required"
                          >
                            <b-form-input
                                v-model="dataregister.telephone_number"
                                :state="errors.length > 0 ? false:null"
                                @keypress="isNumber($event)"
                                maxlength="10"
                            />
                            <small class="text-danger" v-if="errors[0]">This field is required</small>
                          </validation-provider>
                        </b-form-group>
                      </b-col
                      >
                      <b-col md="6">
                        <b-form-group label="Fax Number">
                          <b-form-input
                              v-model="dataregister.fax_number"
                              @keypress="isNumber($event)"
                              maxlength="9"
                          />
                        </b-form-group>
                      </b-col>
                      <b-col md="6">
                        <b-form-group label="Website">
                          <validation-provider
                              #default="{ errors }"
                              name="website"
                              rules=""
                          >
                            <b-form-input
                                v-model="dataregister.website"
                                :state="website === false ? false : null"
                                maxlength="30"
                            />
                           
                            <small class="text-danger" v-if="errors[0]">Website incorrect</small>
                          </validation-provider>
                        </b-form-group>
                      </b-col>
                    </b-row>

                    <b-row>
                      <b-col cols="12" class="mb-2">
                        <h5 class="mb-0">Login Information</h5>
                        <small class="text-muted" style="color: #000000d6 !important"
                        >Enter Your Login Information.</small
                        >
                      </b-col>
                      

                      <b-col md="6">
                        <b-form-group label="Company Email">
                          <validation-provider
                              #default="{ errors }"
                              name="email"
                              rules="required|email"
                          >
                            <b-form-input
                                v-model="dataregister.email"
                                type="email"
                                :state="errors.length > 0 ? false:null"
                                maxlength="30"
                            />
                            <small class="text-danger" v-if="errors[0]">This field is required</small>
                          </validation-provider>
                        </b-form-group>
                      </b-col>
                      <b-col md="6">
                        <b-form-group label="Password">
                          <validation-provider
                              #default="{ errors }"
                              name="password"
                              rules="required"
                          >
                            <b-form-input
                                v-model="dataregister.password"
                                type="password"
                                :state="errors.length > 0 ? false:null"
                                maxlength="30"
                            />
                            <small class="text-danger" v-if="errors[0]">This field is required</small>
                          </validation-provider>
                        </b-form-group>
                      </b-col>
                      
                    </b-row>

                     <b-row>
                      <b-col cols="12" class="mb-2">
                        <h5 class="mb-0">Additional Contact</h5>
                        <small class="text-muted" style="color: #000000d6 !important"
                        >Enter Your additional contact.</small
                        >
                      </b-col>
                      <b-col md="6">
                        <b-form-group
                            label="Additional Contact Name"
                        >
                          <b-form-input
                              v-model="dataregister.additional_contact_name"
                              maxlength="30"
                              @keypress="isText"
                          />
                        </b-form-group>
                      </b-col>
                      <b-col md="6">
                        <b-form-group
                            label="Additional Contact Number"
                        >
                          <b-form-input
                              v-model="dataregister.additional_contact_number"
                              @keypress="isNumber($event)"
                              maxlength="10"
                          />
                        </b-form-group>
                      </b-col>
                      <b-col md="6">
                        <b-form-group
                            label="Additional Contact Email"
                        >

                          <b-form-input
                              v-model="dataregister.additional_contact_email"
                              maxlength="30"
                          />

                        </b-form-group>
                      </b-col>
                      <b-col md="6">
                        <b-form-group
                            label="Title"
                        >
                          <b-form-input

                              v-model="dataregister.additional_contact_title"
                              maxlength="30"
                              @keypress="isText"
                          />
                        </b-form-group>
                      </b-col>

                      <b-col md="6">
                        <b-form-group
                            label="Notes"
                        >
                          <b-form-input

                              v-model="dataregister.notes"
                              maxlength="30"
                              @keypress="isText"
                          />
                        </b-form-group>
                      </b-col>
                    </b-row>
                  </validation-observer>
                </tab-content>

                <!-- address -->
                <!-- <tab-content title="Address" :before-change="validationFormInfoaddress">
                  <validation-observer
                      ref="infoRulesAddress"
                      tag="form"
                  >
                    <b-row>
                      <b-col cols="12" class="mb-2">
                        <h5 class="mb-0">Additional Contact</h5>
                        <small class="text-muted" style="color: #000000d6 !important"
                        >Enter Your additional contact.</small
                        >
                      </b-col>
                      <b-col md="6">
                        <b-form-group
                            label="Additional Contact Name"
                        >
                          <b-form-input
                              v-model="dataregister.additional_contact_name"
                              maxlength="30"
                              @keypress="isText"
                          />
                        </b-form-group>
                      </b-col>
                      <b-col md="6">
                        <b-form-group
                            label="Additional Contact Number"
                        >
                          <b-form-input
                              v-model="dataregister.additional_contact_number"
                              @keypress="isNumber($event)"
                              maxlength="10"
                          />
                        </b-form-group>
                      </b-col>
                      <b-col md="6">
                        <b-form-group
                            label="Additional Contact Email"
                        >

                          <b-form-input
                              v-model="dataregister.additional_contact_email"
                              maxlength="30"
                          />

                        </b-form-group>
                      </b-col>
                      <b-col md="6">
                        <b-form-group
                            label="Title"
                        >
                          <b-form-input

                              v-model="dataregister.additional_contact_title"
                              maxlength="30"
                              @keypress="isText"
                          />
                        </b-form-group>
                      </b-col>

                      <b-col md="6">
                        <b-form-group
                            label="Notes"
                        >
                          <b-form-input

                              v-model="dataregister.notes"
                              maxlength="30"
                              @keypress="isText"
                          />
                        </b-form-group>
                      </b-col>
                    </b-row>
                  </validation-observer>
                </tab-content> -->

                <!-- social link -->
                <tab-content title="Payment methods"
                             :before-change="validationFormCreditCard"
                >
                  <validation-observer
                      ref="infoRulesCreditCard"
                      tag="form"
                  >
                    <b-row>
                        <b-col md="6">
                        <b-form-group
                            label="Payment Type"
                        >
                            <b-form-select
                                v-model="dataregister.payment_type"
                                :options="option"
                                label="title"
                                placeholder="Please select"
                                
                            >
                            <option value="" >Select Option</option>
                            </b-form-select>
                        </b-form-group>
                    </b-col>
                    </b-row>
                    
                    <b-row v-if='dataregister.payment_type =="cc" '>
                      <b-col cols="12" class="mb-2">
                        <h5 class="mb-0">Credit card</h5>
                        <small class="text-muted" style="color: #000000d6 !important">Enter your credit card
                          information</small>
                      </b-col>
                      <b-col md="6">
                        <b-form-group label="Name on Credit Card">
                          <b-form-input
                              v-model="dataregister.name_on_cc"
                              maxlength="30"
                              @keypress="isText"
                          />
                        </b-form-group>
                      </b-col>
                      <b-col md="6">
                        <b-form-group
                            label="Card Number"
                        >

                          <b-form-input
                              v-model="dataregister.cc_number"
                              @keypress="isNumber($event)"
                              :maxlength="maxlenInput"

                              ref="cardExpInput"

                          />
                          <!--                          <div v-if="cardErrors.cc_number" class="error">-->
                          <!--                            <small style="color: red">{{ cardErrors.cc_number }}</small>-->
                          <!--                          </div>-->
                        </b-form-group>
                      </b-col>
                      <b-col md="6">
                        <b-form-group
                            label="Type of Credit Card"
                        >

                          <b-form-input
                              v-model="type_of_cc"
                              disabled
                          />
                          <!--                          <div v-if="cardErrors.cc_number" class="error">-->
                          <!--                            <small style="color: red">{{ cardErrors.cc_number }}</small>-->
                          <!--                          </div>-->
                        </b-form-group>
                      </b-col>
                      <b-col md="6">
                        <b-form-group
                            label="Expiration date"
                        >
                          <b-form-input
                              v-model="expiration_date"
                              @keypress="isNumber($event)"
                              maxlength="10"
                              v-cardformat:formatCardExpiry
                              ref="cardExpInput"
                              id="card-exp"
                              :data-error="(cardErrors.expiration_date)?true:false"
                              :class="Object.keys(this.cardErrors).length === 0 ? '' : 'error-color' "
                          >
                          </b-form-input>
                          <div v-if="cardErrors.expiration_date" class="error">
                            <small style="color: red">{{ cardErrors.expiration_date }}</small>
                          </div>

                        </b-form-group>
                      </b-col>
                      <b-col md="6">
                        <b-form-group
                            label="CVV"
                        >

                          <b-form-input
                              v-model="dataregister.code_of_cc"
                              @keypress="isNumber($event)"
                              maxlength="4"
                              v-cardformat:formatCardCVC
                              ref="cardCvcInput"
                          />
                        </b-form-group>
                      </b-col>
                    </b-row>

                    <b-row v-if='dataregister.payment_type =="il" '>
                      <b-col md="6">
                        <b-form-group label="Invoice Later Notes">
                          <b-form-input
                              v-model="dataregister.invoice_later"
                          />
                        </b-form-group>
                      </b-col>
                     
                    </b-row>
                  </validation-observer>
                </tab-content>
                
                <!-- document -->
                <tab-content title="Document"
                             
                > 
                    <b-row class="ml-5">
                         <b-col cols="12" class="mb-2">
                        <h5 class="mb-0">Document</h5>
                        <small class="text-muted" style="color: #000000d6 !important">
                          Upload Document.
                        </small>
                      </b-col>
                       
                        <b-col cols="12" md="6" lg="3" class="container-docs">
                        <label for="imageContract"
                            >Contract<span class="text-danger">*</span></label
                        ><br />
                        <input
                            id="imageContract"
                            type="file"
                            @change="handleimageContract()"
                            ref="imageContract"
                            multiple
                        />
                        </b-col>
                       
                    </b-row>
                 
               </tab-content>

              </form-wizard>
            </div>
          </template>
        </b-col>

     
    </b-row>

  </div>
</template>

<script>
/* eslint-disable global-require */
import { FormWizard, TabContent } from "vue-form-wizard";
import ToastificationContent from "@core/components/toastification/ToastificationContent.vue";
import "vue-form-wizard/dist/vue-form-wizard.min.css";
import { ValidationProvider, ValidationObserver } from "vee-validate";
import VuexyLogo from "@core/layouts/components/Logo.vue";
import axios from "axios";
import Ripple from "vue-ripple-directive";
import * as Card from "card";
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
  BCardTitle,
  BCardText,
  BFormSelect,
  BFormDatepicker
} from "bootstrap-vue";
import { required, email } from "@validations";
import { togglePasswordVisibility } from "@core/mixins/ui/forms";
import store from "@/store/index";
import useJwt from "@/auth/jwt/useJwt";
import vSelect from "vue-select";
import { getMessageError } from '@core/utils/utils'

export default {
  components: {
    VuexyLogo,
    BRow,
    BImg,
    BCol,
    BLink,
    BButton,
    BForm,
    BCardText,
    BCardTitle,
    BFormCheckbox,
    BFormGroup,
    BFormInput,
    BInputGroup,
    BInputGroupAppend,
    BFormSelect,
    BFormDatepicker,
    // validations
    ValidationProvider,
    ValidationObserver,
    FormWizard,
    TabContent,
    ToastificationContent,
    vSelect
  },
  directives: {
    Ripple
  },
  mixins: [togglePasswordVisibility],
  data() {
    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    // 15th two months prior
    const minDate = new Date(today);
    minDate.setMonth(minDate.getMonth() - 2);
    minDate.setDate(15);
    // 15th in two months
    const maxDate = new Date(today);
    maxDate.setMonth(maxDate.getMonth() + 2);
    maxDate.setDate(15);
    return {
      formData : new FormData(),
      min: minDate,
      max: maxDate,
      dataregister: {
        company_legal_name: "",
        dba: "",
        tin: "",
        office_location_address: "",
        billing_address: "",
        telephone_number: "",
        fax_number: "",
        email: "",
        website: "",
        contact_name: "",
        contact_number: "",
        additional_contact_name: "",
        additional_contact_number: "",
        additional_contact_email: "",
        additional_contact_title: "",
        notes: "",
        payment_type: "",
        invoice_later: "",
        name_on_cc: "",
        cc_number: "",

        code_of_cc: "",
        exp_month: "",
        exp_year: "",
        imageContract: "",
        password:""
      },
      expiration_date: "",
      type_of_cc: "",

      resultweb: "",
      contenpunto: "",
      credito: "",
      enviados: [],
      errorstwo: [],
      errorsbilling: [],
      classError: "",
      classErrorBilling: "",
      status: "",
      username: "",
      userEmail: "",
      password: "",
      maxlenInput: "",
      sideImg: require("@/assets/images/pages/register-v2.svg"),
      // validation
      required,
      email,
      cardErrors: {},
      option: [
        {
          text: "Credit Card",
          value: "cc"
        },
        {
          text: "Invoice Later",
          value: "il"
        }
      ]
    };
  },
  computed: {
    passwordToggleIcon() {
      return this.passwordFieldType === "password" ? "EyeIcon" : "EyeOffIcon";
    },
    imgUrl() {
      if (store.state.appConfig.layout.skin === "dark") {
        // eslint-disable-next-line vue/no-side-effects-in-computed-properties
        this.sideImg = require("@/assets/images/pages/register-v2-dark.svg");
        return this.sideImg;
      }
      return this.sideImg;
    },
    website() {
      if (this.dataregister.website !== "") {
        this.resultweb = this.dataregister.website.split(".").pop();
        if (this.resultweb === "") {
          return false;
        } else if (this.resultweb !== "" && this.contenpunto === -1) {
          return false;
        } else {
          return null;
        }
      }
    }
  },
  watch: {
    "dataregister.website"() {
      this.contenpunto = this.dataregister.website.indexOf(".");
      if (this.contenpunto !== -1) {
        return null;
      } else {
        return false;
      }
    },
    "dataregister.cc_number"() {
      let regexMaster = new RegExp(
        /^5[1-5][0-9]{14}$|^2(?:2(?:2[1-9]|[3-9][0-9])|[3-6][0-9][0-9]|7(?:[01][0-9]|20))[0-9]{12}$/
      );
      let regexAmerican = new RegExp(/^3[47][0-9]{13}$/);
      let regexVisa = new RegExp(/^4[0-9]{12}(?:[0-9]{3})?$/);
      let regexDiscover = new RegExp(
        /^65[4-9][0-9]{13}|64[4-9][0-9]{13}|6011[0-9]{12}|(622(?:12[6-9]|1[3-9][0-9]|[2-8][0-9][0-9]|9[01][0-9]|92[0-5])[0-9]{10})$/
      );
      let regexMaestro = new RegExp(
        /^(5018|5081|5044|5020|5038|603845|6304|6759|676[1-3]|6799|6220|504834|504817|504645)[0-9]{8,15}$/
      );
      let regexJCB = new RegExp(/^(?:2131|1800|35[0-9]{3})[0-9]{11}$/);
      let regexDiner = new RegExp(/^3(?:0[0-5]|[68][0-9])[0-9]{11}$/);

      if (this.dataregister.cc_number.match(regexMaster)) {
        this.type_of_cc = "Master card";
        this.maxlenInput = 16;
      } else if (this.dataregister.cc_number.match(regexAmerican)) {
        this.type_of_cc = "American express";
        this.maxlenInput = 15;
      } else if (this.dataregister.cc_number.match(regexVisa)) {
        this.type_of_cc = "Visa";
        this.maxlenInput = 16;
      } else if (this.dataregister.cc_number.match(regexDiscover)) {
        this.type_of_cc = "Discover";
        this.maxlenInput = 20;
      } else if (this.dataregister.cc_number.match(regexMaestro)) {
        this.type_of_cc = "Maestro credit card";
        this.maxlenInput = 19;
      } else if (this.dataregister.cc_number.match(regexJCB)) {
        this.type_of_cc = "JCB";
        this.maxlenInput = 19;
      } else if (this.dataregister.cc_number.match(regexDiner)) {
        this.type_of_cc = "Diner´s club";
        this.maxlenInput = 19;
      } else {
        return false;
      }
    },
    expiration_date() {
      this.dataregister.exp_month = parseInt(
        this.expiration_date.substring(0, 3)
      );
      this.dataregister.exp_year = parseInt(
        this.expiration_date.substring(5, 9)
      );
      console.log(this.dataregister.exp_month)
      console.log(this.dataregister.exp_year)
    },
    "dataregister.office_location_address"() {
      if (this.dataregister.office_location_address !== "") {
        this.errorstwo = false;
        this.classError = "border: 1px solid black !important";
      }
    },
    "dataregister.billing_address"() {
      if (this.dataregister.billing_address !== "") {
        this.errorsbilling = false;
        this.classErrorBilling = "border: 1px solid #d8d6de";
      }
    },
    errorstwo() {
      if (
        this.errorstwo === true &&
        this.dataregister.office_location_address === ""
      ) {
        this.errorstwo = true;
        this.classError = "border: 1px solid red";
      } else if (this.dataregister.office_location_address !== "") {
        this.errorstwo = false;
        this.classError = "border: 1px solid #d8d6de";
      }
    },
    errorsbilling() {
      if (
        this.errorsbilling === true &&
        this.dataregister.billing_address === ""
      ) {
        this.errorsbilling = true;
        this.classErrorBilling = "border: 1px solid red";
      } else if (this.dataregister.billing_address !== "") {
        this.errorsbilling = false;
        this.classErrorBilling = "border: 1px solid #d8d6de";
      }
    }
  },
  methods: {
    handleimageContract() {

      if(!(this.$refs.imageContract.files[0].type.includes("image") || this.$refs.imageContract.files[0].type.includes("pdf")))
      {
        this.$swal({
            title: "Only images or pdf files is allowed",
            icon: "error",
            customClass: {
              confirmButton: "btn btn-primary",
            },
            buttonsStyling: false,
          });
        return false
      }

      this.imageCompressing = true;
      this.dataregister.imageContract = this.$refs.imageContract.files;
      this.formData.append("imageContract0",this.$refs.imageContract.files[0]);
      for(var $i=0;$i<this.$refs.imageContract.files.length;$i++){
        if (this.$refs.imageContract.files[0].type.includes("image")) {
          this.compressImage(this.$refs.imageContract.files[$i], $i);
        }
        }
        this.imageCompressing = false;
    },

    compressImage(url,index) {
      
      const WIDTH = 800;
      let image_file = url;

      let reader = new FileReader();

      reader.readAsDataURL(image_file);

      reader.onload = (event) => {
        let image_url = event.target.result;
        let image = document.createElement("img");
        image.src = image_url;
        image.onload = (e) => {
          let canvas = document.createElement("canvas");
          let ratio = WIDTH / image.width;
          canvas.width = WIDTH;
          canvas.height = image.height * ratio;

          let context = canvas.getContext("2d");
          context.drawImage(image, 0, 0, canvas.width, canvas.height);

          let new_image_url = canvas.toDataURL("image/jpeg", 10);

          let image_file = this.urlToFile(new_image_url);
         
          this.formData.append("imageContract"+index, image_file);
         
        };
        
      };
    },
    urlToFile(url) {
      let arr = url.split(",");
      // console.log(arr)
      let mime = arr[0].match(/:(.*?);/)[1];
      let data = arr[1];

      let dataStr = atob(data);
      let n = dataStr.length;
      let dataArr = new Uint8Array(n);

      while (n--) {
        dataArr[n] = dataStr.charCodeAt(n);
      }

      let file = new File([dataArr], "File.jpg", { type: mime });

      return file;
    },
    isNumber: function(evt) {
      evt = evt ? evt : window.event;
      let charCode = evt.which ? evt.which : evt.keyCode;
      if (
        charCode > 31 &&
        (charCode < 48 || charCode > 57) &&
        charCode !== 46
      ) {
        evt.preventDefault();
      } else {
        return true;
      }
    },
    isText: function(event) {
      let regex = new RegExp("^[a-zA-Z ]+$");
      let key = String.fromCharCode(
        !event.charCode ? event.which : event.charCode
      );
      if (!regex.test(key)) {
        event.preventDefault();
        return false;
      }
    },
    isDirection: function(event) {
      let regex = new RegExp("^[a-zA-Z0-9 ]+$");
      let key = String.fromCharCode(
        !event.charCode ? event.which : event.charCode
      );
      if (!regex.test(key)) {
        event.preventDefault();
        return false;
      }
    },
    isNumberVar: function(event) {
      let regex = new RegExp("^[-Z0-9 ]+$");
      let key = String.fromCharCode(
        !event.charCode ? event.which : event.charCode
      );
      if (!regex.test(key)) {
        event.preventDefault();
        return false;
      }
    },
    initMarkerTo(loc) {
      this.existingPlace = loc;
      this.dataregister.office_location_address = this.existingPlace.formatted_address;
    },

    initMarker(loc) {
      this.existingPlace = loc;
      this.dataregister.billing_address = this.existingPlace.formatted_address;
    },
    validationForm() {
      return new Promise((resolve, reject) => {
        if (
          this.dataregister.billing_address === "" ||
          this.dataregister.office_location_address === ""
        ) {
          if (
            this.dataregister.billing_address === "" &&
            this.dataregister.office_location_address === ""
          ) {
            this.errorstwo = true;
            this.errorsbilling = true;
            reject();
          } else if (this.dataregister.billing_address === "") {
            this.errorsbilling = true;
            reject();
          } else if (this.dataregister.office_location_address === "") {
            this.errorstwo = true;
            reject();
          }
        } else if (
          this.dataregister.billing_address !== "" ||
          this.dataregister.office_location_address !== ""
        ) {
          this.$refs.accountRules.validate().then(success => {
            if (success) {
              resolve(true);
            }
          });
        }
        this.$refs.accountRules.validate();
      });
    },
    validationFormInfo() {
      return new Promise((resolve, reject) => {
        this.$refs.infoRules.validate().then(success => {
          if (success) {
            resolve(true);
          } else {
            reject();
          }
        });
      });
    },
    validationFormInfoaddress() {
      return new Promise((resolve, reject) => {
        this.$refs.infoRulesAddress.validate().then(success => {
          if (success) {
            resolve(true);
          } else {
            reject();
          }
        });
      });
    },
    validationFormCreditCard() {
      return new Promise((resolve, reject) => {
        if (
          this.dataregister.code_of_cc !== "" ||
          this.dataregister.cc_number !== "" ||
          this.dataregister.name_on_cc !== ""
        ) {
          if (this.dataregister.cc_number) {
            let regexMaster = new RegExp(
              /^5[1-5][0-9]{14}$|^2(?:2(?:2[1-9]|[3-9][0-9])|[3-6][0-9][0-9]|7(?:[01][0-9]|20))[0-9]{12}$/
            );
            let regexAmerican = new RegExp(/^3[47][0-9]{13}$/);
            let regexVisa = new RegExp(/^4[0-9]{12}(?:[0-9]{3})?$/);
            let regexDiscover = new RegExp(
              /^65[4-9][0-9]{13}|64[4-9][0-9]{13}|6011[0-9]{12}|(622(?:12[6-9]|1[3-9][0-9]|[2-8][0-9][0-9]|9[01][0-9]|92[0-5])[0-9]{10})$/
            );
            let regexMaestro = new RegExp(
              /^(5018|5081|5044|5020|5038|603845|6304|6759|676[1-3]|6799|6220|504834|504817|504645)[0-9]{8,15}$/
            );
            let regexJCB = new RegExp(/^(?:2131|1800|35[0-9]{3})[0-9]{11}$/);
            let regexDiner = new RegExp(/^3(?:0[0-5]|[68][0-9])[0-9]{11}$/);
            if (this.dataregister.cc_number.match(regexMaster)) {
              this.$refs.infoRulesCreditCard.validate().then(success => {
                if (success) {
                  resolve(true);
                } else {
                  reject();
                }
              });
            } else if (this.dataregister.cc_number.match(regexAmerican)) {
              this.$refs.infoRulesCreditCard.validate().then(success => {
                if (success) {
                  resolve(true);
                } else {
                  reject();
                }
              });
            } else if (this.dataregister.cc_number.match(regexVisa)) {
              this.$refs.infoRulesCreditCard.validate().then(success => {
                if (success) {
                  resolve(true);
                } else {
                  reject();
                }
              });
            } else if (this.dataregister.cc_number.match(regexDiscover)) {
              this.$refs.infoRulesCreditCard.validate().then(success => {
                if (success) {
                  resolve(true);
                } else {
                  reject();
                }
              });
            } else if (this.dataregister.cc_number.match(regexMaestro)) {
              this.$refs.infoRulesCreditCard.validate().then(success => {
                if (success) {
                  resolve(true);
                } else {
                  reject();
                }
              });
            } else if (this.dataregister.cc_number.match(regexJCB)) {
              this.$refs.infoRulesCreditCard.validate().then(success => {
                if (success) {
                  resolve(true);
                } else {
                  reject();
                }
              });
            } else if (this.dataregister.cc_number.match(regexDiner)) {
              this.$refs.infoRulesCreditCard.validate().then(success => {
                if (success) {
                  resolve(true);
                } else {
                  reject();
                }
              });
            } else {
              console.log("ok");
            }
          }
        } else {
          this.$refs.infoRulesCreditCard.validate().then(success => {
            if (success) {
              resolve(true);
            }
          });
        }
      });
    },
    formSubmitted() {
      console.log("formSubmitted");
      this.$swal({
        title: "Please, wait...",
        didOpen: () => {
          this.$swal.showLoading();
        }
      });
      
      this.formData.append("length", this.$refs.imageContract.files.length);
      this.formData.append("dataregister", JSON.stringify(this.dataregister));
      this.formData.append("web", "yes");

      const config = {
        headers: {
          "content-type": "multipart/form-data"
        }
      };
      this.$http
        .post("auth/ca/registerbyadmin", this.formData, config)
        .then(res => {
          if (res.data.status === 200) {
            this.$swal({
              title: "Corporate account created",
              icon: "success",
              customClass: {
                confirmButton: "btn btn-primary"
              },
              buttonsStyling: false
            }).then(result => {
              if (result.isConfirmed) {
                this.$router.push({ name: "clients" });
              }
            });

            //clear form
            this.dataregister.company_legal_name = "";
            this.dataregister.dba = "";
            this.dataregister.tin = "";
            this.dataregister.office_location_address = "";
            this.dataregister.billing_address = "";
            this.dataregister.telephone_number = "";
            this.dataregister.fax_number = "";
            this.dataregister.email = "";
            this.dataregister.website = "";
            this.dataregister.contact_name = "";
            this.dataregister.contact_number = "";
            this.dataregister.additional_contact_name = "";
            this.dataregister.additional_contact_number = "";
            this.dataregister.additional_contact_email = "";
            this.dataregister.name_on_cc = "";
            this.dataregister.cc_number = "";
            this.dataregister.exp_month = "";
            this.dataregister.exp_year = "";
            this.dataregister.code_of_cc = "";
          } else {
            this.$swal({
              title: res.data.message,
              icon: "error",
              customClass: {
                confirmButton: "btn btn-primary"
              },
              buttonsStyling: false
            });
          }
        })
        .catch(error => {
          console.log(error.response.data.data);
          this.$swal({
            title:getMessageError(error),
            icon: "error",
            customClass: {
              confirmButton: "btn btn-primary"
            },
            buttonsStyling: false
          });
        });
    }
  }

  // mounted() {
  //   this.$refs.cardNumInput.focus();
  // }
};
/* eslint-disable global-require */
</script>

<style lang="scss">
@import "@core/scss/vue/pages/page-auth.scss";
@import "@core/scss/vue/libs/vue-select.scss";
@import "src/assets/scss/variables/variables-components.scss";

.error-color {
  border: 1px solid #fe0404 !important;
}
</style>
