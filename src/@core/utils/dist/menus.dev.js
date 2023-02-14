"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getMenuServiceType = exports.getMenuTimeZones = exports.getMenuPickupOnTime = exports.getMenuYesNo = exports.getMenuOptionsServiceType = exports.getMenuOptionsSurgeryOptions = exports.getMenuOptionsTripType = void 0;

var getMenuOptionsTripType = function getMenuOptionsTripType(data) {
  return [{
    title: 'One way',
    value: 'oneway'
  }, {
    title: 'Roundtrip',
    value: 'roundtrip'
  }];
};

exports.getMenuOptionsTripType = getMenuOptionsTripType;

var getMenuOptionsSurgeryOptions = function getMenuOptionsSurgeryOptions(data) {
  return [{
    value: 'colonoscopy',
    title: 'Colonoscopy'
  }, {
    value: 'cataract',
    title: 'Cataract surgery'
  }, {
    value: 'endoscopy',
    title: 'Endoscopy'
  }, {
    value: 'dentalsurgery',
    title: 'Dental Surgery'
  }, {
    value: 'cosmeticsurgery',
    title: 'Cosmetic Surgery'
  }, {
    value: 'carpaltunnel',
    title: 'Carpal Tunnel'
  }, {
    value: 'surgery',
    title: 'Surgery'
  }, {
    value: 'paininjections',
    title: 'Pain Injections'
  }, {
    value: 'biopsies',
    title: 'Biopsies'
  }, {
    value: 'laparoscopic',
    title: 'Laparoscopic'
  }, {
    value: 'sinus',
    title: 'Sinus'
  }, {
    value: 'reconstruction',
    title: 'Reconstruction'
  }, {
    value: 'shoulderprocedures',
    title: 'Shoulder Procedures'
  }, {
    value: 'rology',
    title: 'Urology'
  }, {
    value: 'softtissuerepair',
    title: 'Soft tissue repair'
  }, {
    value: 'notdisclose',
    title: 'Prefer not to disclose'
  }, {
    value: 'doctorsconsultation',
    title: "Doctors' consultation"
  }, {
    value: 'hospital',
    title: 'Hospital'
  }];
};

exports.getMenuOptionsSurgeryOptions = getMenuOptionsSurgeryOptions;

var getMenuOptionsServiceType = function getMenuOptionsServiceType(data) {
  return [{
    value: 'sedan',
    title: 'Sedan'
  }, {
    value: 'wheelchairvan',
    title: 'Wheelchair Van'
  }, {
    value: 'gurneygan',
    title: 'Gurney Van'
  }, {
    value: 'bls',
    title: 'BLS '
  }];
};

exports.getMenuOptionsServiceType = getMenuOptionsServiceType;

var getMenuYesNo = function getMenuYesNo(data) {
  return [{
    value: 0,
    title: 'No'
  }, {
    value: 1,
    title: 'Yes'
  }];
};

exports.getMenuYesNo = getMenuYesNo;

var getMenuPickupOnTime = function getMenuPickupOnTime(data) {
  return [{
    value: 0,
    title: 'I prefer to call Amera when ready'
  }, {
    value: 1,
    title: 'Amera will pick me up at specified time'
  }];
};

exports.getMenuPickupOnTime = getMenuPickupOnTime;

var getMenuTimeZones = function getMenuTimeZones(data) {
  return [{
    title: 'Eastern Time',
    value: 'America/New_York'
  }, {
    title: 'Central Time',
    value: 'America/Chicago'
  }, {
    title: 'Mountain Time',
    value: 'America/Denver'
  }, {
    title: 'Mountain Time(no DST)',
    value: 'America/Phoenix'
  }, {
    title: 'Pacific Time',
    value: 'America/Los_Angeles'
  }, {
    title: 'Alaska Time',
    value: 'America/Anchorage'
  }, {
    title: 'Hawaii-Aleutian',
    value: 'America/Adak'
  }, {
    title: 'Hawaii-Aleutian Time(no DST)',
    value: 'Pacific/Honolulu'
  }];
};

exports.getMenuTimeZones = getMenuTimeZones;

var getMenuServiceType = function getMenuServiceType(data) {
  return [{
    value: "sedan",
    title: "SEDAN"
  }, {
    value: "wc",
    title: "W/C"
  }, {
    value: "bls",
    title: "BLS"
  }, {
    value: "gurneyvan",
    title: "GURNEY VAN"
  }];
};

exports.getMenuServiceType = getMenuServiceType;