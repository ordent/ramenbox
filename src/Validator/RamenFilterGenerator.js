"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// 'use strict'
// const _ = require('lodash')
const lodash_1 = require("lodash");
const ModelFilter = use("ModelFilter");
exports.RamenFilterGenerator = (properties) => {
  const result = class RamenFilter extends ModelFilter {
    static get dropId() {
      return false;
    }
  };
  properties.forEach((element) => {
    result.prototype[lodash_1.camelCase(element)] = function (value) {
      if (/^\[+\w*/.test(value) && /\w*\]$/.test(value)) {
        return this.whereIn(element,  JSON.parse(value));
      } else if (/^\$+\w*/.test(value)) {
        // LIKE
        return this.where(element, "LIKE", `%${value.replace(/^\$/, "")}%`);
      } else if (/^\>=+\w*/.test(value)) {
        return this.where(element, ">=", value.replace(/^\>=/, ""));
      } else if (/^\>+\w*/.test(value)) {
        return this.where(element, ">", value.replace(/^\>/, ""));
      } else if (/^\<=+\w*/.test(value)) {
        return this.where(element, "<=", value.replace(/^\<=/, ""));
      } else if (/^\<+\w*/.test(value)) {
        return this.where(element, "<", value.replace(/^\</, ""));
      } else if (/^\|+\w*/.test(value)) {
        // RANGE
        const start = value.match(/\w+(?=,)/);
        const end = value.match(/\w+(?=$)/);
        return this.whereBetween(element, [start[0], end[0]]);
      } else if (/^\!+\w*/.test(value)) {
        // NOT
        return this.whereNot(element, value.replace(/^\!/, ""));
      } else {
        // WHERE
        return this.where(element, value);
      }
    };
  });
  return result;
};
