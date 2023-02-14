<template>
    <div class="cols-12 col-xl-12 " style="margin: 0 auto">
        <validation-observer ref="formRules">
            <form-wizard color="#7367F0" :title="null" :subtitle="null" finish-button-text="Submit"
                back-button-text="Previous" ref="registerClient"
                class="steps-transparent mb-3 d-lg-flex d-xl-flex d-md-flex justify-content-center flex-xl-column formcreatepatient"
                @on-complete="formSubmitted" style="background-color: #fff">
                <!-- account detail tab -->
                <tab-content title="Account Details" :before-change="validationForm">
                    <validation-observer ref="accountRules" tag="form">
                        <b-row>
                            <b-col cols="12" class="mb-2">
                                <h5 class="mb-0">
                                    Account Details
                                </h5>
                                <small class="text-muted" style="color: #000000d6 !important">
                                    Enter Your Account Details.
                                </small>
                            </b-col>
                            <b-col md="4">
                                <b-form-group label="Name">
                                    <validation-provider #default="{ errors }" rules="required">
                                        <b-form-input v-model="createdPatient.name"
                                            :state="errors.length > 0 ? false : null" @keypress="isText"
                                            maxlength="40" />
                                        <small class="text-danger" v-if="errors[0]">This field is required</small>
                                    </validation-provider>
                                </b-form-group>
                            </b-col>
                            <b-col md="4">
                                <b-form-group label="Last name">
                                    <validation-provider #default="{ errors }" rules="required">
                                        <b-form-input v-model="createdPatient.lastname"
                                            :state="errors.length > 0 ? false : null" @keypress="isText"
                                            maxlength="40" />
                                        <small class="text-danger" v-if="errors[0]">This field is required</small>
                                    </validation-provider>
                                </b-form-group>
                            </b-col>
                            <b-col md="4">
                                <b-form-group label="Email">
                                    <validation-provider #default="{ errors }" rules="email">
                                        <b-form-input v-model="createdPatient.email" type="email" @mouseover="changeColor()"  v-bind:class="{ 'border border-danger' : isEmail == false}"
                                            :state="errors.length > 0 ? false : null" maxlength="50" />
                                            <p class="text-right"><small><a @click="submitCode(createdPatient.email)" class="bg-primary text-light rounded" style="padding: 2px;">Verify Email</a></small></p>
                                        <small class="text-danger" v-if="errors[0]">This field is required</small>
                                    </validation-provider>
                                </b-form-group>
                            </b-col>
                            <b-col md="4">
                                <b-form-group label="Telephone number">
                                    <validation-provider #default="{ errors }" rules="required">
                                        <b-form-input v-model="createdPatient.phone_number"
                                            :state="errors.length > 0 ? false : null" @keypress="isNumber($event)"
                                            maxlength="11" />
                                        <small class="text-danger" v-if="errors[0]">This field is required</small>
                                    </validation-provider>
                                </b-form-group>
                            </b-col>
                            <b-col md="4">
                                <b-form-group label="Notes">
                                    <b-form-textarea v-model="createdPatient.note" placeholder="Write here the notes"
                                        rows="3" />
                                </b-form-group>
                            </b-col>
                        </b-row>
                    </validation-observer>
                </tab-content>

                <!-- personal details -->
                <tab-content title="Personal Info" :before-change="validationFormInfo">
                    <validation-observer ref="infoRules" tag="form">
                        <b-row>
                            <b-col cols="12" class="mb-2">
                                <h5 class="mb-0">
                                    Personal Info
                                </h5>
                                <small class="text-muted" style="color: #000000d6 !important">Enter Your Personal
                                    Info.</small>
                            </b-col>
                            <b-col md="4">
                                <b-form-group label="Home Address">
                                    <gmap-autocomplete class="form-control" placeholder="Home Address"
                                        @place_changed="initMarker">
                                    </gmap-autocomplete>
                                </b-form-group>
                            </b-col>
                            <b-col md="4">
                                <b-form-group label="Home Telephone Number">
                                    
                                        <b-form-input v-model="createdPatient.home_telephone_number"
                                             @keypress="isNumber($event)"
                                            maxlength="10" />
                                        
                                   
                                </b-form-group>
                            </b-col>
                            <b-col md="4">
                                <b-form-group label="Zip code">
                                    <validation-provider #default="{ errors }" rules="required">
                                        <b-form-input id="autocomplete" v-model="createdPatient.city"
                                            :state="errors.length > 0 ? false : null" maxlength="40"
                                            @keypress="isDirection" />
                                        <small class="text-danger" v-if="errors[0]">This field is required</small>
                                    </validation-provider>
                                </b-form-group>
                            </b-col>
                            <b-col md="4">
                                <b-form-group label="Date of birth">
                                   
                                        <cleave id="date" v-model="createdPatient.birthday" class="form-control"
                                            :raw="false" :options="options.date" placeholder="MM-DD-YYYY"
                                             />
                                       
                                   
                                </b-form-group>
                            </b-col>
                            <b-col md="4">
                                <b-form-group label="Gender" class="mb-0">
                                    <validation-provider #default="{ errors }" rules="required">
                                        <div style="display: flex; gap: 10px">
                                            <b-form-radio v-model="createdPatient.gender" name="Female" value="Female"
                                                class="custom-control-secondary"
                                                :state="errors.length > 0 ? false : null">
                                                Female
                                            </b-form-radio>

                                            <!-- secondary -->
                                            <b-form-radio v-model="createdPatient.gender" name="Male" value="Male"
                                                class="custom-control-secondary"
                                                :state="errors.length > 0 ? false : null">
                                                Male
                                            </b-form-radio>

                                            <!-- success -->
                                            <b-form-radio v-model="createdPatient.gender" name="Other" value="Other"
                                                class="custom-control-secondary"
                                                :state="errors.length > 0 ? false : null">
                                                Other
                                            </b-form-radio>
                                        </div>
                                        <small class="text-danger" v-if="errors[0]">This field is required</small>
                                    </validation-provider>
                                </b-form-group>
                            </b-col>
                        </b-row>
                    </validation-observer>
                </tab-content>
            </form-wizard>
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
import { FormWizard, TabContent } from 'vue-form-wizard'
import { ValidationProvider, ValidationObserver } from 'vee-validate'
import ToastificationContent from '@core/components/toastification/ToastificationContent.vue'
import 'vue-form-wizard/dist/vue-form-wizard.min.css'
import {
    BRow,
    BCol,
    BFormGroup,
    BFormInput,
    BFormRadio,
    BFormDatepicker,
    BFormTextarea,
    BButton,
} from 'bootstrap-vue'
import Cleave from 'vue-cleave-component'

export default {
    components: {
        BButton,
        FormWizard,
        TabContent,
        BRow,
        BCol,
        BFormGroup,
        BFormInput,
        BFormRadio,
        BFormDatepicker,
        BFormTextarea,
        ToastificationContent,
        ValidationProvider,
        ValidationObserver,
        Cleave,
    },
    data() {
        const now = new Date()
        const today = new Date(now.getFullYear(), now.getMonth(), now.getDate())
        // 15th two months prior
        const minDate = new Date(today)
        minDate.setMonth(minDate.getMonth() - 2)
        minDate.setDate(15)
        // 15th in two months
        const maxDate = new Date(today)
        maxDate.setMonth(maxDate.getMonth() + 2)
        maxDate.setDate(15)

        return {
            isEmail:true,
            isCode:true,
            code:'',
            min: minDate,
            max: maxDate,
            center: {
                lat: 39.7837304,
                lng: -100.4458825
            },
            locationMarkers: [],
            locPlaces: [],
            existingPlace: {},
            createdPatient: {
                name: '',
                lastname: '',
                email: '',
                phone_number: '',
                note: '',
                gender: '',
                birthday: '',
                city: '',
                address: '',
                gps_address:'',
                ca_id: '',
            },
            validFecha: false,
            options: {
                date: {
                    date: true,
                    delimiter: '-',
                    datePattern: ['m', 'd', 'Y'],
                },
            },
            redirecback:false
        }
    },
    methods: {
        submitCode(email){
            if(email == ''){
                this.isEmail = false
            }else{
                this.$bvModal.show('modal-center')
                let formData = new FormData();
                formData.append("email", email);
                this.$http.post('ca/panel/client/saveEmailCode', formData)
                    .then((res) => {
                        if (res.data.status === 200) {
                           
                        } 
                    })
                    .catch((res) => {
                        
                    })

            }
        },
        changeColor(){
            this.isEmail = true
        },
        changeColorCode(){
            this.isCode = true
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
        isNumber: function (evt) {
            evt = evt ? evt : window.event
            var charCode = evt.which ? evt.which : evt.keyCode
            if (
                charCode > 31 &&
                (charCode < 48 || charCode > 57) &&
                charCode !== 46
            ) {
                evt.preventDefault()
            } else {
                return true
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
        isDirection: function (event) {
            let regex = new RegExp('^[a-zA-Z0-9 ]+$')
            let key = String.fromCharCode(!event.charCode ? event.which : event.charCode)
            if (!regex.test(key)) {
                event.preventDefault()
                return false
            }
        },
        initMarker(loc) {
            this.existingPlace = loc
            this.createdPatient.address = this.existingPlace.formatted_address
            this.createdPatient.gps_address = this.existingPlace.geometry.location.lat() + ',' + this.existingPlace.geometry.location.lng()
        },
        addLocationMarker() {
            if (this.existingPlace) {
                const marker = {
                    lat: this.existingPlace.geometry.location.lat(),
                    lng: this.existingPlace.geometry.location.lng()
                }
                this.locationMarkers.push({ position: marker })
                this.locPlaces.push(this.existingPlace)
                this.center = marker
                this.existingPlace = null

            }
        },
        locateGeoLocation: function () {
            navigator.geolocation.getCurrentPosition(res => {
                this.center = {
                    lat: res.coords.latitude,
                    lng: res.coords.longitude
                }
            })
        },
       
        formSubmitted() {

            let mes = this.createdPatient.birthday.slice(0, 2);
            let dia = this.createdPatient.birthday.slice(3, 5);
            let year = this.createdPatient.birthday.slice(6, 10);

            if ((year === '0000') || (mes > 12 || mes === '00') || (dia > 31 || dia === '00')) {
                this.$swal({
                    title: 'Error, invalid date',
                    icon: 'error',
                    customClass: {
                        confirmButton: 'btn btn-primary',
                    },
                    buttonsStyling: false,
                })
                this.validFecha = false;
            } else if (mes === parseInt('02') || mes === 2) {
                if (dia > 28) {
                    this.$swal({
                        title: 'Error, invalid date',
                        icon: 'error',
                        customClass: {
                            confirmButton: 'btn btn-primary',
                        },
                        buttonsStyling: false,
                    })
                }
                this.validFecha = false;
            } else {
                this.$swal({
                    title: 'Please, wait...',
                    didOpen: () => {
                        this.$swal.showLoading()
                    }
                })

                let data = { ...this.createdPatient };
                data.birthday = `${year}-${mes}-${dia}`

                this.$http.post('ca/panel/client/add', data)
                    .then((res) => {
                        if (res.data.status === 200) {
                            this.$swal({
                                title: res.data.message,
                                icon: 'success',
                                customClass: {
                                    confirmButton: 'btn btn-primary',
                                },
                                buttonsStyling: false,
                            })
                            // this.$refs.registerClient.reset()
                            this.$router.push({name:"all-selfpaids"});
                            //clear form register
                            this.createdPatient.name = '',
                                this.createdPatient.lastname = '',
                                this.createdPatient.email = '',
                                this.createdPatient.phone_number = '',
                                this.createdPatient.note = '',
                                this.createdPatient.gender = '',
                                this.createdPatient.birthday = '',
                                this.existingPlace.formatted_address = '',
                                this.createdPatient.home_telephone_number = '',
                                this.createdPatient.city = '',
                                this.createdPatient.address = ''
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
                        if(this.redirecback == true){
                            this.$router.push({name:'book-a-ride'});
                        }
                    })
                    .catch((res) => {
                        let message = res.response.data.data !== undefined ? res.response.data.data : res.response.data.message

                        this.$swal({
                            title: message,
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
        validationFormInfo() {
            return new Promise((resolve, reject) => {
                this.$refs.infoRules.validate()
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
        if(this.$route.query.plan){
            this.redirecback = true
        }
        else{
            this.redirecback = false
        }
        this.locateGeoLocation()
    },
}
</script>
