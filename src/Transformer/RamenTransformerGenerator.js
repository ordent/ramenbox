"use strict";
var __awaiter =
  (this && this.__awaiter) ||
  function (thisArg, _arguments, P, generator) {
    function adopt(value) {
      return value instanceof P
        ? value
        : new P(function (resolve) {
            resolve(value);
          });
    }
    return new (P || (P = Promise))(function (resolve, reject) {
      function fulfilled(value) {
        try {
          step(generator.next(value));
        } catch (e) {
          reject(e);
        }
      }
      function rejected(value) {
        try {
          step(generator["throw"](value));
        } catch (e) {
          reject(e);
        }
      }
      function step(result) {
        result.done
          ? resolve(result.value)
          : adopt(result.value).then(fulfilled, rejected);
      }
      step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
  };
Object.defineProperty(exports, "__esModule", { value: true });
const TransformerAbstract = use("Bumblebee/Transformer");
const fold_1 = require("@adonisjs/fold");
const lodash_1 = require("lodash");
const lodash_inflection_1 = require("lodash-inflection");
const PlainSerializer = require("adonis-bumblebee/src/Bumblebee/Serializers/PlainSerializer");
const DataSerializer = require("adonis-bumblebee/src/Bumblebee/Serializers/DataSerializer");
const Utilities_1 = require("../Utilities");
const isJSON = (str) => {
  return !lodash_1.isError(lodash_1.attempt(JSON.parse, str));
};
exports.RamenTransformerGenerator = (m, n = []) => {
  // mixin(require('lodash-inflection'))
  const result = class RamenTransformer extends TransformerAbstract {
    static get defaultInclude() {
      return m.getDefaultInclude;
    }
    static get availableInclude() {
      return m.getAvailableInclude;
    }
    transform(model) {
      return __awaiter(this, void 0, void 0, function* () {
        const result = {};
        const item = model.toJSON();
        if (m.properties) {
          const properties = m.computed
            ? lodash_1.difference(m.properties.concat(m.computed), m.hidden)
            : lodash_1.difference(m.properties, m.hidden);
          for (const element of properties) {
            if (isJSON(item[element])) {
              result[element] = JSON.parse(item[element]);
            } else {
              result[element] =
                item[element] === undefined &&
                typeof item[
                  `get${Utilities_1.capitalFirst(lodash_1.camelCase(element))}`
                ] === "function"
                  ? yield item[
                      `get${Utilities_1.capitalFirst(
                        lodash_1.camelCase(element)
                      )}`
                    ](item)
                  : item[element];
            }
          }
        }
        return result;
      });
    }
  };
  if (m.relations) {
    const relations = m.relations.map((element) => {
      return Object.keys(element).pop();
    });
    relations.forEach((element) => {
      const model = lodash_1.upperFirst(element);
      // git commit note: remove pluralize
      result.prototype[`include${model}`] = function transforming(item) {
        let type = "item";
        if (item[element]() && item[element]().$relation) {
          if (
            item[element]().$relation.name === "HasOne" ||
            item[element]().$relation.name === "BelongsTo"
          ) {
            type = "item";
          }
          if (
            item[element]().$relation.name === "HasMany" ||
            item[element]().$relation.name === "BelongsToMany"
          ) {
            type = "collection";
          }
        }
        const n = (item.getRelated(element) || {}).$relations
          ? Object.keys(item.getRelated(element).$relations)
          : [];
        // const serializer = type === 'item' ? PlainSerializer : DataSerializer

        //git commit note: change to PascalCase
        const modelPath = `App/Models/${lodash_1.upperFirst(
          lodash_1.camelCase(
            lodash_inflection_1.singularize(
              item[element]().$relation.foreignTable
            )
          )
        )}`;
        return this[type](
          item.getRelated(element),
          fold_1.ioc.use(modelPath).transformer
            ? fold_1.ioc.use(modelPath).transformer
            : exports.RamenTransformerGenerator(fold_1.ioc.use(modelPath), n)
        );
      };
    });
  }
  return result;
};
exports.RamenTransformerFactory = (item) => {
  const result = class RamenTransformer extends TransformerAbstract {
    transform(item) {
      return item;
    }
  };
  return result;
};
