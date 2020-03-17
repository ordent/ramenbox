"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const { validate, validateAll } = use('Validator');
const Env = use('Env');
const { sanitize } = require('indicative/sanitizer');
const Exception_1 = require("../Exception");
exports.RamenValidatorGenerator = (base) => {
    const result = class RamenValidator {
        sanitize(value, type) {
            return __awaiter(this, void 0, void 0, function* () {
                if (base.sanitize && base.sanitize[type]) {
                    yield sanitize(value, base.sanitize[type]);
                }
                return value;
            });
        }
        validate(value, type) {
            return __awaiter(this, void 0, void 0, function* () {
                let validation = null;
                if (Env.get('VALIDATION_TYPE', 'SINGLE') === 'SINGLE') {
                    if (base.rules && base.rules[type]) {
                        validation = yield validate(value, base.rules[type]);
                    }
                }
                else {
                    if (base.rules && base.rules[type]) {
                        validation = yield validateAll(value, base.rules[type]);
                    }
                }
                if (validation && validation.fails()) {
                    const message = {};
                    validation.messages().forEach((f) => {
                        message[f.field] = Object.assign({}, { message: f.message, validation: f.validation });
                    });
                    throw new Exception_1.UnprocessableEntityException({ message: message });
                }
                return validation;
            });
        }
    };
    return result;
};
