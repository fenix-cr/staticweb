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
            <router-link class="btn btn-primary" v-if="this.$hasPermission('onboarding-new-drivers')"
                           :to="{ name: 'add-driver' }"
              >
                Add Driver
              </router-link>
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
          <!-- Column: Actions -->
  
          <template  #cell(phone_number_verified_at)="{ item }">
            <span :class="item.phone_number_verified_at === null ? 'no-verified' : 'verified'">
               {{ item.phone_number_verified_at === null ? 'Not verified' : 'Verified' }}
            </span>
          </template>
  
  
          <template  #cell(email_verified_at)="{item }">
            <span :class="item.email_verified_at !== null ? 'verified' : 'no-verified'" >
               {{ item.email_verified_at === null ? 'Not verified' : 'Verified' }}
            </span>
  
          </template>
  
  
          <template #cell(actions)="{ item }">
            <b-dropdown
                variant="link"
                no-caret
                :right="$store.state.appConfig.isRTL"
                transition="scale-transition"
                :offset-y="true"
            >
              <template #button-content>
                <feather-icon
                    icon="MoreVerticalIcon"
                    size="16"
                    class="align-middle text-body"
                />
              </template>
              <template style="padding: 0"  v-slot:activator="{ on, attrs }">
                <b-btn color="primary" v-bind="attrs" v-on="on" icon ripple>
                </b-btn>
              </template>
              <b-list-group  style="padding: 2px; margin-bottom: 2px" dense rounded>
                <router-link class="urlPagina"
                             :to="{ name: 'details-driver-view', params: { id: item.id } }"
                >
                  <b-list-group-item style="padding: 0" class="urlPagina" :ripple="false">
                    <b-list-group-item class="font-weight-bold"
                                       style="border: none; padding: 5px"
                    >
                      <feather-icon icon="FileTextIcon"/>
                      Details
                    </b-list-group-item
                    >
                  </b-list-group-item>
                </router-link>
              </b-list-group>
              <b-list-group style="padding: 2px; margin-bottom: 2px" dense rounded   v-if="hasPermissionRemoveUser">
                
                  <b-list-group-item style="padding: 0" class="urlPagina" :ripple="false">
                    <b-list-group-item class="font-weight-bold"
                                       style="border: none; padding: 5px ;cursor: pointer; color: #7367f0;"
                                       @click="deleteDriver(item.id)"
                    >
                      <feather-icon icon="TrashIcon"/>
                      Delete
                    </b-list-group-item
                    >
                  </b-list-group-item>
                
              </b-list-group>
            </b-dropdown>
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
                                @click="getDrivers(pagination.first_page_url)">&laquo;</button>
                        </li>
                        <li class="page-item" :class="{ disabled: pagination.prev_page_url == null }">
                            <button type="button" class="page-link"
                                @click="getDrivers(pagination.prev_page_url)">Previous</button>
                        </li>
                        <li class="page-item" v-if="currentPage - 2 > 0">
                            <button type="button" class="page-link"
                                @click="getDrivers(pagination.path + '?page=' + (currentPage - 2))">{{ currentPage
                                        - 2
                                }}</button>
                        </li>
                        <li class="page-item" v-if="pagination.prev_page_url">
                            <button type="button" class="page-link" @click="getDrivers(pagination.prev_page_url)">{{
                                    currentPage - 1
                            }}</button>
                        </li>
                        <li class="page-item">
                            <button type="button" class="page-link"
                                :class="{ current: pagination.current_page == currentPage }">{{ currentPage
                                }}</button>
                        </li>
                        <li class="page-item" v-if="pagination.next_page_url">
                            <button type="button" class="page-link" @click="getDrivers(pagination.next_page_url)">{{
                                    currentPage + 1
                            }}</button>
                        </li>
                        <li class="page-item" v-if="(currentPage + 2 <= lastPage)">
                            <button type="button" class="page-link"
                                @click="getDrivers(pagination.path + '?page=' + (currentPage + 2))">{{ currentPage
                                        + 2
                                }}</button>
                        </li>
                        <li class="page-item" :class="{ disabled: pagination.next_page_url == null }">
                            <button type="button" class="page-link"
                                @click="getDrivers(pagination.next_page_url)">Next</button>
                        </li>
                        <li class="page-item" :class="{ disabled: pagination.next_page_url == null }">
                            <button type="button" class="page-link"
                                @click="getDrivers(pagination.last_page_url)">&raquo;</button>
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
  
  export default {
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
    },
    name: 'CMA',
    data() {
      return {
        perPage: 5,
        pageOptions: [3, 5, 10],
        currentPage: 1,
        listDrivers: [],
        detailDrivers: {},
        search: '',
        fields: ['driver_id', 'name', 'lastname', 'gender', 'phone_number',  'email',  'address', 'actions'],
        hasPermissionRemoveUser:false,
        totalItems:0,
        pagination: {},
        lastPage:0,
        searchQuery:'',
        notEmpty:false
      }
    },
    methods: {
      deleteDriver(id){
      this.$swal({
        title: 'Please, wait...',
        didOpen: () => {
          this.$swal.showLoading()
        },
      })
      this.$http.post(`/admin/panel/driver/${id}/delete`)
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
                this.getDrivers();

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
    },
      checkString(e){
      if(this.searchQuery == ''){
        this.getDrivers()
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
          url = `admin/panel/driver/cna/bt/list/search/`+this.searchQuery
        }
        
      this.$http.get(url).then((response) => {
        this.listDrivers = response.data.data.data
        this.totalItems = response.data.data.total
        this.currentPage = response.data.data.current_page
        this.lastPage = response.data.data.last_page
        this.pagination = response.data.data
        this.perPage =  response.data.data.per_page
        this.$store.commit('Users/usersData', this.listClients);
        this.$swal.close();
      }).catch((res) => console.log(res.data))
      }
      
    },
      getDrivers(url='') {
        if(url == ''){
        url = 'admin/panel/driver/cna/bt/list'
      }
        this.$swal({
          title: 'Please, wait...',
          didOpen: () => {
            this.$swal.showLoading()
          },
        })
        this.$http.get(url)
            .then((response) => {
              this.listDrivers = response.data.data.data
              this.totalItems = response.data.data.total
              this.currentPage = response.data.data.current_page
              this.lastPage = response.data.data.last_page
              this.pagination = response.data.data
              this.perPage =  response.data.data.per_page
              this.$swal.close();
            })
            .catch((res) => console.log(res.data))
      },
      loadPermissions() {
      this.hasPermissionRemoveUser = this.$hasPermission(
        "approval-removal-of-users"
      );
    },
    },
    computed: {
      rows () {
        return this.listDrivers.length
      }
    },
    mounted() {
      this.getDrivers()
      this.loadPermissions() 
    }
  }
  </script>
  
  <style lang="scss" scoped>
  .per-page-selector {
    width: 90px;
  }
  </style>
  
  <style lang="scss">
  @import '@core/scss/vue/libs/vue-select.scss';
  
  .urlPagina {
    text-decoration: none;
  }
  .urlPagina:hover {
    background: linear-gradient(118deg, #7367f0, rgba(115, 103, 240, 0.7)) !important;
    color: #fff;
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
  
  .verified {
    color: #7467f0;
  }
  .no-verified{
    color: red;
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
  