<template>

  <div>
    <!-- Table Container Card -->
    <b-card no-body class="mb-0">

      <div class="m-2">

        <!-- Table Top -->
        <b-row>

          <!-- Per Page -->
          <b-col cols="12" md="5" class="d-flex align-items-center justify-content-start mb-1 mb-md-0">
            <button class="btn btn-primary" @click="createBooking()">
              Create a New Booking
            </button>
          </b-col>
         
          <!-- Search -->
          <b-col cols="12" md="6">
            <div class="d-flex align-items-center justify-content-end">
              <b-form-input @keyup="checkString($event)"  v-model="searchQuery" class="d-inline-block mr-1" placeholder="Search..." :class="{ red_border: notEmpty }"/>
            </div>
          </b-col>
          <b-col
              cols="12"
              md="1"
          >
          <div class="d-flex  justify-content-end">
            <button class="btn btn-primary" @click="masterSearch()">Filter</button>
          </div>
          </b-col>
        </b-row>

      </div>
      <b-table ref="refUserListTable" class="position-relative" responsive primary-key="id" :items="listClients"
        empty-text="No reservations found" show-empty :fields="fields" :per-page=0
        id="my-table" :current-page="currentPage">
        <!-- Column: name self pay -->
        <template #cell(name_selfpay)="{ item }">
          <span>
            {{ item.self_pay.name + " " + item.self_pay.lastname }}
          </span>
        </template>

        <!-- Column: Phone number self pay -->
        <template #cell(phone_number)="{ item }">
          <span>
            {{ item.self_pay.phone_number }}
          </span>
        </template>

        <template v-slot:cell(booking_date)="{ item }">
          {{ convertDate(item.booking_date) }}  {{ convertTime(item.booking_date) }}
        </template>


        <!-- Column: email self pay -->
        <template #cell(email)="{ item }">
          <span>
            {{ item.self_pay.email }}
          </span>
        </template>


        <!-- Column: Actions -->
        <template #cell(actions)="{ item }">
          <b-dropdown variant="link" no-caret :right="$store.state.appConfig.isRTL" transition="scale-transition"
            :offset-y="true">
            <template #button-content>
              <feather-icon icon="MoreVerticalIcon" size="16" class="align-middle text-body" />
            </template>
            <template style="padding: 0" v-slot:activator="{ on, attrs }">
              <b-btn color="primary" v-bind="attrs" v-on="on" icon ripple>
              </b-btn>
            </template>
            <b-list-group   v-if="item.status != 4 && item.status != 3" style="padding: 2px; margin-bottom: 2px" dense rounded>
              <router-link class="urlPagina" :to="{ name: 'details-reservation', params: { id: item.id } }">
                <b-list-group-item style="padding: 0" class="urlPagina" :ripple="false">
                  <b-list-group-item class="font-weight-bold" style="border: none; padding: 5px">
                    <feather-icon icon="FileTextIcon" />
                    Edit
                  </b-list-group-item>
                </b-list-group-item>
              </router-link>
            </b-list-group>
            <b-list-group style="padding: 2px; margin-bottom: 2px" dense rounded>
              <router-link class="urlPagina" :to="{ name: 'details-reservation', params: { id: item.id } }">
                <b-list-group-item style="padding: 0" class="urlPagina" :ripple="false">
                  <b-list-group-item class="font-weight-bold" style="border: none; padding: 5px">
                    <feather-icon icon="FileTextIcon" />
                    Details
                  </b-list-group-item>
                </b-list-group-item>
              </router-link>
            </b-list-group>
            <b-list-group v-if="$store.getters['Users/userData'].user.role.id !== 3"
              style="padding: 2px; margin-bottom: 2px" dense rounded>
              <router-link class="urlPagina" :to="{ name: '/my-bookings' }">
                <b-list-group-item style="padding: 0" class="urlPagina" :ripple="false">
                  <b-list-group-item class="font-weight-bold" style="border: none; padding: 5px"
                    @click="delete_booking(item)">
                    <feather-icon icon="TrashIcon" />
                    Delete
                  </b-list-group-item>
                </b-list-group-item>
              </router-link>
            </b-list-group>
            <template v-if="item.driver !== null">
              <b-list-group style="padding: 2px; margin-bottom: 2px" dense rounded>
                <b-list-group-item style="padding: 0; color: #7367F0FF; border-radius: 0;" class="urlPagina"
                  :ripple="false">
                  <b-list-group-item class="font-weight-bold" style="border: none; padding: 5px" @click="sendCode()">
                    <feather-icon icon="SendIcon" />
                    Send reservation code
                  </b-list-group-item>
                </b-list-group-item>

              </b-list-group>
            </template>
          </b-dropdown>
        </template>

      </b-table>
      <div class="mx-2 mb-2">
        <b-row>

          <b-col cols="12" sm="6" class="d-flex align-items-center justify-content-center justify-content-sm-start">
            <span class="text-muted">Showing {{ pagination.from }} to {{ pagination.to }} of {{totalItems}} entries</span>
          </b-col>
          <!-- Pagination -->
          <b-col cols="12" sm="6" class="d-flex align-items-center justify-content-center justify-content-sm-end">

            <div class="pagination_block">
                <nav aria-label="Page navigation example">
                    <ul class="pagination justify-content-center">
                        <li class="page-item" :class="{ disabled: pagination.prev_page_url == null }">
                            <button type="button" class="page-link"
                                @click="getClientes(pagination.first_page_url)">&laquo;</button>
                        </li>
                        <li class="page-item" :class="{ disabled: pagination.prev_page_url == null }">
                            <button type="button" class="page-link"
                                @click="getClientes(pagination.prev_page_url)">Previous</button>
                        </li>
                        <li class="page-item" v-if="currentPage - 2 > 0">
                            <button type="button" class="page-link"
                                @click="getClientes(pagination.path + '?page=' + (currentPage - 2))">{{ currentPage
                                        - 2
                                }}</button>
                        </li>
                        <li class="page-item" v-if="pagination.prev_page_url">
                            <button type="button" class="page-link" @click="getClientes(pagination.prev_page_url)">{{
                                    currentPage - 1
                            }}</button>
                        </li>
                        <li class="page-item">
                            <button type="button" class="page-link"
                                :class="{ current: pagination.current_page == currentPage }">{{ currentPage
                                }}</button>
                        </li>
                        <li class="page-item" v-if="pagination.next_page_url">
                            <button type="button" class="page-link" @click="getClientes(pagination.next_page_url)">{{
                                    currentPage + 1
                            }}</button>
                        </li>
                        <li class="page-item" v-if="(currentPage + 2 <= lastPage)">
                            <button type="button" class="page-link"
                                @click="getClientes(pagination.path + '?page=' + (currentPage + 2))">{{ currentPage
                                        + 2
                                }}</button>
                        </li>
                        <li class="page-item" :class="{ disabled: pagination.next_page_url == null }">
                            <button type="button" class="page-link"
                                @click="getClientes(pagination.next_page_url)">Next</button>
                        </li>
                        <li class="page-item" :class="{ disabled: pagination.next_page_url == null }">
                            <button type="button" class="page-link"
                                @click="getClientes(pagination.last_page_url)">&raquo;</button>
                        </li>
                    </ul>
                </nav>
            </div>

          </b-col>

        </b-row>
      </div>
    </b-card>
  </div>
</template>

<script>
import {
  BCard, BRow, BCol, BFormInput, BButton, BTable, BMedia, BAvatar, BLink,
  BBadge, BDropdown, BDropdownItem, BPagination, BListGroup, BListGroupItem,
  BFormSelect,
} from 'bootstrap-vue'
import vSelect from 'vue-select'
import UserListAddNew from '@core/components/infoClients/UserListAddNew'
import moment from "moment"
import { convertToMMDDYYYY, convertToHHMM } from '@core/utils/dates'

export default {
  name: 'BookingCA',
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
    vSelect,
    moment
  },
  data() {
    return {
      listClients: [],
      perPage: 5,
      pageOptions: [3, 5, 10],
      currentPage: 1,
      totalUsers: 0,
      valortotal: 0,
      searchQuery: '',
      optionsPerpage: '',
      user: 0,
      fields: ['name_selfpay', 'phone_number', 'email',{ label: 'Appoinment Datetime', key: 'booking_date' }, 'surgery_type', 'actions'],
      totalItems:0,
      pagination: {},
      lastPage:0,
      searchQuery:'',
      notEmpty:false
    }
  },
  computed: {
    rows() {
      return this.listClients.length
    }
  },
  watch: {
    optionsPerpage() {
      this.optionsPerpage = this.listClients.length / 2;
    }
  },
  methods: {
    checkString(e){
      if(this.searchQuery == ''){
        this.getClientes()
      }
      if(e.keyCode == 13){
        this.masterSearch()
      }
      this.notEmpty=false
    },
    masterSearch(url=''){
      this.user = parseInt(this.$store.getters["Users/userData"].user.corporate_account.id)
      if(this.searchQuery == ''){
        this.notEmpty=true
      }else{
        this.notEmpty=false
        this.$swal({
                title: 'Please, wait...',
                didOpen: () => {
                    this.$swal.showLoading()
                },
            })
        if(url == ''){
          url = `ca/${this.user}/panel/booking/list/search/`+this.searchQuery
        }
        
      this.$http.get(url).then((response) => {
        this.listClients = response.data.data.data
        this.totalItems = response.data.data.total
        this.currentPage = response.data.data.current_page
        this.lastPage = response.data.data.last_page
        this.pagination = response.data.data
        this.perPage =  response.data.data.per_page
        
        this.$swal.close();
      }).catch((res) => console.log(res.data))
      }
      
    },
    convertDate(data) {
      return convertToMMDDYYYY(data)
    },
    convertTime(data) {
      return convertToHHMM(data)
    },
    createBooking() {
      this.$router.push({ name: 'request-service' });
    },
    getClientes(url='') {
      
      this.$swal({
        title: 'Please, wait...',
        didOpen: () => {
          this.$swal.showLoading()
        },
      })
      this.user = parseInt(this.$store.getters["Users/userData"].user.corporate_account.id)
      if(url == ''){
        url = `ca/${this.user}/panel/booking/list`
      }
      this.$http.get(url).then((response) => {
        this.listClients = response.data.data.data;
        this.totalItems = response.data.data.total
        this.currentPage = response.data.data.current_page
        this.lastPage = response.data.data.last_page
        this.pagination = response.data.data
        this.perPage =  response.data.data.per_page

        this.valortotal = this.listClients.length;
        this.totalUsers = this.valortotal;
        this.$swal.close();
      }).catch((res) => console.log(res.data))
    },
    delete_booking(item) {

      this.$http.post(`/admin/panel/booking/${item.id}/delete`).then((response) => {
        this.$swal({
          title: 'Booking deleted successfully',
          subtitle: response.data,
          icon: 'success',
          customClass: {
            confirmButton: 'btn btn-primary',
          },
          buttonsStyling: false,
        })
      })
        .catch((error) => {
          this.$swal({
            title: error.response.data.data,
            icon: 'error',
            customClass: {
              confirmButton: 'btn btn-primary',
            },
            buttonsStyling: false,
          })
        })
    },
    sendCode(id) {
      this.$swal({
        title: 'Please, wait...',
        didOpen: () => {
          this.$swal.showLoading()
        },
        customClass: {
          confirmButton: 'btn btn-primary',
        },
        buttonsStyling: false,
      })
      this.$http.post(`ca/panel/reservationCode/generate?user_id=${id}`)
        .then((response) => {
          this.$swal({
            title: 'Reservation code sent successfully',
            subtitle: response.data,
            icon: 'success',
            customClass: {
              confirmButton: 'btn btn-primary',
            },
            buttonsStyling: false,
          })
        })
        .catch((error) => {
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
  mounted() {
    this.getClientes();
  }
}
</script>

<style scoped>
.per-page-selector {
  width: 90px;
}

.urlPagina {
  text-decoration: none;
}

.urlPagina:hover {
  background: linear-gradient(118deg, #7367f0, rgba(115, 103, 240, 0.7)) !important;
  color: #fff;
  cursor: pointer;
}

.list-group-item:hover {
  background: linear-gradient(118deg, #7367f0, rgba(115, 103, 240, 0.7)) !important;
  color: #fff !important;
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
.current {
  background: #7367f0;
  color: white;
}
.red_border {
  border: 1px solid red;
  border-radius: 6px;
}
</style>
