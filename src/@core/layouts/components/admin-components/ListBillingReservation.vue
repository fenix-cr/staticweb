<template>

    <div>


        <div>

            <b-row>

                <b-col cols="12" md="6">
                    <h5>Trip Status</h5>
                    <v-select v-model="selectedStatus" multiple label="title" :options="options" />
                </b-col>
                <!-- Search -->
                <b-col cols="12" md="4">
                    <b-form-group>
                        <h5>Range Appoinment date</h5>
                        <flat-pickr v-model="rangeDate" :class="{ red_border: red_border}" class="form-control" :config="configDate" :onChange="dateChange()"  />
                    </b-form-group>
                </b-col>
                <b-col cols="12" md="1" class="mb-1 ml-1" style="margin-top: 1.7rem !important; ;">
                    <button class="btn btn-primary float-right" @click="downloadCsv('')">
                        Download CSV
                    </button>
                </b-col>

            </b-row>

           
        <div v-if="csvLogs.length>0">
            <div class="d-flex mt-4">
                <h4 class="mb-2 ml-50">
                Download details of CSV
                </h4>
            </div>
            <table class="table">
            <thead>
            <tr>
                <th scope="col">User Name</th>
                <th scope="col">Detail</th>
                <th scope="col">Date</th>
                <th scope="col">Filter Duration</th>
            </tr>
            </thead>
            <tbody>
            <tr v-for="log in csvLogs">
                <td>{{log.user_name}}</td>
                <td>Download CSV File</td>
                <td>{{log.created_at}}</td>
                <td>{{log.filter_duration}}</td>
            </tr>
            </tbody>
            </table>
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
import { convertToMMDDYYYY, convertToHHMM } from '@core/utils/dates'
// import UsersListFilters from './UsersListFilters.vue'
import UserListAddNew from '@core/components/infoClients/UserListAddNew'
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
            configDate: { 
            mode: 'range', 
            minDate: '',
            maxDate: '',
            },
            red_border:false,
            listItems: [],
            perPage: 10,
            currentPage: 1,
            totalItems: 0,
            pageOptions: [3, 5, 10],
            pagination: {}, current_page: 1, last_page: 0,
            fields: [{ label: 'Customer', key: 'name_selfpay', variant: 'info' }, { label: 'Status', key: 'status_code', tdClass: 'myclass' }, 'pickup_time', 'surgery_type', 'appoinment_datetime', 'city', 'actions'],
            selectedStatus: null,
            options: [
                { value: '4', title: 'Cancelled' },
                { value: '1', title: 'Cancellation pending' },
                { value: '3', title: 'Completed' },
                { value: '7', title: 'Enroute' },
                { value: '2', title: 'In progress' },
                { value: '5', title: 'On board' },
                { value: '6', title: 'On location' },
                { value: '0', title: 'Trip pending' },
            ],
            rangeDate: null,
            csvLogs:[]
        }
    },
    methods: {
        dateChange(){
            // if(this.rangeDate != null){
            //     if(this.rangeDate.length < 11){
            //     this.configDate.minDate = this.rangeDate
            //     this.configDate.maxDate =  new Date(this.rangeDate).fp_incr(30)
            //     }
            
            // }
          
        },
        convertDate(data) {
            return convertToMMDDYYYY(data)
        },
        convertTime(data) {
            return convertToHHMM(data)
        },
        getItems(url) {
            this.getClientesByFilter(url)

            // if (this.selectedStatus !== null && this.rangeDate !== null) {
            //     this.getClientesByFilter(url)
            // } else {
            //     this.getClientes(url)
            // }
        },
        getClientes(url) {
            this.$swal({
                title: 'Please, wait...',
                didOpen: () => {
                    this.$swal.showLoading()
                },
            })

            if (url.length === 0) {
                url = 'admin/panel/booking/all_list'
            }

            this.$http.get(url).then((response) => {
                this.listItems = response.data.data.data;
                this.totalItems = response.data.data.total;
                this.current_page = response.data.data.current_page
                this.last_page = response.data.data.last_page
                this.pagination = response.data.data
                this.$swal.close();
            }).catch((res) => {
                let message = getMessageError(res)
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
        downloadCsv(){
console.log('rangeDate: ', this.rangeDate);
if(this.rangeDate != null){
    if(this.rangeDate.length > 10){
        this.red_border = false;
        this.getClientesByFilter('');
    }else{
        this.red_border=true;
    }
    
}
else{
    console.log('else: ', this.rangeDate);
    this.red_border=true;
}
           
        },
        getClientesByFilter(url) {
            this.$swal({
                title: 'Please, wait...',
                didOpen: () => {
                    this.$swal.showLoading()
                },
            })

            let data = this.getValuesParameters()

            if (url.length === 0) {
                url = `admin/panel/booking/get_booking_byFilter_csv`
            }

            this.$http.post(url, data).then((response) => {
                let blob = new Blob([response.data], {
                            type: 'application/csv'
                        })
                        let link = document.createElement('a')
                        link.href = window.URL.createObjectURL(blob)
                        link.download = 'download.csv'
                        link.click()
                        this.getCsvLogs()
                this.$swal.close();

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

            //Status variable filter
            let status = {}
            if (this.selectedStatus !== null) {
                status = this.selectedStatus.map(item => {
                    let value = item.value;
                    return value;
                })
            }

            //Dates variables filter
            if (this.rangeDate !== null) {
                dateStart = this.rangeDate.split("to")[0]
                dateEnd = this.rangeDate.split("to")[1]
            }

            data = {
                status: status,
                dateStart: dateStart,
                dateEnd: dateEnd
            }

            return data
        },
        deleteReservation(id) {
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
        sendConfirmation(id) {
            this.$swal({
                title: 'Please, wait...',
                didOpen: () => {
                    this.$swal.showLoading()
                },
            })
            this.$http.post(`/admin/panel/booking/${id}/cancel`)
                .then((response) => {
                    this.$swal({
                        title: response.data.data,
                        icon: 'success',
                        customClass: {
                            confirmButton: 'btn btn-primary',
                        },
                        buttonsStyling: false,
                    })
                        .then((result) => {
                            if (result.isConfirmed) {
                                this.getClientes('');
                            }
                        })
                }).catch((error) => {
                    this.$swal({
                        title: 'Your reservation has already cancelled',
                        icon: 'error',
                        customClass: {
                            confirmButton: 'btn btn-primary',
                        },
                        buttonsStyling: false,
                    })
                })
        },
        getDriverName(item) {
            let res = ''
            if (item.driver) {
                res = `${item.driver.name} ${item.driver.lastname}`
            }
            return res
        },
        getAddress(item) {
            let res = ''

            if (item) {
                res = JSON.parse(item);
            }
            return res
        },
        getDriverVehicle(item) {
            let res = ''
            if (item.driver) {
                if (item.driver.vehicle) {
                    res = `${item.driver.vehicle.vehicle_type}`
                }
            }
            return res
        },

        getCsvLogs(){
            this.$http.get('admin/panel/booking/csvlogs').then((response) => {
                        this.csvLogs = response.data
                this.$swal.close();

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
        }

    },
    mounted() {
        this.getCsvLogs();
        console.log('asdfk')
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
.red_border{
    border-color:red;
}
</style>
  
<style lang="scss">
@import '@core/scss/vue/libs/vue-select.scss';
@import '@core/scss/vue/libs/vue-flatpicker.scss';
</style>
  