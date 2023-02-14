import Vue from 'vue'

// axios
import axios from 'axios'

const axiosIns = axios.create({
 baseURL: 'https://ameraapi.vnddev.com/public/api/v1/'
//baseURL: 'http://127.0.0.1:8000/api/v1/'
 //  baseURL: 'https://api.myamera.com/api/v1/'
})

axiosIns.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';

Vue.prototype.$http = axiosIns

export default axiosIns