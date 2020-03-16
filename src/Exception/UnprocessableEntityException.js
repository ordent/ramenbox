'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
const RamenException_1 = require("./RamenException");
class UnprocessableEntityException extends RamenException_1.RamenException {
    /**
     * Handle this exception by itself
     */
    handle(error, { response }) {
        this.wrapper(response, 422, error.message.message, error.message.stack);
    }
}
exports.UnprocessableEntityException = UnprocessableEntityException;
