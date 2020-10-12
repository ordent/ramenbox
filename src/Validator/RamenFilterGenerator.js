"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// 'use strict'
// const _ = require('lodash')
const lodash_1 = require("lodash");
const ModelFilter = use("ModelFilter");
const QueryResolver = require("@ordentco/ramenbox/src/Validator/RamenQueryResolver");
exports.RamenFilterGenerator = (properties, relation) => {
  const result = class RamenFilter extends ModelFilter {
    static get dropId() {
      return false;
    }
	};
	const arrRelation = []
  relation.forEach((elem) => {
		arrRelation.push(Object.keys(elem)[0])
	})
	properties = properties.concat(arrRelation)
  properties.forEach((element) => {
    result.prototype[lodash_1.camelCase(element)] = function (value) {
			if (arrRelation.includes(element)) {
				return QueryResolver.resolveQueryRelations(this['$query'], element, value)
			}
			return QueryResolver.resolveOperator(this['$query'], element, value)
    };
	});
	
  relation.forEach((element) => {
    result.prototype[lodash_1.camelCase(element)] = function (value) {
			console.log(element)
      if (/\^+\w*/.test(value)) {
				//RELATION
				const relat = value.match(/\w+(?=^)/);
        return this.where(element, "<", value.replace(/^\</, ""));
      } 
    };
	});
	
  return result;
};
