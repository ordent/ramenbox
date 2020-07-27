"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const lodash_1 = require("lodash");
const lodash_inflection_1 = require("lodash-inflection");
const RamenTransformerGenerator_1 = require("../Transformer/RamenTransformerGenerator");
const RamenFilterGenerator_1 = require("./../Validator/RamenFilterGenerator");
const Model = use("Model");
class RamenModel extends Model {
  constructor() {
    super();
  }
  static boot() {
    super.boot();
    this.addTrait(
      "@provider:Filterable",
      RamenFilterGenerator_1.RamenFilterGenerator(this.properties)
    );
  }
  static get slug() {
    return null;
  }
  static get properties() {
    return [];
  }
  static get files() {
    return {};
  }
  static get rules() {
    return {};
  }
  static get relations() {
    return [];
  }
  static get transformers() {
    return RamenTransformerGenerator_1.RamenTransformerGenerator(this);
  }
  static get getIncludeRelations() {
    return this.relations.map((element) => {
      return `include${lodash_1.capitalize(
        lodash_inflection_1.pluralize(Object.keys(element).pop())
      )}`;
    });
  }
  static get getAvailableInclude() {
    return this.relations.map((element) => {
      return `${Object.keys(element).pop()}`;
    });
  }
  static get getDefaultInclude() {
    const result = [];
    this.relations.forEach((element) => {
      if (`${Object.values(element).pop()}` === "default") {
        result.push(`${Object.keys(element).pop()}`);
      }
    });
    return result;
  }
}
exports.RamenModel = RamenModel;
