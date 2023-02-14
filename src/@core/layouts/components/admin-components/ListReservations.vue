<template>
  <div>
    <div>
      <!-- Search setion -->
      <b-row>
        <b-col cols="12" md="4">
          <h5>Status</h5>
          <v-select
            v-model="selectedStatus"
            multiple
            label="title"
            :options="options"
          />
        </b-col>
        <!-- Search -->
        <b-col cols="12" md="3">
          <b-form-group>
            <h5>Range appointment date</h5>
            <flat-pickr
              v-model="rangeDate"
              class="form-control"
              :config="{ mode: 'range' }"
            />
          </b-form-group>
        </b-col>
        <b-col cols="12" md="3">
          <b-form-group>
            <h5>Search</h5>
            <b-form-input
              v-model="searchingText"
              @keyup="masterSearch($event)"
              type="text"
            />
          </b-form-group>
        </b-col>
        <b-col
          cols="12"
          md="1"
          class="mb-1 ml-1"
          style="margin-top: 1.7rem !important"
        >
          <button
            class="btn btn-primary float-right"
            @click="getClientesByFilter('')"
          >
            Filter
          </button>
        </b-col>
      </b-row>
      <!--End Search setion -->

      <!-- Update status setion -->
      <b-row>
        <b-col cols="12" md="2">
          <b-form-group>
            <h5>Conf Num</h5>
            <b-form-input v-model="ticketToUpdateNumber" disabled type="text" />
          </b-form-group>
        </b-col>
        <b-col cols="12" md="2">
          <h5>Status</h5>
          <v-select
            v-model="ticketToUpdateStatus"
            label="title"
            :options="options"
          />
        </b-col>
        <b-col
          cols="12"
          md="2"
          class="mb-1 ml-1"
          style="margin-top: 1.7rem !important"
        >
          <button
            @click="updateStatusBooking()"
            class="btn"
            style="background-color: rgb(32 165 116); color: wheat"
          >
            Update status
          </button>
        </b-col>

        <b-col cols="12" md="3">
          <b-form-group>
            <h5>Driver</h5>
            <v-select
              v-model="selectedDriver"
              label="title"
              :options="listDrivers"
            />
          </b-form-group>
        </b-col>
        <b-col
          cols="12"
          md="2"
          class="mb-1 ml-1"
          style="margin-top: 1.7rem !important"
        >
          <button
            @click="updateDriverBooking()"
            class="btn"
            style="background-color: rgb(181 46 108); color: wheat"
          >
            Assing driver
          </button>
        </b-col>
      </b-row>

       <br />
      <b-row>
        <b-col>
          <button
            @click="getPdfTicketDriverBinary()"
            class="btn"
            style="background-color: rgb(233 82 36); color: wheat"
          >
            PDF ticket driver
          </button>
          <button
            @click="sendMailPDFTicketDriver()"
            class="btn"
            style="
              background-color: rgb(233 82 36);
              color: wheat;
              margin-left: 10px;
            "
          >
            Mail the driver's ticket
          </button>
          <button
            @click="getPdfDetailBookingBinary()"
            class="btn"
            style="
              background-color: rgb(233 82 36);
              color: wheat;
              margin-left: 20px;
            "
          >
            PDF Details Booking
          </button>
          <button
            @click="sendMailPdfDetailBooking()"
            class="btn"
            style="
              background-color: rgb(233 82 36);
              color: wheat;
              margin-left: 10px;
            "
          >
            Mail booking details to the customer
          </button>
        </b-col>
      </b-row>
      <!--End Update status setion -->
    
    
      <br />
      <div style="overflow-x: scroll;">
        <table
        small
        caption-top
        responsive
        style="font-size: small;"
        id="table"
        class="table b-table"
      >
        <thead>
          <tr>
            <th>Actions</th>
            <th aria-sort="none"  @click="getItemsSort('id')"
              ><i class="fa fa-fw fa-sort"></i>Confirmation Number</th
            >
            <th style="min-width:275px">Customer</th>
            <th style="min-width:200px">Status</th>
            <th>Booking Category</th>
            <th style="min-width:200px">Appointment Datetime</th>
            <th
              aria-sort="none"
              class="headerth"
              @click="getItemsSort('garage_time')"
              style="min-width:200px"
              >Garage time</th
            >
            <th>Pick Up time</th>
            <th style="min-width:275px">Driver</th>
            <th>Vehicle Type</th>
            <th style="min-width:250px">Driver phone</th>
            <th style="min-width:200px">Customer Phone</th>
            <th style="min-width:400px">Pickup Address</th>
            <th style="min-width:400px">Drop Off Address</th>
            <th>Service Type</th>
            <th>Wait Time</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="item in listItems"
            :key="item.id"
            @click="getTicketData(item)"
          >
                  <!-- Start Actions  -->
                  <td>
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
                      class="font-weight-bold"
                      style="border: none; padding: 5px; color: #7367f0"
                      @click="openUpdateBooking(item.id)"
                    >
                      <feather-icon icon="CheckIcon" />
                      Edit
                    </b-list-group-item>
                  </b-list-group-item>
                </b-list-group>
                <b-list-group
                  style="padding: 2px; margin-bottom: 2px"
                  dense
                  rounded
                >
                  <router-link
                    class="urlPagina"
                    :to="{ name: 'details-booking', params: { id: item.id } }"
                  >
                    <b-list-group-item
                      style="padding: 0"
                      class="urlPagina"
                      :ripple="false"
                    >
                      <b-list-group-item
                        class="font-weight-bold"
                        style="border: none; padding: 5px"
                      >
                        <feather-icon icon="FileTextIcon" />
                        Details
                      </b-list-group-item>
                    </b-list-group-item>
                  </router-link>
                </b-list-group>
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
                      class="font-weight-bold"
                      style="border: none; padding: 5px; color: #7367f0"
                      v-b-modal.bv-modal-example
                      @click="setValuesForm(item)"
                    >
                      <feather-icon icon="CheckIcon" />
                      Add SMS Note
                    </b-list-group-item>
                  </b-list-group-item>
                </b-list-group>
                <b-list-group
                  style="padding: 2px; margin-bottom: 2px"
                  dense
                  rounded
                >
                  <router-link
                    name="timeline"
                    class="urlPagina"
                    :to="{
                      name: 'details-booking-notes',
                      params: { id: item.id },
                    }"
                  >
                    <b-list-group-item
                      style="padding: 0"
                      class="urlPagina"
                      :ripple="false"
                    >
                      <b-list-group-item
                        class="font-weight-bold"
                        style="border: none; padding: 5px"
                      >
                        <feather-icon icon="FileTextIcon" />
                        Notes
                      </b-list-group-item>
                    </b-list-group-item>
                  </router-link>
                </b-list-group>
                <b-list-group
                  v-if="item.status != 3"
                  style="padding: 2px; margin-bottom: 2px"
                  dense
                  rounded
                >
                  <b-list-group-item
                    style="padding: 0"
                    :id="'start' + item.id"
                    class="urlPagina"
                    :ripple="false"
                  >
                    <b-list-group-item
                      class="font-weight-bold btn-success"
                      style="border: none; padding: 5px; color: #7367f0"
                      @click="startTimer(item.id)"
                    >
                      <feather-icon icon="CheckIcon" />
                      Start Timer
                    </b-list-group-item>
                  </b-list-group-item>
                </b-list-group>
                <b-list-group
                  v-if="item.status != 3"
                  style="padding: 2px; margin-bottom: 2px"
                  dense
                  rounded
                >
                  <b-list-group-item
                    style="padding: 0; display: none"
                    :id="'stop' + item.id"
                    class="urlPagina"
                    :ripple="false"
                  >
                    <b-list-group-item
                      class="font-weight-bold btn-danger"
                      style="border: none; padding: 5px; color: #7367f0"
                      @click="stopTimer(item.id)"
                    >
                      <feather-icon icon="CheckIcon" />
                      Stop Timer
                    </b-list-group-item>
                  </b-list-group-item>
                </b-list-group>
                <b-list-group
                  v-if="item.status == 1"
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
                      class="font-weight-bold"
                      style="border: none; padding: 5px; color: #7367f0"
                      @click="sendConfirmation(item.id)"
                    >
                      <feather-icon icon="CheckIcon" />
                      Confirm
                    </b-list-group-item>
                  </b-list-group-item>
                </b-list-group>
                <b-list-group
                  v-if="item.status != 4 && item.status != 3"
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
                      style="border: none; padding: 5px; color: #7367f0"
                      @click="setValuesForm(item)"
                    >
                      <feather-icon icon="CheckIcon" />
                      Cancel
                    </b-list-group-item>
                  </b-list-group-item>
                </b-list-group>
              </b-dropdown>
            </td>
            <!-- End Actions  -->
            <td> {{ item.id }}</td>
            <td> {{ getSelfPayName(item) }}</td>
            <!-- Start Status  -->
            <td
              v-if="item.status == 0"
              style="background: #e89e15; color: white"
            >
              {{ item.status_code.status }}</td
            >
            <td
              v-if="item.status == 1"
              style="color: white; background: #5d1e76"
            >
              {{ item.status_code.status }}</td
            >
            <td
              v-if="item.status == 2"
              style="background: #a067a0; color: white"
            >
              {{ item.status_code.status }}</td
            >
            <td
              v-if="item.status == 3"
              style="background: #329432; color: white"
            >
              {{ item.status_code.status }}</td
            >
            <td v-if="item.status == 4" 
            style="background: #F9CFCF; color: crimson">
              {{ item.status_code.status }}</td
            >
            <td v-if="item.status == 5" style="background: #cdcdcd">
              {{ item.status_code.status }}</td
            >
            <td
              v-if="item.status == 6"
              style="background: #b0b02f; color: white"
            >
              {{ item.status_code.status }}</td
            >
            <td v-if="item.status == 7"
            style="background: #4B4B4B; color: white;">
              {{ item.status_code.status }}</td
            >
            <td
              v-if="item.status == 8"
              style="background: royalblue; color: white"
            >
              {{ item.status_code.status }}</td
            >
            <td v-if="item.status > 8"> {{ item.status_code.status }}</td>
            <!-- End Status  -->
            <td>{{ getTypeClient(item) }}</td>
            <td
              >{{ convertDate(item.appoinment_datetime) }}
              {{ convertTime(item.appoinment_datetime) }}
            </td>
            <td
              >{{ convertDate(item.garage_time) }}
              {{ convertTime(item.garage_time) }}
            </td>
            <td>{{ item.pickup_time }}</td>
            <td>{{ getDriverName(item) }}</td>
            <td>{{ getDriverVehicle(item) }}</td>
            <td>{{ getDriverPhone(item) }}</td>
            <td>{{ getSelfPhone(item) }}</td>
            <td>{{ getAddress(item.from).from }}</td>
            <td>{{ getAddress(item.to).to }}</td>
            <td>{{ getServiceType(item.service_type) }}</td>
            <td
              ><span class="" :id="'span' + item.id"
                ><span :id="'display' + item.id">{{
                  item.passenger_waiting_time_for_driver
                }}</span></span
              >
            </td>
            <!-- Start Actions  -->
            <td>
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
                      class="font-weight-bold"
                      style="border: none; padding: 5px; color: #7367f0"
                      @click="openUpdateBooking(item.id)"
                    >
                      <feather-icon icon="CheckIcon" />
                      Edit
                    </b-list-group-item>
                  </b-list-group-item>
                </b-list-group>
                <b-list-group
                  style="padding: 2px; margin-bottom: 2px"
                  dense
                  rounded
                >
                  <router-link
                    class="urlPagina"
                    :to="{ name: 'details-booking', params: { id: item.id } }"
                  >
                    <b-list-group-item
                      style="padding: 0"
                      class="urlPagina"
                      :ripple="false"
                    >
                      <b-list-group-item
                        class="font-weight-bold"
                        style="border: none; padding: 5px"
                      >
                        <feather-icon icon="FileTextIcon" />
                        Details
                      </b-list-group-item>
                    </b-list-group-item>
                  </router-link>
                </b-list-group>
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
                      class="font-weight-bold"
                      style="border: none; padding: 5px; color: #7367f0"
                      v-b-modal.bv-modal-example
                      @click="setValuesForm(item)"
                    >
                      <feather-icon icon="CheckIcon" />
                      Add Note
                    </b-list-group-item>
                  </b-list-group-item>
                </b-list-group>
                <b-list-group
                  style="padding: 2px; margin-bottom: 2px"
                  dense
                  rounded
                >
                  <router-link
                    name="timeline"
                    class="urlPagina"
                    :to="{
                      name: 'details-booking-notes',
                      params: { id: item.id },
                    }"
                  >
                    <b-list-group-item
                      style="padding: 0"
                      class="urlPagina"
                      :ripple="false"
                    >
                      <b-list-group-item
                        class="font-weight-bold"
                        style="border: none; padding: 5px"
                      >
                        <feather-icon icon="FileTextIcon" />
                        Notes
                      </b-list-group-item>
                    </b-list-group-item>
                  </router-link>
                </b-list-group>
                <b-list-group
                  v-if="item.status != 3"
                  style="padding: 2px; margin-bottom: 2px"
                  dense
                  rounded
                >
                  <b-list-group-item
                    style="padding: 0"
                    :id="'start' + item.id"
                    class="urlPagina"
                    :ripple="false"
                  >
                    <b-list-group-item
                      class="font-weight-bold btn-success"
                      style="border: none; padding: 5px; color: #7367f0"
                      @click="startTimer(item.id)"
                    >
                      <feather-icon icon="CheckIcon" />
                      Start Timer
                    </b-list-group-item>
                  </b-list-group-item>
                </b-list-group>
                <b-list-group
                  v-if="item.status != 3"
                  style="padding: 2px; margin-bottom: 2px"
                  dense
                  rounded
                >
                  <b-list-group-item
                    style="padding: 0; display: none"
                    :id="'stop' + item.id"
                    class="urlPagina"
                    :ripple="false"
                  >
                    <b-list-group-item
                      class="font-weight-bold btn-danger"
                      style="border: none; padding: 5px; color: #7367f0"
                      @click="stopTimer(item.id)"
                    >
                      <feather-icon icon="CheckIcon" />
                      Stop Timer
                    </b-list-group-item>
                  </b-list-group-item>
                </b-list-group>
                <b-list-group
                  v-if="item.status == 1"
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
                      class="font-weight-bold"
                      style="border: none; padding: 5px; color: #7367f0"
                      @click="sendConfirmation(item.id)"
                    >
                      <feather-icon icon="CheckIcon" />
                      Confirm
                    </b-list-group-item>
                  </b-list-group-item>
                </b-list-group>
                <b-list-group
                  v-if="item.status != 4 && item.status != 3"
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
                      style="border: none; padding: 5px; color: #7367f0"
                      @click="setValuesForm(item)"
                    >
                      <feather-icon icon="CheckIcon" />
                      Cancel
                    </b-list-group-item>
                  </b-list-group-item>
                </b-list-group>
              </b-dropdown>
            </td>
            <!-- End Actions  -->
          </tr>
        </tbody>
        <tbody>
          <tr>
            <td colspan="16" variant="secondary" class="text-left">
              Total Rows: <b>{{ totalItems }}</b>
            </td>
          </tr>
        </tbody>
      </table>
      </div>

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
    </div>
    <b-modal id="modal-center" centered hide-footer>
      <div class="d-block text-center">
        <h3>Write a reason to cancel the trip</h3>
        <b-col>
          <b-form-group>
            <b-form-input
              v-model="noteText"
              @mouseover="changeColor()"
              v-bind:class="{ 'border border-danger': isNoteText == false }"
            />
          </b-form-group>
        </b-col>
      </div>
      <b-row class="mt-3">
        <b-col>
          <b-button block @click="cancelBooking(currentId)">Save</b-button>
        </b-col>
        <b-col>
          <b-button block @click="$bvModal.hide('modal-center')"
            >Close</b-button
          >
        </b-col>
      </b-row>
    </b-modal>

    <b-modal id="bv-modal-example" centered hide-footer>
      <div class="d-block text-center">
        <h3>Write a Note</h3>
        <b-col>
          <b-form-group>
            <b-form-input
              v-model="messageText"
              @mouseover="changeColorMessage()"
              v-bind:class="{ 'border border-danger': isMessageText == false }"
            />
          </b-form-group>
        </b-col>
        <b-col>
          <b-form-group class="mb-1">
            <div style="display: flex; gap: 10px">
              <b-form-checkbox
                id="passanger"
                v-model="messageSendTo"
                name="passanger"
                value="passanger"
                unchecked-value=""
                class="col-5"
              >
                Send SMS note to Passenger
              </b-form-checkbox>
              <b-form-input
                v-model="currentAlternativeNumberPassenger"
                class="col-7"
                placeholder="Alternative Number"
              />
            </div>
          </b-form-group>
          <b-form-group class="mb-0">
            <div style="display: flex; gap: 10px">
              <b-form-checkbox
                class="col-5"
                id="driver"
                v-model="messageSendTo"
                name="driver"
                value="driver"
                unchecked-value=""
              >
                Send SMS note to Driver
              </b-form-checkbox>
              <b-form-input
                class="col-7"
                v-model="currentAlternativeNumberDriver"
                placeholder="Alternative Number"
              />
            </div>
          </b-form-group>
        </b-col>
      </div>
      <b-row class="mt-3">
        <b-col>
          <b-button block @click="saveNote(currentId)">Save</b-button>
        </b-col>
        <b-col>
          <b-button block @click="$bvModal.hide('bv-modal-example')"
            >Close</b-button
          >
        </b-col>
      </b-row>
    </b-modal>
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
} from "bootstrap-vue";
import vSelect from "vue-select";
import flatPickr from "vue-flatpickr-component";
import { getCentralTime, getMessageError } from "@core/utils/utils";
import { convertToMMDDYYYY, convertToHHMM } from "@core/utils/dates";
import UserListAddNew from "@core/components/infoClients/UserListAddNew";
import { selectedRow } from "@core/utils/cssStyle";
export default {
  name: "ListReservationToCancel",
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
  },
  data() {
    return {
      BFormInput: "",
      messageSendTo: [],
      isNoteText: true,
      noteText: "",
      isMessageText: true,
      messageText: "",
      currentId: "",
      status: "",
      currentAlternativeNumberDriver: "",
      currentAlternativeNumberPassenger: "",
      totalSeconds: [],
      timerInterval: [],
      hour: 0,
      sec: 0,
      min: 0,
      dispHour: 0,
      dispMin: 0,
      dispSec: 0,
      listItems: [],
      perPage: 10,
      currentPage: 1,
      totalItems: 0,
      pageOptions: [3, 5, 10],
      pagination: {},
      current_page: 1,
      last_page: 0,
      fields: [
        { label: "Customer", key: "name_selfpay", variant: "info" },
        { label: "Status", key: "status_code", tdClass: "myclass" },
        "pickup_time",
        "surgery_type",
        "appoinment_datetime",
        "city",
        "actions",
      ],
      selectedStatus: null,
      options: [
        { value: "4", title: "Cancelled" },
        { value: "1", title: "Cancellation pending" },
        { value: "3", title: "Completed" },
        { value: "7", title: "Enroute" },
        { value: "2", title: "One way" },
        { value: "5", title: "On board" },
        { value: "6", title: "At facility" },
        { value: "0", title: "Trip pending" },
      ],
      rangeDate: null,
      searchingText: "",
      ticketToUpdateNumber: 0,
      ticketToUpdateStatus: "",
      listDrivers: [],
      selectedDriver: null,
      columnOrder: null,
      typeOrder: null,
      orderDesc: false,
      isOrdering: false,
      documentHtml: "",
    };
  },
  methods: {
    async getPdfTicketDriverBinary() {
      let res = "";

      if (
        this.validateTicketNumber() == false ||
        this.validateDriver() == false
      ) {
        return false;
      }

      this.$swal({
        title: "Please, wait...",
        didOpen: () => {
          this.$swal.showLoading();
        },
      });

      await this.$http
        .get(`/get_pdf_ticket_driver_binary/${this.ticketToUpdateNumber}`, {
          responseType: "arraybuffer",
          headers: {
            Accept: "application/pdf",
          },
        })
        .then((response) => {
          const url = window.URL.createObjectURL(new Blob([response.data]));
          const link = document.createElement("a");
          link.href = url;
          link.setAttribute("download", "file.pdf"); //or any other extension
          document.body.appendChild(link);
          link.click();
          this.$swal.close();
        })
        .catch((error) => {
          this.$swal({
            title: getMessageError(error),
            icon: "error",
            customClass: {
              confirmButton: "btn btn-primary",
            },
            buttonsStyling: false,
          });
        });
      return res;
    },
    async getPdfDetailBookingBinary() {
      let res = "";

      if (this.validateTicketNumber() == false) {
        return false;
      }

      this.$swal({
        title: "Please, wait...",
        didOpen: () => {
          this.$swal.showLoading();
        },
      });

      await this.$http
        .get(`/get_pdf_deailst_booking_binary/${this.ticketToUpdateNumber}`, {
          responseType: "arraybuffer",
          headers: {
            Accept: "application/pdf",
          },
        })
        .then((response) => {
          const url = window.URL.createObjectURL(new Blob([response.data]));
          const link = document.createElement("a");
          link.href = url;
          link.setAttribute("download", "file.pdf"); //or any other extension
          document.body.appendChild(link);
          link.click();
          this.$swal.close();
        })
        .catch((error) => {
          this.$swal({
            title: getMessageError(error),
            icon: "error",
            customClass: {
              confirmButton: "btn btn-primary",
            },
            buttonsStyling: false,
          });
        });
      return res;
    },
    async sendMailPdfDetailBooking() {
      let res = "";

      if (this.validateTicketNumber() == false) {
        return false;
      }

      this.$swal({
        title: "Please, wait...",
        didOpen: () => {
          this.$swal.showLoading();
        },
      });

      await this.$http
        .get(`/send_mail_pdf_detailst_booking/${this.ticketToUpdateNumber}`)
        .then((response) => {
          this.$swal({
            title: response.data.data,
            customClass: {
              confirmButton: "btn btn-primary",
            },
            buttonsStyling: false,
          });
        })
        .catch((error) => {
          this.$swal({
            title: getMessageError(error),
            icon: "error",
            customClass: {
              confirmButton: "btn btn-primary",
            },
            buttonsStyling: false,
          });
        });
      return res;
    },
    async sendMailPDFTicketDriver() {
      let res = "";

      if (
        this.validateTicketNumber() == false ||
        this.validateDriver() == false
      ) {
        return false;
      }

      this.$swal({
        title: "Please, wait...",
        didOpen: () => {
          this.$swal.showLoading();
        },
      });

      await this.$http
        .get(`/send_mail_pdf_ticket_driver/${this.ticketToUpdateNumber}`)
        .then((response) => {
          this.$swal({
            title: response.data.data,
            customClass: {
              confirmButton: "btn btn-primary",
            },
            buttonsStyling: false,
          });
        })
        .catch((error) => {
          this.$swal({
            title: getMessageError(error),
            icon: "error",
            customClass: {
              confirmButton: "btn btn-primary",
            },
            buttonsStyling: false,
          });
        });
      return res;
    },
    validateTicketNumber() {
      if (this.ticketToUpdateNumber == 0) {
        this.$swal({
          title: "Must select a register from the table",
          icon: "info",
          customClass: {
            confirmButton: "btn btn-primary",
          },
          buttonsStyling: false,
        });
        return false;
      }
      return true;
    },
    validateDriver() {
      if (this.selectedDriver === null) {
        this.$swal({
          title: "This reservation has not driver",
          icon: "info",
          customClass: {
            confirmButton: "btn btn-primary",
          },
          buttonsStyling: false,
        });
        return false;
      }
      return true;
    },
    masterSearch(e) {
      if (e.keyCode == 13) {
        this.getClientesByFilter("");
      }
    },
    getBookings() {
      this.$http
        .post(`admin/panel/mastersearch/bookingList/` + this.searchingText)
        .then((response) => {
          this.listItems = response.data.data.data;
          this.totalItems = response.data.data.total;
          this.current_page = response.data.data.current_page;
          this.last_page = response.data.data.last_page;
          this.pagination = response.data.data;
        })
        .catch((res) => {
          console.log(res.data);
        });
    },
    // Convert time to a format of hours, minutes, seconds, and milliseconds
    getTime(id, sec, min, hour, dispSec, dispMin, dispHour) {
      this.timerInterval[id] = window.setInterval(function () {
        // console.log('this.timerInterval[id]: ',this.timerInterval[id])

        sec++;

        this.totalSeconds = sec;
        if (sec / 60 == 1) {
          min++;
          sec = 0;
          if (min / 60 == 1) {
            hour++;
            min = 0;
          }
        }
        if (sec < 10) {
          dispSec = "0" + sec.toString();
        } else {
          dispSec = sec.toString();
        }
        if (min < 10) {
          dispMin = "0" + min.toString();
        } else {
          dispMin = min.toString();
        }
        if (hour < 10) {
          dispHour = "0" + hour.toString();
        } else {
          dispHour = hour.toString();
        }
        var start = document.getElementById("start" + id);
        start.style.display = "none";
        var stop = document.getElementById("stop" + id);
        stop.style.display = "block";
        var span = document.getElementById("span" + id);
        span.classList.add("green_timer");
        document.getElementById("display" + id).innerHTML =
          dispHour + ":" + dispMin + ":" + dispSec;
      }, 1000);
    },
    startTimer(id) {
      this.$swal({
        title: "Please, wait...",
        didOpen: () => {
          this.$swal.showLoading();
        },
      });
      this.$http
        .get(`/admin/panel/booking/gettime/${id}`)
        .then((response) => {
          var array_wait_time =
            response.data.data.passenger_waiting_time_for_driver.split(":");
          var sec = array_wait_time[2].replace(/^0+/, "");
          var min = array_wait_time[1].replace(/^0+/, "");
          var hour = array_wait_time[0].replace(/^0+/, "");

          this.getTime(id, sec, min, hour, 0, 0, 0);
          this.$swal({
            title: "Timer Start",
            icon: "success",
            customClass: {
              confirmButton: "btn btn-primary",
            },
            buttonsStyling: false,
          });
        })
        .catch((error) => {
          this.$swal({
            title: getMessageError(error),
            icon: "error",
            customClass: {
              confirmButton: "btn btn-primary",
            },
            buttonsStyling: false,
          });
        });
    },

    stopTimer(id) {
      this.saveTime(id, document.getElementById("display" + id).innerHTML);
      if (this.timerInterval.length != 0) {
        clearInterval(this.timerInterval[id]);
      } else {
        var storedColors = JSON.parse(localStorage.getItem("timerIds"));
        clearInterval(storedColors[id]);
      }

      var span = document.getElementById("span" + id);
      span.classList.remove("green_timer");
      var start = document.getElementById("start" + id);
      start.style.display = "block";
      var stop = document.getElementById("stop" + id);
      stop.style.display = "none";
    },

    saveTime(id, w_time) {
      let formData = new FormData();

      formData.append("w_time", w_time);
      this.$swal({
        title: "Please, wait...",
        didOpen: () => {
          this.$swal.showLoading();
        },
      });
      this.$http
        .post(`/admin/panel/booking/savetime/${id}`, formData)
        .then((response) => {
          this.$swal({
            title: "Timer Stoped",
            icon: "success",
            customClass: {
              confirmButton: "btn btn-primary",
            },
            buttonsStyling: false,
          }).then((result) => {});
        })
        .catch((error) => {
          this.$swal({
            title: "error",
            icon: "error",
            customClass: {
              confirmButton: "btn btn-primary",
            },
            buttonsStyling: false,
          });
        });
    },
    convertDate(data) {
      return convertToMMDDYYYY(data);
    },
    convertTime(data) {
      return convertToHHMM(data);
    },
    getItems(url) {
      this.getClientesByFilter(url);
    },
    getClientes(url) {
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
    getClientesByFilter(url) {
      this.$swal({
        title: "Please, wait loading data...",
        didOpen: () => {
          this.$swal.showLoading();
        },
      });

      let data = this.getValuesParameters();

      if (url.length === 0) {
        url = `admin/panel/booking/get_booking_byFilter`;
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
    getClientesToCheckDbChange(url) {
      let data = this.getValuesParameters();

      if (url.length === 0) {
        url = `admin/panel/booking/get_booking_byFilter`;
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
        .catch((res) => {});
    },
    getValuesParameters() {
      let data = {};
      let dateStart = "";
      let dateEnd = "";
      let text = "";

      //Status variable filter
      let status = {};
      if (this.selectedStatus !== null) {
        status = this.selectedStatus.map((item) => {
          let value = item.value;
          return value;
        });
      }

      //Dates variables filter
      if (this.rangeDate !== null) {
        dateStart = this.rangeDate.split("to")[0];
        dateEnd = this.rangeDate.split("to")[1];
      }

      data = {
        status: status,
        dateStart: dateStart,
        dateEnd: dateEnd,
        text: this.searchingText,
        columnOrder: this.columnOrder,
        orderDesc: this.orderDesc,
      };

      return data;
    },
    deleteReservation(id) {
      this.$swal({
        title: "Please, wait...",
        didOpen: () => {
          this.$swal.showLoading();
        },
      });
      this.$http
        .post(`/admin/panel/booking/${id}/delete`)
        .then((res) => {
          this.$swal({
            title: res.data.message,
            icon: "success",
            customClass: {
              confirmButton: "btn btn-primary",
            },
            buttonsStyling: false,
          }).then((result) => {
            if (result.isConfirmed) {
              this.getClientesByFilter("");
            }
          });
        })
        .catch((error) => {
          this.$swal({
            title: getMessageError(error),
            icon: "error",
            customClass: {
              confirmButton: "btn btn-primary",
            },
            buttonsStyling: false,
          });
        });
    },
    setValuesForm(item) {
      this.currentId = item.id;
      this.status = item.status;
      this.messageText = "";
      this.currentAlternativeNumberDriver =
        item.alternative_number_driver == null
          ? ""
          : item.alternative_number_driver;
      this.currentAlternativeNumberPassenger =
        item.alternative_number_passenger == null
          ? ""
          : item.alternative_number_passenger;
    },
    changeColor() {
      this.isNoteText = true;
    },
    changeColorMessage() {
      this.isMessageText = true;
    },
    saveNote(id) {
      if (this.messageText === "") {
        this.isMessageText = false;
      } else {
        this.$bvModal.hide("bv-modal-example");

        this.$swal({
          title: "Please, wait...",
          didOpen: () => {
            this.$swal.showLoading();
          },
        });
        let formData = new FormData();
        formData.append("text", this.messageText);
        formData.append("status", this.status);
        formData.append("messageSendTo", this.messageSendTo);
        formData.append(
          "alternative_number_driver",
          this.currentAlternativeNumberDriver
        );
        formData.append(
          "alternative_number_passenger",
          this.currentAlternativeNumberPassenger
        );
        this.$http
          .post(`/admin/panel/booking/${id}/saveBookingNote`, formData)
          .then((res) => {
            console.log("1");
            this.$swal({
              title: res.data.message,
              icon: "success",
              customClass: {
                confirmButton: "btn btn-primary",
              },
              buttonsStyling: false,
            }).then((result) => {
              console.log("2");
              if (result.isConfirmed) {
                console.log("3");
                this.getClientesByFilter("");
              }
            });
          })
          .catch((error) => {
            this.$swal({
              title: getMessageError(error),
              icon: "error",
              customClass: {
                confirmButton: "btn btn-primary",
              },
              buttonsStyling: false,
            });
          });
      }
    },
    cancelBooking(id) {
      if (this.noteText === "") {
        this.isNoteText = false;
      } else {
        this.$bvModal.hide("modal-center");

        this.$swal({
          title: "Please, wait...",
          didOpen: () => {
            this.$swal.showLoading();
          },
        });
        let formData = new FormData();
        formData.append("text", this.noteText);
        this.$http
          .post(`/admin/panel/booking/${id}/cancelBooking`, formData)
          .then((res) => {
            this.$swal({
              title: res.data.message,
              icon: "success",
              customClass: {
                confirmButton: "btn btn-primary",
              },
              buttonsStyling: false,
            }).then((result) => {
              if (result.isConfirmed) {
                this.getClientesByFilter("");
              }
            });
          })
          .catch((error) => {
            this.$swal({
              title: getMessageError(error),
              icon: "error",
              customClass: {
                confirmButton: "btn btn-primary",
              },
              buttonsStyling: false,
            });
          });
      }
    },
    sendConfirmation(id) {
      this.$swal({
        title: "Please, wait...",
        didOpen: () => {
          this.$swal.showLoading();
        },
      });
      this.$http
        .post(`/admin/panel/booking/${id}/cancel`)
        .then((response) => {
          this.$swal({
            title: response.data.data,
            icon: "success",
            customClass: {
              confirmButton: "btn btn-primary",
            },
            buttonsStyling: false,
          }).then((result) => {
            if (result.isConfirmed) {
              this.getClientesByFilter("");
            }
          });
        })
        .catch((error) => {
          this.$swal({
            title: "Your reservation has already cancelled",
            icon: "error",
            customClass: {
              confirmButton: "btn btn-primary",
            },
            buttonsStyling: false,
          });
        });
    },
    getDriverName(item) {
      let res = "";
      if (item.driver) {
        res = `${item.driver.name} ${item.driver.lastname}`;
      }
      return res;
    },
    getDriverId(item) {
      let res = "";
      if (item.driver) {
        res = item.driver.driver_id;
      } else {
        res = null;
      }
      return res;
    },
    getAddress(item) {
      let res = "";

      if (item) {
        res = JSON.parse(item);
      }
      return res;
    },
    getDriverPhone(item) {
      let res = "";
      if (item.driver) {
        res = item.driver.phone_number;
        res = res == "null" ? "" : res;
      }
      return res;
    },
    getDriverVehicle(item) {
      let res = "";
      try {
        if (item.driver) {
          if (item.driver.vehicle) {
            res = item.driver.vehicle.vehicle_type;
            res = res == null ? "" : res.toUpperCase();
          }
        }
      } catch (error) {
        console.log(error);
      }
      return res;
    },
    getSelfPayName(item) {
      let res = "";
      if (item.self_pay) {
        res = item.self_pay.name + " " + item.self_pay.lastname;
      }
      return res;
    },
    getSelfPhone(item) {
      let res = "";
      if (item.self_pay) {
        res = item.self_pay.phone_number;
        res = res == "null" ? "" : res;
      }
      return res;
    },
    getTypeClient(item) {
      let res = "";
      if (item.self_pay) {
        res = item.self_pay.corporate_account === null ? "Selfpay" : "CA";
      }
      return res;
    },
    getServiceType(item) {
      let res = item;
      try {
        if (item) {
          res = res == null ? "" : res.toUpperCase();
        }
      } catch (error) {
        console.log(error);
      }
      return res;
    },
    getTicketData(item) {
      if (item.id === this.ticketToUpdateNumber) {
        this.ticketToUpdateNumber = null;
        this.ticketToUpdateStatus = null;
        this.selectedDriver = null;
        return false;
      }

      this.ticketToUpdateNumber = item.id;
      this.ticketToUpdateStatus = this.options.filter(
        (x) => x.value == item.status
      );
      let driverName = this.getDriverName(item);
      let driver_id = this.getDriverId(item);

      let data = {
        value: driver_id,
        title: driverName,
      };
      this.selectedDriver = data.value == null ? null : data;
    },
    updateStatusBooking() {
      // Validations form
      if (this.ticketToUpdateNumber == 0) {
        return false;
      }
      if (this.ticketToUpdateStatus.value === undefined) {
        return false;
      }

      let formData = new FormData();
      formData.append("status", this.ticketToUpdateStatus.value);
      this.$swal({
        title: "Please, wait updating...",
        didOpen: () => {
          this.$swal.showLoading();
        },
      });
      this.$http
        .post(
          `/admin/panel/booking/${this.ticketToUpdateNumber}/modify_booking_status`,
          formData
        )
        .then((response) => {
          this.getClientesByFilter("");
        })
        .catch((error) => {
          this.$swal({
            title: getMessageError(error),
            icon: "error",
            customClass: {
              confirmButton: "btn btn-primary",
            },
            buttonsStyling: false,
          });
        });
    },
    updateDriverBooking() {
      if (this.validateData() == false) {
        return false;
      }
      this.$swal({
        title: "Please, wait...",
        didOpen: () => {
          this.$swal.showLoading();
        },
      });
      this.$http
        .post(
          `admin/panel/booking/${this.ticketToUpdateNumber}/edit_driver/${this.selectedDriver.value}`
        )
        .then((response) => {
          this.$swal({
            title: response.data.message,
            icon: "success",
            customClass: {
              confirmButton: "btn btn-primary",
            },
            buttonsStyling: false,
          });
          this.getClientesByFilter("");
        })
        .catch((error) => {
          this.$swal({
            title: getMessageError(error),
            icon: "error",
            customClass: {
              confirmButton: "btn btn-primary",
            },
            buttonsStyling: false,
          });
        });
    },
    validateData() {
      let res = false;
      if (this.ticketToUpdateNumber == 0) {
        this.$swal({
          title: "Must select a register from the table",
          icon: "info",
          customClass: {
            confirmButton: "btn btn-primary",
          },
          buttonsStyling: false,
        });
        return false;
      }
      console.log(this.selectedDriver);
      if (this.selectedDriver == null) {
        this.$swal({
          title: "Must select a driver",
          icon: "info",
          customClass: {
            confirmButton: "btn btn-primary",
          },
          buttonsStyling: false,
        });
        return false;
      }
    },
    openUpdateBooking(id) {
      this.$router.push({
        name: "details-reservation",
        params: { id: id },
      });
    },
    getDrivers() {
      this.$http
        .get(`admin/panel/driver/list?availability=1`)
        .then((response) => {
          this.loadMenuDrivers(response.data.data);
        })
        .catch((res) => console.log(res.data));
    },
    loadMenuDrivers(items) {
      items.forEach((element) => {
        let data = {
          value: element.driver_id,
          title: `${element.name} ${element.lastname}`,
        };
        this.listDrivers.push(data);
      });
    },
    getItemsSort(column) {
      if (this.isOrdering == false) {
        this.orderDesc = this.orderDesc == null ? true : !this.orderDesc;
        this.columnOrder = column;
        this.getClientesByFilter("");
      }
    },
    selectedRow() {
      var index,
        table = document.getElementById("table");

      for (var i = 1; i < table.rows.length; i++) {
        table.rows[i].classList.remove("selected");
        table.rows[i].onclick = function () {
          // remove the background from the previous selected row
          if (typeof index !== "undefined") {
            table.rows[index].classList.toggle("selected");
          }
          console.log(typeof index);
          // get the selected row index
          index = this.rowIndex;
          // add class selected to the row
          this.classList.toggle("selected");
          console.log(typeof index);
        };
      }
    },
  },
  mounted() {
    console.log("mounted");
    this.getClientesByFilter("");
    this.getDrivers();

    // this.getPdfTicketDriverBinary();
  },
  beforeDestroy() {
    if (this.timerInterval.length != 0) {
      localStorage.setItem("timerIds", JSON.stringify(this.timerInterval)); //store colors
    }
  },
  updated() {
      selectedRow()
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
.table-responsive {
  overflow-x: clip !important;
}
.headerth {
  cursor: pointer;
}
.highlighted {
  background: red;
}

tr {
  cursor: pointer;
  padding: 0;
}

th {
  background: #4b4b4b  !important;
    color: white  !important;
    text-transform: uppercase; 

}
td {
  padding: 0;
}

.table td, .table th {
    padding: 3px;
}

</style>
  
<style lang="scss">
@import "@core/scss/vue/libs/vue-select.scss";
@import "@core/scss/vue/libs/vue-flatpicker.scss";
</style>
