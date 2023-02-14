<template>
  <div>
    <div>
      <div></div>
      <b-row>
        <b-col cols="12" md="2">
          <b-form-group>
            <h5>User number</h5>
            <b-form-input v-model="userNumber" type="text" />
          </b-form-group>
        </b-col>
        <b-col cols="12" md="3">
          <b-form-group>
            <h5>Range create at date</h5>
            <flat-pickr
              v-model="rangeDateCreateAt"
              class="form-control"
              :config="{ mode: 'range' }"
            />
          </b-form-group>
        </b-col>
        <b-col cols="12" md="3">
          <b-form-group>
            <h5>Range sent at date</h5>
            <flat-pickr
              v-model="rangeDateSentAt"
              class="form-control"
              :config="{ mode: 'range' }"
            />
          </b-form-group>
        </b-col>
        <b-col cols="12" md="2">
          <h5>Type</h5>
          <v-select
            v-model="selectedType"
            
            label="title"
            :options="optionsTypeMessage"
          />
        </b-col>
        <b-col
          cols="12"
          md="1"
          class="mb-1 ml-1"
          style="margin-top: 1.7rem !important"
        >
          <button
            class="btn btn-primary float-right"
            @click="getSmsListByFilter('')"
          >
            Filter
          </button>
        </b-col>
      </b-row>
      <div class="circle"></div>
      <b-table-simple hover small caption-top responsive>
        <b-thead head-variant="dark">
          <b-tr>
            <b-th>Sms id</b-th>
            <b-th>User Number</b-th>
            <!-- <b-th style="width: 120px">Lc Number</b-th> -->
            <b-th style="width: 350px">Message</b-th>
            <b-th>Created</b-th>
            <b-th>Sent</b-th>
            <b-th>Is out</b-th>
            <b-th> Actions</b-th>
          </b-tr>
        </b-thead>
        <b-tbody>
          <b-tr v-for="item in listItems" :key="item.id">
            <b-td>{{ item.sms_id }}</b-td>
            <b-td>{{ item.user_number }}</b-td>
            <!-- <b-td>{{ item.lc_number }}</b-td> -->
            <b-td>{{ item.message }}</b-td>
            <b-td>{{
              item.created_at != null
                ? convertDateHHMM(item.created_at)
                : ''
            }}</b-td>
            <b-td>{{ convertDateHHMM(item.sent_at) }}</b-td>
            <b-td>{{ item.is_out == 1 ? "True" : "False" }}</b-td>
            <b-td>
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
                <template style="padding: 0" v-slot:activator="{ on, attrs }">
                  <b-btn color="primary" v-bind="attrs" v-on="on" icon ripple>
                  </b-btn>
                </template>
                <b-list-group
                  style="padding: 2px; margin-bottom: 2px"
                  dense
                  rounded
                >
                  <b-list-group-item
                    style="padding: 0"
                    class="urlPagina"
                    :ripple="false"
                  >
                    <b-list-group-item
                      :id="item.id"
                      class="font-weight-bold"
                      v-b-modal.modal-center
                      @click="setSeletedItem(item)"
                      style="border: none; padding: 5px; color: #7367f0"
                    >
                      Send Sms
                    </b-list-group-item>
                  </b-list-group-item>
                </b-list-group>
              </b-dropdown>
            </b-td>
          </b-tr>
        </b-tbody>
        <b-tfoot>
          <b-tr>
            <b-td colspan="15" variant="secondary" class="text-right">
              Total Rows: <b>{{ totalItems }}</b>
            </b-td>
          </b-tr>
        </b-tfoot>
      </b-table-simple>

      <div class="pagination_block">
        <nav aria-label="Page navigation example">
          <ul class="pagination justify-content-center">
            <li
              class="page-item"
              :class="{ disabled: pagination.prev_page_url == null }"
            >
              <button
                type="button"
                class="page-link"
                @click="getItems(pagination.first_page_url)"
              >
                &laquo;
              </button>
            </li>
            <li
              class="page-item"
              :class="{ disabled: pagination.prev_page_url == null }"
            >
              <button
                type="button"
                class="page-link"
                @click="getItems(pagination.prev_page_url)"
              >
                Previous
              </button>
            </li>
            <li class="page-item" v-if="current_page - 2 > 0">
              <button
                type="button"
                class="page-link"
                @click="
                  getItems(pagination.path + '?page=' + (current_page - 2))
                "
              >
                {{ current_page - 2 }}
              </button>
            </li>
            <li class="page-item" v-if="pagination.prev_page_url">
              <button
                type="button"
                class="page-link"
                @click="getItems(pagination.prev_page_url)"
              >
                {{ current_page - 1 }}
              </button>
            </li>
            <li class="page-item">
              <button
                type="button"
                class="page-link"
                :class="{ current: pagination.current_page == current_page }"
              >
                {{ current_page }}
              </button>
            </li>
            <li class="page-item" v-if="pagination.next_page_url">
              <button
                type="button"
                class="page-link"
                @click="getItems(pagination.next_page_url)"
              >
                {{ current_page + 1 }}
              </button>
            </li>
            <li class="page-item" v-if="current_page + 2 <= last_page">
              <button
                type="button"
                class="page-link"
                @click="
                  getItems(pagination.path + '?page=' + (current_page + 2))
                "
              >
                {{ current_page + 2 }}
              </button>
            </li>
            <li
              class="page-item"
              :class="{ disabled: pagination.next_page_url == null }"
            >
              <button
                type="button"
                class="page-link"
                @click="getItems(pagination.next_page_url)"
              >
                Next
              </button>
            </li>
            <li
              class="page-item"
              :class="{ disabled: pagination.next_page_url == null }"
            >
              <button
                type="button"
                class="page-link"
                @click="getItems(pagination.last_page_url)"
              >
                &raquo;
              </button>
            </li>
          </ul>
        </nav>
      </div>

      <b-modal id="modal-center" centered hide-footer>
        <div class="d-block text-center">
          <h3>Write the message to {{ getUserNumber(selectedItem) }}</h3>
          <b-col>
            <b-form-group>
              <b-form-input v-model="smsText" />
            </b-form-group>
          </b-col>
        </div>
        <b-row class="mt-3">
          <b-col>
            <b-button block @click="sendSms()">Send</b-button>
          </b-col>
          <b-col>
            <b-button block @click="$bvModal.hide('modal-center')"
              >Close</b-button
            >
          </b-col>
        </b-row>
      </b-modal>
    </div>
  </div>
</template>
  
<script>
import {
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
  BThead,
  BTr,
  BTd,
  BTh,
  BTbody,
  BTfoot,
  BFormGroup,
  BFormCheckbox,
  BFormCheckboxGroup,
  BInput,
} from "bootstrap-vue";
import vSelect from "vue-select";
import flatPickr from "vue-flatpickr-component";
import { getMessageError } from "@core/utils/utils";
import {
  convertToMMDDYYYYHHmm,
  convertToMMDDYYYY,
  convertToHHMM,
} from "@core/utils/dates";
// import UsersListFilters from './UsersListFilters.vue'
import UserListAddNew from "@core/components/infoClients/UserListAddNew";
import moment from "moment";
export default {
  components: {
    UserListAddNew,
    BCard,
    BRow,
    BCol,
    BFormInput,
    BFormCheckbox,
    BFormCheckboxGroup,
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
    BThead,
    BTr,
    BTd,
    BTh,
    BTbody,
    BTfoot,
    BFormGroup,
    flatPickr,
    vSelect,
    BFormInput,
    moment,
  },
  data() {
    return {
      BFormInput: "",
      userNumber: "",
      listItems: [],
      perPage: 10,
      currentPage: 1,
      totalItems: 0,
      pageOptions: [3, 5, 10],
      pagination: {},
      current_page: 1,
      last_page: 0,
      selectedStatus: null,
      rangeDateCreateAt: null,
      rangeDateSentAt: null,
      selectedItem: null,
      listIncomingMessages: [],
      listOutcomingMessages: [],
      smsText: "",
      selectedType:null,
      optionsTypeMessage: [
        { value: 1, title: "Out" },
        { value: 0, title: "In" },
      ],
      dataGetItFromApi:0
    };
  },
  methods: {
    convertDateHHMM(data) {
      return convertToMMDDYYYYHHmm(data);
    },
    convertDate(data) {
      return convertToMMDDYYYY(data);
    },
    convertTime(data) {
      return convertToHHMM(data);
    },
    getItems(url) {
      this.getSmsListByFilter(url);
    },
    getUserNumber(item) {
      let res = "";

      try {
        if (item != null) {
          res = item.user_number;
        }
      } catch (err) {}

      return res;
    },
    updateSmsLogList(isOut) {
      let url = "admin/panel/booking/update_smslog_from_api";
      let endTime = moment().format("YYYY-MM-DD HH:mm:ss");

      let formData = new FormData();
      formData.append("endTime", endTime);
      formData.append("isOut", isOut);

      this.$swal({
        title: "Updating sms log please, wait...",
        didOpen: () => {
          this.$swal.showLoading();
        },
      });
      this.$http
        .post(url, formData)
        .then((response) => {
          this.dataGetItFromApi=this.dataGetItFromApi+1;
          let tem= this.dataGetItFromApi;
          if(this.dataGetItFromApi==2)
          {
            this.$swal.close();
            this.dataGetItFromApi=0;
            this.getSmsListByFilter("");
          }       
        })
        .catch((res) => {
          let message = getMessageError(res);
          this.$swal({
            title: message,
            icon: "error",
            customClass: {
              confirmButton: "btn btn-primary",
            },
            buttonsStyling: false,
          });
        });
    },
    getSmsList(url) {
      this.$swal({
        title: "Please, wait...",
        didOpen: () => {
          this.$swal.showLoading();
        },
      });

      if (url.length === 0) {
        url = "admin/panel/booking/all_list";
      }

      this.$http
        .get(url)
        .then((response) => {
          this.listItems = response.data.data.data;
          this.totalItems = response.data.data.total;
          this.current_page = response.data.data.current_page;
          this.last_page = response.data.data.last_page;
          this.pagination = response.data.data;
          this.$swal.close();
        })
        .catch((res) => {
          let message = getMessageError(res);
          this.$swal({
            title: message,
            icon: "error",
            customClass: {
              confirmButton: "btn btn-primary",
            },
            buttonsStyling: false,
          });
        });
    },
    getSmsListByFilter(url) {
      this.$swal({
        title: "Please, wait receiving sms...",
        didOpen: () => {
          this.$swal.showLoading();
        },
      });

      let data = this.getValuesParameters();

      if (url.length === 0) {
        url = `admin/panel/booking/get_sms_log_byFilter`;
      }

      this.$http
        .post(url, data)
        .then((response) => {
          this.listItems = response.data.data.data;
          this.totalItems = response.data.data.total;
          this.current_page = response.data.data.current_page;
          this.last_page = response.data.data.last_page;
          this.pagination = response.data.data;
          this.$swal.close();
        })
        .catch((res) => {
          this.$swal({
            title: getMessageError(res),
            icon: "error",
            customClass: {
              confirmButton: "btn btn-primary",
            },
            buttonsStyling: false,
          });
        });
    },
    getValuesParameters() {
      let data = {};
      let dateStartCreateAt = "";
      let dateEndCreateAt = "";
      let dateStartSentAt = "";
      let dateEndSentAt = "";


      //Dates variables filter create at
      if (this.rangeDateCreateAt !== null) {
        dateStartCreateAt = this.rangeDateCreateAt.split("to")[0];
        dateEndCreateAt = this.rangeDateCreateAt.split("to")[1];
      }

      //Dates variables filter sent at
      if (this.rangeDateSentAt !== null) {
        dateStartSentAt = this.rangeDateSentAt.split("to")[0];
        dateEndSentAt = this.rangeDateSentAt.split("to")[1];
      }

      data = {
        userNumber: this.userNumber,
        is_out: this.selectedType==null?null:  (this.selectedType.value==0?false:true),
        dateStartCreateAt: dateStartCreateAt,
        dateEndCreateAt: dateEndCreateAt,
        dateStartSentAt: dateStartSentAt,
        dateEndSentAt: dateEndSentAt,
      };

      return data;
    },
    setSeletedItem(item) {
      this.selectedItem = item;
    },
    sendSms() {
      let formData = new FormData();
      formData.append("userNumber", this.selectedItem.user_number);
      formData.append("text", this.smsText);

      this.$swal({
        title: "Please, wait...",
        didOpen: () => {
          this.$swal.showLoading();
        },
      });

      this.$http
        .post("admin/panel/booking/send_sms_text", formData)
        .then((response) => {
          this.$swal.close();
          this.$bvModal.hide("modal-center");
          this.smsText = "";
          this.$swal({
            title: "Message sent successfully",
            icon: "success",
            customClass: {
              confirmButton: "btn btn-primary",
            },
            buttonsStyling: false,
          });
        })
        .catch((res) => {
          let message = getMessageError(res);
          this.$swal({
            title: message,
            icon: "error",
            customClass: {
              confirmButton: "btn btn-primary",
            },
            buttonsStyling: false,
          });
        });
    },
  },
  mounted() {
    this.updateSmsLogList(true);
    this.updateSmsLogList(false);
  },
};
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
  background: linear-gradient(
    118deg,
    #7367f0,
    rgba(115, 103, 240, 0.7)
  ) !important;
  color: #fff;
  cursor: pointer;
  border-radius: 5px;
}

.list-group-item:hover {
  background: linear-gradient(
    118deg,
    #7367f0,
    rgba(115, 103, 240, 0.7)
  ) !important;
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

.green_timer {
  background: green;
  color: white;
  padding: 3px;
  border-radius: 8px;
}
.current {
  background: #7367f0;
  color: white;
}
</style>
  
<style lang="scss">
@import "@core/scss/vue/libs/vue-select.scss";
@import "@core/scss/vue/libs/vue-flatpicker.scss";
</style>
  