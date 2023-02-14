<template>
     <div> 
        <b-card
        no-body
        class="mb-0"
    >
      <div class="m-2">
        <!-- Table Top -->
        <b-row>
          <!-- Per Page -->
          <b-col
              cols="12"
              md="5"
              class="d-flex align-items-center justify-content-start mb-1 mb-md-0"
          >
            
          </b-col>

          <!-- Search -->
          <b-col
              cols="12"
              md="6"
          >
            <div class="d-flex align-items-center justify-content-end">
              <b-form-input
              @keyup="checkString($event)"
                  class="d-inline-block mr-1"
                  placeholder="Search..."
                  v-model="searchQuery"
                  :class="{ red_border: notEmpty }"
              />


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

      <b-table
          ref="refUserListTable"
          class="position-relative"
          responsive
          primary-key="id"
          :items="listDrivers"
          :fields="fields"
          empty-text="No matching records found"
          :per-page=0
          show-empty
          id="my-table"
          :current-page="currentPage"
      >
      
        <template v-slot:cell(driver_documents.licenseExpireyDate)="{ item }">
          <p class="d-none"  >{{ a = getLicenseExpireyDate(item)}}</p>
          <p v-if=" a.days <=15" class="color-red"  >{{ a.date }}</p>
          <p v-if=" a.days >15 && a.days<=30 " class="color-orange"  >{{ a.date }}</p>
          <p v-if=" a.days >30 "  >{{ a.date }}</p>
        </template>
        <template id="ll" v-slot:cell(driver_documents.insuranceExpireyDate)="{ item }">
          <p class="d-none"  >{{ b = getInsuranceExpireyDate(item)}}</p>
          <p v-if=" b.days <=15" class="color-red"  >{{ b.date }}</p>
          <p v-if=" b.days >15 && b.days<=30 " class="color-orange"  >{{ b.date }}</p>
          <p v-if=" b.days >30" class=""  >{{ b.date }}</p>
        </template>
        <template  v-slot:cell(driver_documents.driver_id)="{ item }">
            <router-link class="urlPagina"
                           :to="{ name: 'details-driver-view', params: { id: item.driver_documents.driver_id } }"
              >Driver Details</router-link>
        </template>
        
      </b-table>
      <div class="mx-2 mb-2">
        <b-row>

          <b-col
              cols="12"
              sm="6"
              class="d-flex align-items-center justify-content-center justify-content-sm-start"
          >
             <span class="text-muted">Showing {{ pagination.from }} to {{ pagination.to }} of {{totalItems}} entries</span>
          </b-col>
          <!-- Pagination -->
          <b-col
              cols="12"
              sm="6"
              class="d-flex align-items-center justify-content-center justify-content-sm-end"
          >

           
            <div class="pagination_block">
                <nav aria-label="Page navigation example">
                    <ul class="pagination justify-content-center">
                        <li class="page-item" :class="{ disabled: pagination.prev_page_url == null }">
                            <button type="button" class="page-link"
                                @click="getExpireyDocument(pagination.first_page_url)">&laquo;</button>
                        </li>
                        <li class="page-item" :class="{ disabled: pagination.prev_page_url == null }">
                            <button type="button" class="page-link"
                                @click="getExpireyDocument(pagination.prev_page_url)">Previous</button>
                        </li>
                        <li class="page-item" v-if="currentPage - 2 > 0">
                            <button type="button" class="page-link"
                                @click="getExpireyDocument(pagination.path + '?page=' + (currentPage - 2))">{{ currentPage
                                        - 2
                                }}</button>
                        </li>
                        <li class="page-item" v-if="pagination.prev_page_url">
                            <button type="button" class="page-link" @click="getExpireyDocument(pagination.prev_page_url)">{{
                                    currentPage - 1
                            }}</button>
                        </li>
                        <li class="page-item">
                            <button type="button" class="page-link"
                                :class="{ current: pagination.current_page == currentPage }">{{ currentPage
                                }}</button>
                        </li>
                        <li class="page-item" v-if="pagination.next_page_url">
                            <button type="button" class="page-link" @click="getExpireyDocument(pagination.next_page_url)">{{
                                    currentPage + 1
                            }}</button>
                        </li>
                        <li class="page-item" v-if="(currentPage + 2 <= lastPage)">
                            <button type="button" class="page-link"
                                @click="getExpireyDocument(pagination.path + '?page=' + (currentPage + 2))">{{ currentPage
                                        + 2
                                }}</button>
                        </li>
                        <li class="page-item" :class="{ disabled: pagination.next_page_url == null }">
                            <button type="button" class="page-link"
                                @click="getExpireyDocument(pagination.next_page_url)">Next</button>
                        </li>
                        <li class="page-item" :class="{ disabled: pagination.next_page_url == null }">
                            <button type="button" class="page-link"
                                @click="getExpireyDocument(pagination.last_page_url)">&raquo;</button>
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
      BBadge, BDropdown, BDropdownItem, BPagination, BListGroup, BListGroupItem,BFormSelect,
    } from 'bootstrap-vue'
    import vSelect from 'vue-select'
    import ListApproveDriver from '@core/layouts/components/admin-components/ListApproveDriver'
    
    import UserListAddNew from '@core/components/infoClients/UserListAddNew'
    
    export default {
      components: {
        BFormSelect,
        UserListAddNew,
        ListApproveDriver,
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
        vSelect,
      },
     
      data() {
    return {
      drivers:[],
      perPage: 15,
      pageOptions: [ 5, 15,30],
      currentPage: 1,
      listDrivers: [],
      detailDrivers: {},
      search: '',
      fields: [
        { label: 'Driver Id', key: 'driver_id',sortable: true },
        { label: 'First Name', key: 'name',sortable: true},
        { label: 'Last Name', key: 'lastname',sortable: true},
        { label: 'Licence EXPIRATION Date', key: 'driver_documents.licenseExpireyDate',sortable: true},
        { label: 'Insurance EXPIRATION Date', key: 'driver_documents.insuranceExpireyDate',sortable: true},
        { label: 'Action', key: 'driver_documents.driver_id'}
    ],
    totalItems:0,
    pagination: {},
    lastPage:0,
    searchQuery:'',
    notEmpty:false
    }
  },
      methods: {
        checkString(e){
      if(this.searchQuery == ''){
        this.getExpireyDocument()
      }
      if(e.keyCode == 13){
        this.masterSearch()
      }
      this.notEmpty=false
    },
    masterSearch(url=''){
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
          url = `admin/panel/driver/documentExpirey/search/`+this.searchQuery
        }
        
      this.$http.get(url).then((response) => {
        this.listDrivers = response.data.data.data
        this.totalItems = response.data.data.total
        this.currentPage = response.data.data.current_page
        this.lastPage = response.data.data.last_page
        this.pagination = response.data.data
        this.perPage =  response.data.data.per_page
        
        this.$swal.close();
      }).catch((res) => console.log(res.data))
      }
      
    },
        getLicenseExpireyDate(item){
        
            if(item.driver_documents.licenseExpireyDate != null){
            var date1 = item.driver_documents.licenseExpireyDate;
            var todayDate = new Date();
            var month =  todayDate.getMonth()+1;
            var date2 = todayDate.getFullYear()+'-'+month+'-'+todayDate.getDate()
           
            // To calculate the time difference of two dates

            var date11 = new Date(date1);
            var date22 = new Date(date2);

            var Difference_In_Time =  date11 - date22;
            
            // To calculate the no. of days between two dates
            var Difference_In_Days = Difference_In_Time / (1000 * 3600 * 24);

            }
            
            return {'date':item.driver_documents.licenseExpireyDate,'days':Difference_In_Days};
        },

        getInsuranceExpireyDate(item){
        
        if(item.driver_documents.insuranceExpireyDate != null){
        var date1 = item.driver_documents.insuranceExpireyDate;
        var todayDate = new Date();
        var month =  todayDate.getMonth()+1;
        var date2 = todayDate.getFullYear()+'-'+month+'-'+todayDate.getDate()
       
        // To calculate the time difference of two dates

        var date11 = new Date(date1);
        var date22 = new Date(date2);

        var Difference_In_Time =  date11 - date22;
        
        // To calculate the no. of days between two dates
        var Difference_In_Days = Difference_In_Time / (1000 * 3600 * 24);

        }
        //console.log('date: ',item.driver_documents.insuranceExpireyDate,'days: ',Difference_In_Days)
        return {'date':item.driver_documents.insuranceExpireyDate,'days':Difference_In_Days};
    },
    getExpireyDocument(url='') {
      if(url == ''){
        url = 'admin/panel/driver/documentExpirey'
      }
      this.$swal({
        title: 'Please, wait...',
        didOpen: () => {
          this.$swal.showLoading()
        },
      })
      this.$http.get(url)
          .then((response) => {
           this.listDrivers = response.data.data.data;
           this.totalItems = response.data.data.total
           this.currentPage = response.data.data.current_page
           this.lastPage = response.data.data.last_page
           this.pagination = response.data.data
           this.perPage =  response.data.data.per_page
        //    this.perPage = response.data.data.per_page
            this.$swal.close();
          })
          .catch((res) => console.log(res.response.data))
    },
   
  },
  
  mounted() {
    this.getExpireyDocument()
  },
  computed: {
    rows() {
      return this.listDrivers.length
    }
  },
    
    }
    </script>
    
    <style lang="scss" scoped>
    .per-page-selector {
      width: 90px;
    }
    .urlPagina {
      text-decoration: none;
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
      box-shadow: 0 14px 20px 0 rgba(143, 143, 143, 0.2) !important;
    }
    .color-red {
    background: red;
    color: white;
    display: inline;
    border-radius: 6px;
    padding: 5px;

}
.color-orange{
    background:orange;
    color: white;
    display: inline;
    border-radius: 6px;
    padding: 5px;
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
    
    <style lang="scss">
    @import '@core/scss/vue/libs/vue-select.scss';
    </style>
    