<template>

    <div>


        <div>

            <b-row>
                <!-- Search -->
                <b-col cols="12" md="1">
                    <h5>Amt from</h5>
                    <b-form-input v-model="amountFrom" />
                </b-col>
                <b-col cols="12" md="1">
                    <h5>Amt until</h5>
                    <b-form-input v-model="amountUntil" />
                </b-col>
                <b-col cols="12" md="2">
                    <b-form-group>
                        <h5>Invoice status</h5>
                        <b-form-input v-model="invoiceStatus" />
                    </b-form-group>
                </b-col>
                <b-col cols="12" md="1">
                    <b-form-group>
                        <h5>TicketID</h5>
                        <b-form-input v-model="booking_id" />
                    </b-form-group>
                </b-col>
                <b-col cols="12" md="2" v-if="$store.getters['Users/userData'].user.role.id !== 3">
                    <b-form-group>
                        <h5>Corporate account</h5>
                        <b-form-input v-model="corporateName" />
                    </b-form-group>
                </b-col>
                <b-col cols="12" md="2">
                    <b-form-group>
                        <h5>SelfPay</h5>
                        <b-form-input v-model="selfpayName" />
                    </b-form-group>
                </b-col>
                <b-col cols="12" md="3">
                    <b-form-group>
                        <h5>Range create at</h5>
                        <flat-pickr v-model="rangeDate" class="form-control" :config="{ mode: 'range' }" />
                    </b-form-group>
                </b-col>
            </b-row>

            <b-row>
                <b-col cols="12 text-right" class="mb-1">
                    <button class="btn btn-success mr-2" @click="clearFilter()">
                        Clear Filter
                    </button>
                    <button class="btn btn-primary" @click="getInvoicesByFilter('')">
                        Filter data
                    </button>
                </b-col>
            </b-row>

            <b-table-simple hover small caption-top responsive>
                <b-thead head-variant="dark">
                    <b-tr>
                        <b-th>Id</b-th>
                        <b-th>Amount</b-th>
                        <b-th>Invoice Status</b-th>
                        <b-th>Ticket Id</b-th>
                        <b-th v-if="$store.getters['Users/userData'].user.role.id !== 3">Corporate Account</b-th>
                        <b-th>Selfpay</b-th>
                        <b-th>Create_at</b-th>
                        <b-th></b-th>
                    </b-tr>
                </b-thead>
                <b-tbody>
                    <b-tr v-for="item in listItems" :key="item.id">
                        <b-td> {{ item.id }}</b-td>
                        <b-td> {{ item.amount }}</b-td>
                        <b-td> {{ item.invoice_status.toUpperCase() }}</b-td>
                        <b-td> {{ item.booking_id }}</b-td>
                        <b-td v-if="$store.getters['Users/userData'].user.role.id !== 3"> {{ getCorporateAccount(item) }}
                        </b-td>
                        <b-td> {{ getSelfPayName(item) }}</b-td>
                        <b-td> {{ convertDate(item.created_at) }}</b-td>
                        <b-td>
                            <router-link class="btn btn-warning"
                                :to="{ name: 'details-invoice', params: { id: item.booking_id } }">
                                View Details
                            </router-link>
                        </b-td>
                    </b-tr>
                </b-tbody>
                <b-tfoot>
                    <b-tr>
                        <b-td colspan="13" variant="secondary" class="text-right">
                            Total Rows: <b>{{ totalItems }}</b>
                        </b-td>
                    </b-tr>
                </b-tfoot>

            </b-table-simple>


            <div class="pagination_block">
                <nav aria-label="Page navigation example">
                    <ul class="pagination justify-content-center">
                        <li class="page-item" :class="{ disabled: pagination.prev_page_url == null }">
                            <button type="button" class="page-link"
                                @click="getItems(pagination.first_page_url)">&laquo;</button>
                        </li>
                        <li class="page-item" :class="{ disabled: pagination.prev_page_url == null }">
                            <button type="button" class="page-link"
                                @click="getItems(pagination.prev_page_url)">Previous</button>
                        </li>
                        <li class="page-item" v-if="current_page - 2 > 0">
                            <button type="button" class="page-link"
                                @click="getItems(pagination.path + '?page=' + (current_page - 2))">{{ current_page
                                        - 2
                                }}</button>
                        </li>
                        <li class="page-item" v-if="pagination.prev_page_url">
                            <button type="button" class="page-link" @click="getItems(pagination.prev_page_url)">{{
                                    current_page - 1
                            }}</button>
                        </li>
                        <li class="page-item">
                            <button type="button" class="page-link"
                                :class="{ current: pagination.current_page == current_page }">{{ current_page
                                }}</button>
                        </li>
                        <li class="page-item" v-if="pagination.next_page_url">
                            <button type="button" class="page-link" @click="getItems(pagination.next_page_url)">{{
                                    current_page + 1
                            }}</button>
                        </li>
                        <li class="page-item" v-if="current_page + 2 <= last_page">
                            <button type="button" class="page-link"
                                @click="getItems(pagination.path + '?page=' + (current_page + 2))">{{ current_page
                                        + 2
                                }}</button>
                        </li>
                        <li class="page-item" :class="{ disabled: pagination.next_page_url == null }">
                            <button type="button" class="page-link"
                                @click="getItems(pagination.next_page_url)">Next</button>
                        </li>
                        <li class="page-item" :class="{ disabled: pagination.next_page_url == null }">
                            <button type="button" class="page-link"
                                @click="getItems(pagination.last_page_url)">&raquo;</button>
                        </li>
                    </ul>
                </nav>
            </div>
        </div>
    </div>
</template>
  
<script>
import {
    BCard, BRow, BCol, BFormInput, BButton, BTable, BMedia, BAvatar, BLink,
    BBadge, BDropdown, BDropdownItem, BPagination, BListGroup, BListGroupItem,
    BFormSelect, BTableSimple, BThead, BTr, BTd, BTh, BTbody, BTfoot, BFormGroup
} from 'bootstrap-vue'
import vSelect from 'vue-select'
import flatPickr from 'vue-flatpickr-component'
import { getMessageError } from '@core/utils/utils'
import { convertToMMDDYYYY, convertToHHMM, convertToMMDDYYYYHHmm } from '@core/utils/dates'
// import UsersListFilters from './UsersListFilters.vue'
import UserListAddNew from '@core/components/infoClients/UserListAddNew'

if (process.client) {
    window.io = require('socket.io-client')
}

export default {
    name: 'ListReservationToCancel',
    components: {
        UserListAddNew,
        BCard,
        BRow,
        BCol,
        BFormInput,
        BButton,
        BTable,
        BMedia,
        BAvatar,
        BLink,
        BBadge,
        BDropdown,
        BDropdownItem,
        BPagination,
        BListGroup,
        BListGroupItem,
        BFormSelect,
        BTableSimple,
        BThead, BTr, BTd, BTh, BTbody, BTfoot,
        BFormGroup,
        flatPickr,
        vSelect,
    },
    data() {
        return {
            listItems: [],
            perPage: 10,
            currentPage: 1,
            totalItems: 0,
            pageOptions: [3, 5, 10],
            pagination: {}, current_page: 1, last_page: 0,
            fields: [{ label: 'Customer', key: 'name_selfpay', variant: 'info' }, { label: 'Status', key: 'status_code', tdClass: 'myclass' }, 'pickup_time', 'surgery_type', 'appoinment_datetime', 'city', 'actions'],
            amountFrom: null,
            amountUntil: null,
            invoiceStatus: null,
            booking_id: null,
            corporateName: null,
            selfpayName: null,
            rangeDate: null,
        }
    },
    methods: {
        convertDate(data) {
            return convertToMMDDYYYYHHmm(data)
        },
        convertTime(data) {
            return convertToHHMM(data)
        },
        getItems(url) {
            this.getInvoicesByFilter(url)
        },
        getCorporateAccount(item) {
            let res = ''
            try {
                if (item.corporate_account) {
                    res = item.corporate_account.company_legal_name.toUpperCase()
                }
            }
            catch (err) {
            }

            return res
        },
        getInvoicesByFilter(url) {
            this.$swal({
                title: 'Please, wait...',
                didOpen: () => {
                    this.$swal.showLoading()
                },
            })

            let data = this.getValuesParameters()

            if (url.length === 0) {
                if (this.$store.getters["Users/userData"].user.role.id === 3) {
                    url = `ca/panel/corporate/invoice/get_invoice_byFilter`
                } else {
                    url = `admin/panel/invoice/get_invoice_byFilter`
                }
            }

            this.$http.post(url, data).then((response) => {
                this.listItems = response.data.data.data;
                this.totalItems = response.data.data.total;
                this.current_page = response.data.data.current_page
                this.last_page = response.data.data.last_page
                this.pagination = response.data.data
                this.$swal.close();
                console.log(this.listItems)
            }).catch((res) => {
                this.$swal({
                    title: getMessageError(res),
                    icon: 'error',
                    customClass: {
                        confirmButton: 'btn btn-primary',
                    },
                    buttonsStyling: false,
                })
            })
        },
        getValuesParameters() {
            let data = {}
            let dateStart = ""
            let dateEnd = ""
            let ca_id = null

            if (this.$store.getters["Users/userData"].user.role.id === 3) {
                ca_id = this.$store.getters["Users/userData"].user.corporate_account.id
            }

            //Dates variables filter
            if (this.rangeDate !== null) {
                dateStart = this.rangeDate.split("to")[0]
                dateEnd = this.rangeDate.split("to")[1]
            }

            data = {
                amountFrom: this.amountFrom,
                amountUntil: this.amountUntil,
                invoiceStatus: this.invoiceStatus,
                booking_id: this.booking_id,
                corporateName: this.corporateName,
                selfpayName: this.selfpayName,
                dateStart: dateStart,
                dateEnd: dateEnd,
                ca_id: ca_id
            }

            return data
        },
        deleteInvoice(id) {
            this.$swal({
                title: 'Please, wait...',
                didOpen: () => {
                    this.$swal.showLoading()
                },
            })
            this.$http.post(`/admin/panel/booking/${id}/delete`)
                .then((res) => {
                    this.$swal({
                        title: res.data.message,
                        icon: 'success',
                        customClass: {
                            confirmButton: 'btn btn-primary',
                        },
                        buttonsStyling: false,
                    }).then((result) => {
                        if (result.isConfirmed) {
                            this.getClientes('');

                        }
                    })

                }).catch((error) => {
                    this.$swal({
                        title: getMessageError(error),
                        icon: 'error',
                        customClass: {
                            confirmButton: 'btn btn-primary',
                        },
                        buttonsStyling: false,
                    })
                })
        },
        getSelfPayName(item) {
            let res = ""
            try {
                res = `${item.self_pay.name.toUpperCase()} ${item.self_pay.lastname.toUpperCase()}`
            }
            catch (err) {
            }
            return res
        },
        showDetails(booking_id) {
            this.$router.push({ name: 'details-invoice', params: { id: booking_id } })
        },
        clearFilter() {
            this.amountFrom = null
            this.amountUntil = null
            this.invoiceStatus = null
            this.booking_id = null
            this.corporateName = null
            this.selfpayName = null
            this.rangeDate = null
            this.getInvoicesByFilter('')
        },
    },
    mounted() {
        this.getInvoicesByFilter('');
    },
}
</script>
  
<style lang="scss" scoped>
.per-page-selector {
    width: 90px;
}

.urlPagina {
    text-decoration: none;
    color: #7367f0;
}

.urlPagina:hover {
    background: linear-gradient(118deg, #7367f0, rgba(115, 103, 240, 0.7)) !important;
    color: #fff;
    cursor: pointer;
    border-radius: 5px;
}

.list-group-item:hover {
    background: linear-gradient(118deg, #7367f0, rgba(115, 103, 240, 0.7)) !important;
    color: #fff !important;
    cursor: pointer;
}

.urlPagina::before {
    background-color: currentColor !important;
    bottom: 0;
    content: "";
    left: 0;
    opacity: 0;
    pointer-events: none;
    position: absolute;
    right: 0;
    top: 0;
    -webkit-transition: 0.3s cubic-bezier(0.25, 0.8, 0.5, 1);
    transition: 0.3s cubic-bezier(0.25, 0.8, 0.5, 1);
}

.box {
    box-shadow: 0px 14px 20px 0px rgba(143, 143, 143, 0.2) !important;
}

.my-class {
    background: #7367f0;
}
.current {
  background: #7367f0;
  color: white;
}
</style>
  
<style lang="scss">
@import '@core/scss/vue/libs/vue-select.scss';
@import '@core/scss/vue/libs/vue-flatpicker.scss';
</style>
  