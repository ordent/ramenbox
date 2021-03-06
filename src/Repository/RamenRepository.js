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
const Hash = use("Hash");
const Exception_1 = require("../Exception");
const RamenModel_1 = require("../Model/RamenModel");
const Utilities_1 = require("../Utilities");
class RamenRepository {
  constructor(model) {
    this.model = model ? model : RamenModel_1.RamenModel;
  }
  setModel(model) {
    this.model = model;
    return this;
  }
  getModel() {
    return this.model;
  }
  createModel() {
    return new (this.getModel())();
  }
  getItem(value) {
    return __awaiter(this, void 0, void 0, function* () {
      const result = value.match(/^[0-9]*$/)
        ? yield this.getModel().find(parseInt(value))
        : yield this.getModel()
          .query()
          .where(this.getModel().slug, value)
          .first();
      if (!result) {
        throw new Exception_1.NotFoundException("item not found");
      }
      return result;
    });
  }
  getCollection(parameters) {
    return __awaiter(this, void 0, void 0, function* () {
      const result = yield this.getModel()
        .query()
        .filter(parameters)
        .paginate(parameters.page, parameters.limit);
      if (result.toJSON().data.length <= 0) {
        throw new Exception_1.NotFoundException("item not found");
      }
      return result;
    });
  }

  async postItem(parameter) {

    let item = null;
    const param = this.getModel().properties
      ? Utilities_1.requestProperties(parameter, this.getModel().properties)
      : parameter;
    try {
      item = await this.getModel().create(param);
      await item.reload()
    } catch (e) {
      throw new Exception_1.UnprocessableEntityException({
        message: e.message,
        stack: e.stack,
      });
    }
    return item;
  }

  postCollection(parameters) {
    return __awaiter(this, void 0, void 0, function* () {
      const result = {
        success: [],
        failed: [],
        error: [],
      };
      for (const param of parameters) {
        let item;
        try {
          item = yield this.getModel().create(param);
          result.success.push(item);
        } catch (e) {
          result.failed.push(param);
          result.error.push(
            new Exception_1.UnprocessableEntityException({
              message: e.message,
              stack: e.stack,
            })
          );
        }
      }
      return result;
    });
  }
  putItem(value, parameter) {
    return __awaiter(this, void 0, void 0, function* () {
      const param = this.getModel().properties
        ? Utilities_1.requestProperties(parameter, this.getModel().properties)
        : parameter;
      const item = yield this.getItem(value);

      if ("password" in parameter) {
        if ("oldPassword" in parameter) {
          if (parameter.password === parameter.oldPassword)
            throw new Exception_1.UnprocessableEntityException({
              message: "old password and new password cant be the same !",
              stack: null,
            });
          const verify = yield Hash.verify(
            parameter.oldPassword,
            item.password
          );
          if (!verify) {
            throw new Exception_1.UnprocessableEntityException({
              message: "old password incorrect !",
              stack: null,
            });
          }
        } else {
          throw new Exception_1.UnprocessableEntityException({
            message: "need oldPassword value",
            stack: null,
          });
        }
      }

      yield item.merge(param);

      try {
        yield item.save();
        yield item.reload();
      } catch (e) {
        throw new Exception_1.UnprocessableEntityException({
          message: e.message,
          stack: e.stack,
        });
      }

      return item;
    });
  }
  async deleteItem(value) {
    const item = value.match(/^[0-9]*$/)
      ? await this.getModel().find(parseInt(value))
      : await this.getModel()
        .query()
        .where(this.getModel().slug, value)
        .first();

    if (item) {
      await item.delete();
      return item;
    }

    throw new Exception_1.NotFoundException("item not found");
  }
}
exports.RamenRepository = RamenRepository;
