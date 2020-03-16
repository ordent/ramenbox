"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// const TransformerAbstract = require('adonis-bumblebee/src/Bumblebee/TransformerAbstract')
const TransformerAbstract = use('Bumblebee/Transformer');
const { ioc } = require('@adonisjs/fold');
const _ = require('lodash');
const { capitalize } = require('../Utilities');
const isJSON = (str) => {
    return !_.isError(_.attempt(JSON.parse, str));
};
class RamenTransformer extends TransformerAbstract {
}
exports.RamenTransformer = RamenTransformer;
exports.RamenTransformerGenerator = (m, n = []) => {
    _.mixin(require('lodash-inflection'));
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
                _.difference(m.properties, m.hidden).forEach((element) => {
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
            const model = capitalize(element);
            result.prototype[`include${_.pluralize(model)}`] = function transforming(item) {
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
                return this[type](item.getRelated(element), ioc.use(`App/Models/${capitalize(_.singularize(item[element]().$relation.foreignTable))}`).transformer
                    ? ioc.use(`App/Models/${capitalize(_.singularize(item[element]().$relation.foreignTable))}`).transformer
                    : exports.RamenTransformerGenerator(ioc.use(`App/Models/${capitalize(_.singularize(item[element]().$relation.foreignTable))}`), n));
            };
        });
    }
    return result;
    // return class RamenTransform {
    // }
};
