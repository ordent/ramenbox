"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const RamenException_1 = require("./RamenException");
class NotFoundException extends RamenException_1.RamenException {
  /**
   * Handle this exception by itself
   */
  handle(error, { response }) {
    this.wrapper(response, 404, error.message);
  }
}
exports.NotFoundException = NotFoundException;
