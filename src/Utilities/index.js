"use strict";

const _ = require("lodash");

Object.defineProperty(exports, "__esModule", { value: true });
exports.requestBody = (request) => {
  const result = Object.assign({}, request.all(), request.files());
  if (result.with) {
    delete result.with;
  }
  return result;
};
exports.capitalize = (s) => {
  return s.charAt(0).toUpperCase() + s.slice(1);
};
exports.capitalFirst = (s) => {
  return _.upperFirst(s);
};
exports.requestProperties = (request, properties) => {
  const result = {};
  properties.forEach((element) => {
    if (request[element] !== undefined) {
      result[element] = request[element];
    }
  });
  return result;
};
