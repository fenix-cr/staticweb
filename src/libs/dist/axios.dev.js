"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _vue = _interopRequireDefault(require("vue"));

var _axios = _interopRequireDefault(require("axios"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

// axios
var axiosIns = _axios["default"].create({
  //baseURL: 'https://ameraapi.vnddev.com/public/api/v1/'
  //baseURL: 'http://127.0.0.1:8000/api/v1/'
  baseURL: 'https://api.myamera.com/api/v1/'
});

axiosIns.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';
_vue["default"].prototype.$http = axiosIns;
var _default = axiosIns;
exports["default"] = _default;