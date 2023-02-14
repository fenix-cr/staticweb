<template>
    <div>
    <div class="d-flex">
      <feather-icon icon="UserIcon" size="19" />
      <h4 class="mb-0 ml-50">
        Notes
      </h4>
    </div>
    <b-form class="mt-1">
    <b-row>
        <b-col cols="12" md="6" lg="4">
        <b-form-group label="Enter Note">
            <b-form-input v-model="noteData.note" />
        </b-form-group>
        </b-col>
    </b-row>
    <b-button class="btn btn-primary" @click="SaveNote()" >
   Save
    </b-button>
</b-form>
<div class="d-flex mt-4">
     
      <h4 class="mb-2 ml-50">
        Notes Details
      </h4>
    </div>
    
    <table class="table">
  <thead>
    <tr>
      <th scope="col">User Name</th>
      <th scope="col">Detail</th>
      <th scope="col">Date</th>
    </tr>
  </thead>
  <tbody>
    <tr v-for="note in userData.notes">
      <td>{{note.user_name}}</td>
      <td>{{note.note}}</td>
      <td>{{note.created_at}}</td>
    </tr>
  </tbody>
</table>
    </div>
  </template>
  
  <script>
import {
  BRow,
  BCol,
  BForm,
  BFormGroup,
  BFormInput,
  BButton,
  BInputGroup,
  BInputGroupPrepend,
  BFormSelect
} from "bootstrap-vue";
import Stripe from "stripe";
import infocontact from "@/navigation/vertical/infocontact";
import { mapGetters } from "vuex";
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
  computed: {
    ...mapGetters({
      userData: "Users/usersData"
    }),
    cdate: function() {
        var date = new Date(this.userData.amera_user.created_at);
    var month;
    if(date.getMonth()+1 < 10){
        month = '0'+(date.getMonth()+1);
        }
    else{
        month = date.getMonth()+1;
    }
    return this.cdate = (month)+"/"+date.getDate()+"/"+date.getFullYear()
    }
  },

  data() {
    return {
        noteData:{
            note:'',
            is_auto:0,
            id:''
        }
        
    };
  },
  methods: {
    SaveNote(){
       if(this.noteData.note != ''){
        this.noteData.id = this.userData.id
        this.formSubmitted() 
       }
  },

  formSubmitted() {
      this.$swal({
        title: 'Please, wait...',
        didOpen: () => {
          this.$swal.showLoading()
        },
      })

    

      this.$http.post('auth/ca/note', this.noteData)
          .then((res) => {
            if (res.data.status === 200) {
              this.userData.notes.splice(0, 0, {'user_name':res.data.data.user_name,'note':res.data.data.note,'created_at':res.data.data.created_at});
              this.$swal({
                title: 'New Note Added',
                icon: 'success',
                customClass: {
                  confirmButton: 'btn btn-primary',
                },
                buttonsStyling: false,
              }).then((result) => {
                this.noteData.note = ''
              })


            
            } else {
              this.$swal({
                title: res.data.message,
                icon: 'error',
                customClass: {
                  confirmButton: 'btn btn-primary',
                },
                buttonsStyling: false,
              })

              // console.log(res.data.data)
            }
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
    ,

},
mounted(){

}
};
</script>
  
  <style>
</style>
  