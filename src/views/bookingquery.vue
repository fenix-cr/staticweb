<template>
  <div >
    <!-- form corporate -->
    <b-form>
      <b-row>
        <!-- Field: Email -->
        <b-col
            cols="12"
            md="3"
        >
          <b-form-group
              label="Description"
          >
           
           
          </b-form-group>
         
        </b-col>
      </b-row>
    </b-form>
   <b-button
          
            @click="getViewAdditionalServices"
        >
          <span class="d-none d-sm-inline">Edit</span>
          <feather-icon
              icon="EditIcon"
              class="d-inline d-sm-none"
          />
        </b-button>

  
  </div>
</template>

<script>
import {
  BButton,
  BMedia,
  BAvatar,
  BRow,
  BCol,
  BFormGroup,
  BFormInput,
  BFormTextarea,
  BForm,
  BTable,
  BCard,
  BCardHeader,
  BCardTitle,
  BFormCheckbox,
  BFormSelect,
  VBTooltip,
} from 'bootstrap-vue'
import vSelect from 'vue-select'
// import {mapGetters} from 'vuex'

export default {
  name: 'DetailsInfoPaymentBooking',
  components: {
    BButton,
    BMedia,
    BAvatar,
    BRow,
    BCol,
    BFormGroup,
    BFormInput,
    BFormTextarea,
    BForm,
    BTable,
    BCard,
    BCardHeader,
    BCardTitle,
    BFormCheckbox,
    BFormSelect,
    vSelect,
  },
  
  methods: {
     async formRequest() {
      this.$swal({
        title: 'Please, wait...',
        didOpen: () => {
          this.$swal.showLoading()
        }
      })    
    },
    getViewAdditionalServices() {
alert('...');
        let view = this.$http.get(`/client/booking/91/services/view`)
        console.log(view);
    }
  },
  created() {
    this.getViewAdditionalServices()
  }

}
</script>

