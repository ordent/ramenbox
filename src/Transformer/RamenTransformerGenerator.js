"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const TransformerAbstract = use('Bumblebee/Transformer');
const fold_1 = require("@adonisjs/fold");
const lodash_1 = require("lodash");
const lodash_inflection_1 = require("lodash-inflection");
// import {capitalize} from '../Utilities'
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
            const result = {};
            if (m.properties) {
                lodash_1.difference(m.properties, m.hidden).forEach((element) => {
                    if (isJSON(model[element])) {
                        result[element] = JSON.parse(model[element]);
                    }
                    else {
                        result[element] = model[element];
                    }
                });
            }
            return result;
        }
    };
    if (m.relations) {
        m.relations.forEach((element) => {
            const model = lodash_1.capitalize(element);
            result.prototype[`include${lodash_inflection_1.pluralize(model)}`] = function transforming(item) {
                let type = 'item';
                if (item[element]() && item[element]().$relation) {
                    if (item[element]().$relation.name === 'HasOne' || item[element]().$relation.name === 'BelongsTo') {
                        type = 'item';
                    }
                    if (item[element]().$relation.name === 'HasMany') {
                        type = 'collection';
                    }
                }
                const n = (item.getRelated(element) || {}).$relations ? Object.keys(item.getRelated(element).$relations) : [];
                return this[type](item.getRelated(element), fold_1.ioc.use(`App/Models/${lodash_1.capitalize(lodash_inflection_1.singularize(item[element]().$relation.foreignTable))}`).transformer
                    ? fold_1.ioc.use(`App/Models/${lodash_1.capitalize(lodash_inflection_1.singularize(item[element]().$relation.foreignTable))}`).transformer
                    : exports.RamenTransformerGenerator(fold_1.ioc.use(`App/Models/${lodash_1.capitalize(lodash_inflection_1.singularize(item[element]().$relation.foreignTable))}`), n));
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
