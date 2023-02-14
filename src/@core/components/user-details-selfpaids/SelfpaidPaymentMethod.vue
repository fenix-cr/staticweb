<template>
    <div>
        <!-- Show info payment -->
        <div v-if="showData === true && (this.paymentMethods.brand !== '' || cargando == true)">
            <div class="d-flex">
                <feather-icon icon="CreditCardIcon" size="19" />
                <h4 class="mb-0 ml-50" v-if="cargando === false">
                    {{ `Payment method - ${userData.name} ${userData.lastname}`.toUpperCase() }}
                </h4>
                <h4 class="mb-0 ml-50" v-if="cargando === true">
                    Retrieving Information. Please wait...
                </h4>
            </div>

            <div class="d-flex flex-wrap mt-2" v-if="cargando === false">
                <b-button :variant="inhabilitar === true ? 'primary' : 'outline-secondary'" @click="setEditInfo">
                    <span class="d-none d-sm-inline">Edit</span>
                    <feather-icon icon="EditIcon" class="d-inline d-sm-none" />
                </b-button>

                <b-button v-if="inhabilitar === false" :variant="inhabilitar === true ? 'primary' : 'primary'"
                    class="ml-1" @click="saveChanges">
                    <span class="d-none d-sm-inline">Save</span>
                    <feather-icon icon="TrashIcon" class="d-inline d-sm-none" />
                </b-button>
            </div>

            <b-form class="mt-1">
                <b-row>
                    <b-col cols="12" md="6" lg="4">
                        <b-form-group label="Name on Credit Card">
                            <b-form-input v-model="paymentMethods.name" disabled />
                        </b-form-group>
                    </b-col>
                    <b-col cols="12" md="6" lg="4">
                        <b-form-group label="Card Number">
                            <b-form-input v-model="'********' + paymentMethods.last4" disabled />
                        </b-form-group>
                    </b-col>
                    <b-col cols="12" md="6" lg="4">
                        <b-form-group label="Card Use">
                            <b-form-select id="Status" v-model="client.card_use" :options="card_use" disabled>
                                <option value="">Chose Option</option>
                            </b-form-select>
                        </b-form-group>
                    </b-col>

                    <b-col cols="12" md="6" lg="4">
                        <b-form-group label="Expiration date">
                            <b-form-input v-model="paymentMethods.exp_month + ' / ' + paymentMethods.exp_year"
                                disabled />
                        </b-form-group>
                    </b-col>


                </b-row>
            </b-form>
        </div>

        <!-- Add new payment -->
        <template v-if="newData === true && this.saveData == false && this.paymentMethods.brand === ''">
            <div style="display: grid; place-items: center">
                <h2 class="text-center font-large-1 text-danger">Payment method was not added</h2>
                <p>
                    Do you want to add a payment method?
                </p>
                <b-button variant="primary" class="ml-1" @click="setSaveInfo">
                    <span class="d-none d-sm-inline">Add payment method</span>
                    <feather-icon icon="EditIcon" class="d-inline d-sm-none" />
                </b-button>
            </div>
        </template>

        <!-- Edit payment -->
        <!-- <template v-if="aggPayment === true"> -->
        <template v-if="saveData === true">
            <h4 class="mb-0 ml-50" v-if="cargando === false">
                {{ `Edit Payment Method - ${userData.name} ${userData.lastname}`.toUpperCase() }}
            </h4>
            <b-form class="mt-1">
                <b-row>
                    <b-col cols="12" md="6" lg="4">
                        <b-form-group label="Name on Credit Card">
                            <b-form-input v-model="paymentMethods.name_on_cc" @keypress="isText" maxlength="30" />
                        </b-form-group>
                    </b-col>
                    <b-col cols="12" md="6" lg="4">
                        <b-form-group label="Card Number">
                            <b-form-input v-model="paymentMethods.cc_number" @keypress="isNumber($event)"
                                maxlength="16" />
                        </b-form-group>
                    </b-col>

                    <b-col cols="12" md="6" lg="4">
                        <b-form-group label="CVC">
                            <b-form-input v-model="paymentMethods.code_of_cc" @keypress="isNumber($event)" maxlength="3"
                                placeholder="***" />
                        </b-form-group>
                    </b-col>

                    <b-col cols="12" md="6" lg="4">
                        <b-form-group label="Card Use">
                            <b-form-select id="Status" v-model="client.card_use" :options="card_use"
                                @change="onChange($event)">
                                <option value="">Chose Option</option>
                            </b-form-select>
                        </b-form-group>
                    </b-col>

                    <b-col cols="12" md="6" lg="4">
                        <b-form-group label="Expiration">
                            <b-form-input v-model="paymentMethods.exp" v-mask="'##/####'" hint="MM/YYYY"
                                placeholder="MM/YYYY" />
                        </b-form-group>
                    </b-col>

                    <b-col class="mt-2">
                        <b-button variant="primary" class="mb-1 mb-sm-0 mr-0 mr-sm-1"
                            :block="$store.getters['app/currentBreakPoint'] === 'xs'" @click="SavePaymentMethod">
                            Save Changes
                        </b-button>
                        <b-button v-if="newData === false" variant="outline-secondary"
                            :block="$store.getters['app/currentBreakPoint'] === 'xs'" @click="setShowInfo">
                            Cancel
                        </b-button>
                    </b-col>
                </b-row>
            </b-form>
        </template>
    </div>
</template>

<script>
import {
    BRow, BCol, BForm, BFormGroup, BFormInput, BButton, BInputGroup, BInputGroupPrepend, BFormSelect
} from 'bootstrap-vue'
import Stripe from 'stripe'
import infocontact from '@/navigation/vertical/infocontact'

export default {
    components: {
        BRow,
        BCol,
        BForm,
        BFormGroup,
        BFormInput,
        BButton,
        BInputGroup,
        BInputGroupPrepend,
        BFormSelect
    },
    props: {
        userData: {},
    },
    data() {
        return {
            reset: false,
            paymentMethods:
            {
                name_on_cc: "",
                cc_number: "",
                brand: "",
                code_of_cc: "",
                exp: "",
                exp_month: "00",
                exp_year: "0000",
                last4: "",
                card_use: "",
            },
            cargando: true,
            inhabilitar: true,
            showData: true,
            saveData: false,
            newData: false,
            card_use: [
                {
                    text: "Business credit card",
                    value: "bc",
                },
                {
                    text: "Personal credit card",
                    value: "pc",
                },
            ],
            client: "",
        }
    },
    methods: {
        setShowInfo() {
            this.showData = true;
            this.saveData = false;
            this.newData = false;
        },
        setEditInfo() {
            this.showData = false;
            this.saveData = true;
            this.newData = false;
        },
        setSaveInfo() {
            this.showData = false;
            this.saveData = true;
            this.newData = true;
        },
        setNewInfo() {
            this.showData = false;
            this.saveData = false;
            this.newData = true;
        },
        saveChanges() {
            this.formSubmitted()
        },
        setVariables(data) {
            this.cargando = false
            if (data.brand !== '') {
                this.setShowInfo();
            } else {
                this.setNewInfo();
            }
        },
        SavePaymentMethod() {
            this.inhabilitar = true

            let url = `admin/panel/${this.userData.client_id}/selftpay/paymentmethod/add`

            //Get month and year expiration
            let expirationTimeData = this.paymentMethods.exp.split("/");
            this.paymentMethods.exp_month = expirationTimeData[0]
            this.paymentMethods.exp_year = expirationTimeData[1]

            this.$swal({
                title: 'Please, wait...',
                didOpen: () => {
                    this.$swal.showLoading()
                }
            })
            this.paymentMethods.card_use = this.client.card_use
            this.$http.post(url, this.paymentMethods)
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
                        this.getCard(this.userData.client_id)
                        this.setShowInfo()
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
                    let message = res.message
                    if (res.response.data) {
                        message = res.response.data.data
                    }
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
        isText: function (event) {
            let regex = new RegExp('^[a-zA-Z ]+$')
            let key = String.fromCharCode(!event.charCode ? event.which : event.charCode)
            if (!regex.test(key)) {
                event.preventDefault()
                return false
            }
        },
        isNumber: function (evt) {
            evt = evt ? evt : window.event
            let charCode = evt.which ? evt.which : evt.keyCode
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
        clearInputs() {
            this.paymentMethods.name_on_cc = ''
            this.paymentMethods.cc_number = ''
            this.paymentMethods.type_of_cc = ''
            this.paymentMethods.code_of_cc = ''
        },
        getCard(client_id) {
            this.$http.get(`admin/panel/selfpaid/${client_id}/paymentMethod`)
                .then((response) => {
                    if (response.data.data) {
                        this.paymentMethods = response.data.data.payment === undefined ? { brand: "" } : response.data.data.payment
                        this.client = response.data.data.client;
                    }
                    this.setVariables(this.paymentMethods)
                }).catch((error) => {
                    console.log(error)
                })
        }
    },
    mounted() {
        let client_id = this.$route.params.client_id
        this.getCard(client_id)
    },
}
</script>

<style>
</style>
