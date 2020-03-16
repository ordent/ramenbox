"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// const  LogicalException = require('@adonisjs/generic-exceptions')
const GE = require('@adonisjs/generic-exceptions');
class RamenException extends GE.LogicalException {
    constructor(item) {
        super(item);
    }
    wrapper(response, status, message, stack, code) {
        const result = {
            data: null,
            meta: {
                message: message,
                status: status,
                code: code ? code : 'E_ERROR',
                stack: []
            }
        };
        if (stack) {
            result.meta.stack = stack;
        }
        response.status(status).json(result);
    }
}
exports.RamenException = RamenException;
