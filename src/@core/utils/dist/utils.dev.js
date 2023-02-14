"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getCentralTime = exports.getDiferenceTimeZones = exports.convertTZ = exports.getMessageError = exports.useRouter = exports.isDynamicRouteActive = exports.getRandomBsVariant = exports.isToday = exports.isObject = void 0;

var _router = _interopRequireDefault(require("@/router"));

var _compositionApi = require("@vue/composition-api");

var _moment = _interopRequireDefault(require("moment"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

var isObject = function isObject(obj) {
  return _typeof(obj) === 'object' && obj !== null;
};

exports.isObject = isObject;

var isToday = function isToday(date) {
  var today = new Date();
  return (
    /* eslint-disable operator-linebreak */
    date.getDate() === today.getDate() && date.getMonth() === today.getMonth() && date.getFullYear() === today.getFullYear()
    /* eslint-enable */

  );
};

exports.isToday = isToday;

var getRandomFromArray = function getRandomFromArray(array) {
  return array[Math.floor(Math.random() * array.length)];
}; // ? Light and Dark variant is not included
// prettier-ignore


var getRandomBsVariant = function getRandomBsVariant() {
  return getRandomFromArray(['primary', 'secondary', 'success', 'warning', 'danger', 'info']);
};

exports.getRandomBsVariant = getRandomBsVariant;

var isDynamicRouteActive = function isDynamicRouteActive(route) {
  var _router$resolve = _router["default"].resolve(route),
      resolvedRoute = _router$resolve.route;

  return resolvedRoute.path === _router["default"].currentRoute.path;
}; // Thanks: https://medium.com/better-programming/reactive-vue-routes-with-the-composition-api-18c1abd878d1


exports.isDynamicRouteActive = isDynamicRouteActive;

var useRouter = function useRouter() {
  var vm = (0, _compositionApi.getCurrentInstance)().proxy;
  var state = (0, _compositionApi.reactive)({
    route: vm.$route
  });
  (0, _compositionApi.watch)(function () {
    return vm.$route;
  }, function (r) {
    state.route = r;
  });
  return _objectSpread({}, (0, _compositionApi.toRefs)(state), {
    router: vm.$router
  });
};

exports.useRouter = useRouter;

var getMessageError = function getMessageError(error) {
  var message = "";

  try {
    message = error.response.data.data !== undefined ? error.response.data.data : error.response.data.message;

    if (message !== '' && message !== undefined) {
      console.error(message);
      return message;
    }
  } catch (err) {}

  try {
    message = error.message;
    console.error(message);
    return message;
  } catch (err) {}

  try {
    message = error.data.exception;
    console.error(message);
    return message;
  } catch (err) {}

  return message;
};

exports.getMessageError = getMessageError;

var convertTZ = function convertTZ(date, tzString) {
  var data = new Date((typeof date === "string" ? new Date(date) : date).toLocaleString("en-US", {
    timeZone: tzString
  }));
  return data;
};

exports.convertTZ = convertTZ;

var getDiferenceTimeZones = function getDiferenceTimeZones(tzStringCentral, tzStringPlace, placeTime, formatDate) {
  var res = "";

  try {
    var currentPlaceTimeZone = convertTZ("2012/04/20 10:00:00", tzStringPlace);
    var centralTimeZone = convertTZ("2012/04/20 10:00:00", tzStringCentral);
    currentPlaceTimeZone = (0, _moment["default"])(currentPlaceTimeZone);
    centralTimeZone = (0, _moment["default"])(centralTimeZone);
    console.log("currentPlaceTimeZone");
    console.log(currentPlaceTimeZone);
    console.log("centralTimeZone");
    console.log(centralTimeZone); //let diff = currentPlaceTimeZone.diff(centralTimeZone,'hours');

    var diff = centralTimeZone.diff(currentPlaceTimeZone, 'hours');
    console.log("diff");
    console.log(diff);
    placeTime = (0, _moment["default"])(placeTime);

    if (diff < 0) {
      var value = Math.abs(diff);
      placeTime = placeTime.subtract(value, 'hours');
    }

    if (diff > 0) {
      placeTime = placeTime.add(diff, 'hours');
    }

    res = placeTime.format(formatDate);
  } catch (error) {
    console.error(error);
  }

  return res;
};

exports.getDiferenceTimeZones = getDiferenceTimeZones;

var getCentralTime = function getCentralTime(item, formatTime) {
  var res = "";

  if (item.time_zone) {
    res = getDiferenceTimeZones('America/Chicago', item.time_zone, item.appoinment_datetime, formatTime);
  }

  return res;
};
/**
 * This is just enhancement over Object.extend [Gives deep extend]
 * @param {target} a Object which contains values to be overridden
 * @param {source} b Object which contains values to override
 */
// export const objectExtend = (a, b) => {
//   // Don't touch 'null' or 'undefined' objects.
//   if (a == null || b == null) {
//     return a
//   }
//   Object.keys(b).forEach(key => {
//     if (Object.prototype.toString.call(b[key]) === '[object Object]') {
//       if (Object.prototype.toString.call(a[key]) !== '[object Object]') {
//         // eslint-disable-next-line no-param-reassign
//         a[key] = b[key]
//       } else {
//         // eslint-disable-next-line no-param-reassign
//         a[key] = objectExtend(a[key], b[key])
//       }
//     } else {
//       // eslint-disable-next-line no-param-reassign
//       a[key] = b[key]
//     }
//   })
//   return a
// }


exports.getCentralTime = getCentralTime;