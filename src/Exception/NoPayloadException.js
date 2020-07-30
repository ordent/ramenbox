"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const RamenException_1 = require("./RamenException");
class NoPayloadException extends RamenException_1.RamenException {
  /**
   * Handle this exception by itself
   */
  handle(error, { response }) {
    this.wrapper(response, 204, error.message);
  }
}
exports.NoPayloadException = NoPayloadException;
