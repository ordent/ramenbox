'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
const RamenException_1 = require("./RamenException");
class BadRequestException extends RamenException_1.RamenException {
    /**
     * Handle this exception by itself
     */
    handle(error, { response }) {
        this.wrapper(response, 400, error.message);
    }
}
exports.BadRequestException = BadRequestException;
