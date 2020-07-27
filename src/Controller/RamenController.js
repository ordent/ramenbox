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
const RamenServices_1 = require("../Services/RamenServices");
class RamenController {
  constructor(item) {
    this.services = null;
    this.setServices(item);
  }
  getServices() {
    return this.services;
  }
  setServices(item) {
    this.services =
      item instanceof RamenServices_1.RamenServices
        ? item
        : new RamenServices_1.RamenServices(item);
    return this;
  }
  index({ request, response, transform }) {
    return __awaiter(this, void 0, void 0, function* () {
      this.getServices().getResponse().setResponse(response);
      this.getServices().getResponse().setManager(transform);
      const data = yield this.getServices().getCollection(request);
      return data;
    });
  }
  show({ request, response, transform }) {
    return __awaiter(this, void 0, void 0, function* () {
      this.getServices().getResponse().setResponse(response);
      this.getServices().getResponse().setManager(transform);
      const data = yield this.getServices().getItem(request.params.id, request);
      return data;
    });
  }
  store({ request, response, transform }) {
    return __awaiter(this, void 0, void 0, function* () {
      this.getServices().getResponse().setResponse(response);
      this.getServices().getResponse().setManager(transform);
      const data = yield this.getServices().postItem(request);
      return data;
    });
  }
  update({ request, response, transform }) {
    return __awaiter(this, void 0, void 0, function* () {
      this.getServices().getResponse().setResponse(response);
      this.getServices().getResponse().setManager(transform);
      const data = this.getServices().putItem(request.params.id, request);
      return data;
    });
  }
  destroy({ request, response, transform }) {
    this.getServices().getResponse().setResponse(response);
    this.getServices().getResponse().setManager(transform);
    this.getServices().deleteItem(request);
  }
}
exports.RamenController = RamenController;
// module.exports = RamenController
