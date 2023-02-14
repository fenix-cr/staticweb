<template>

  <div>
    <!-- Table Container Card -->
    <b-card no-body class="mb-0">

      <div class="m-2">

        <!-- Table Top -->
        <b-row>

          <!-- Per Page -->
          <b-col cols="12" md="6" class="d-flex align-items-center justify-content-start mb-1 mb-md-0">
            <label>Showing</label>
            <b-form-select v-model="perPage" :options="pageOptions" id="perPageSelect"
              class="per-page-selector d-inline-block mx-50" />
            <label>entries</label>
          </b-col>

          <!-- Search -->
          <b-col cols="12" md="6">
            <div class="d-flex align-items-center justify-content-end">
              <b-form-input v-model="search" class="d-inline-block mr-1" placeholder="Search..." />
            </div>
          </b-col>
        </b-row>

      </div>

      <b-table ref="refUserListTable" class="position-relative" responsive primary-key="id" :items="listClients"
        empty-text="No patients found" :fields="fields" :filter="search" :per-page="perPage" id="my-table"
        :current-page="currentPage" show-empty>


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
            <b-list-group style="padding: 2px; margin-bottom: 2px" dense rounded>
              <router-link class="urlPagina"
                :to="{ name: 'form-drivers-work-cities', params: { id: item.id, item: item } }">
                <b-list-group-item style="padding: 0" class="urlPagina" :ripple="false">
                  <b-list-group-item class="font-weight-bold" style="border: none; padding: 5px">
                    <feather-icon icon="FileTextIcon" />
                    Details
                  </b-list-group-item>
                </b-list-group-item>
              </router-link>
            </b-list-group>
            <b-list-group style="padding: 2px; margin-bottom: 2px" dense rounded>
              <b-list-group-item style="padding: 0" class="urlPagina" :ripple="false">
                <b-list-group-item class="font-weight-bold" style="border: none; padding: 5px"
                  @click="deleteRecord(item.id)">
                  <feather-icon icon="TrashIcon" />
                  Delete
                </b-list-group-item>
              </b-list-group-item>
            </b-list-group>
          </b-dropdown>
        </template>

      </b-table>
      <div class="mx-2 mb-2">
        <b-row>

          <b-col cols="12" sm="6" class="d-flex align-items-center justify-content-center justify-content-sm-start">
            <span class="text-muted">Showing {{ perPage }} of {{
                listClients.length
            }} entries</span>
          </b-col>
          <!-- Pagination -->
          <b-col cols="12" sm="6" class="d-flex align-items-center justify-content-center justify-content-sm-end">

            <b-pagination :per-page="perPage" v-model="currentPage" :total-rows="rows" first-number last-number
              class="mb-0 mt-1 mt-sm-0" prev-class="prev-item" next-class="next-item" aria-controls="my-table">
              <template #prev-text>
                <feather-icon icon="ChevronLeftIcon" size="18" />
              </template>
              <template #next-text>
                <feather-icon icon="ChevronRightIcon" size="18" />
              </template>
            </b-pagination>

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
  name: 'ListUsers',
  data() {
    return {
      perPage: 10,
      pageOptions: [3, 5, 10],
      currentPage: 1,
      listClients: [],
      search: '',
      fields: [{ label: 'Driver Id', key: 'driver.driver_id' }, { label: 'Driver Name', key: 'driver.name' }, { label: 'Driver Lastname', key: 'driver.lastname' }, 'city', 'state', 'actions'],
    }
  },
  methods: {
    getListRecords() {
      this.$swal({
        title: 'Please, wait...',
        didOpen: () => {
          this.$swal.showLoading()
        },
      })
      this.$http.get(`admin/panel/workcity/ListDriverWorkCity`).then((response) => {
        this.listClients = response.data.data
        console.log(this.listClients)
        this.$swal.close();
      }).catch((res) => console.log(res.data))
    },
    deleteRecord(id) {
      this.$swal({
        title: "Do you want delete this record?",
        text: "Once deleted, you will not be able to recover this record!",
        icon: "warning",
        buttons: true,
        dangerMode: true,
      }).then((result) => {
        if (result.value) { // <-- if confirmed
          this.$swal({
            title: 'Please, wait...',
            didOpen: () => {
              this.$swal.showLoading()
            },
          })

          this.$http.post(`admin/panel/workcity/${id}/delete`)
            .then((res) => {
              this.getListRecords();
              this.$swal({
                title: res.data.data,
                icon: 'success',
                customClass: {
                  confirmButton: 'btn btn-primary',
                },
                buttonsStyling: false,
              }).then((result) => {
                if (result.isConfirmed) {
                  this.$router.push({ name: 'all-selfpaids' })
                }
              })

            }).catch((error) => {
              console.log(error)
              this.$swal({
                title: error.response.data.message,
                icon: 'error',
                customClass: {
                  confirmButton: 'btn btn-primary',
                },
                buttonsStyling: false,
              })
            })

        }
      })




    },
  },
  computed: {
    rows() {
      return this.listClients.length
    }
  },
  mounted() {
    this.getListRecords();
  }
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
  box-shadow: 0 14px 20px 0 rgba(143, 143, 143, 0.2) !important;
}
</style>

<style lang="scss">
@import '@core/scss/vue/libs/vue-select.scss';
</style>
