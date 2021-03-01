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
const NotFoundException_1 = require("../Exception/NotFoundException");
const RamenTransformerGenerator_1 = require("../Transformer/RamenTransformerGenerator");
// import DataSerializer from 'adonis-bumblebee/src/Bumblebee/Serializers/DataSerializer'
const DataSerializer = require("adonis-bumblebee/src/Bumblebee/Serializers/DataSerializer");
class RamenResponse {
  constructor(response, request) {
    this.response = response ? response : null;
    this.request = request ? request : null;
    this.status = 200;
    this.manager = {};
    this.meta = { status: this.getStatus(), message: "item retrieval success" };
  }
  setResponse(response) {
    this.response = response;
    return this;
  }
  getResponse() {
    return this.response;
  }
  setRequest(request) {
    this.request = request;
    return this;
  }
  getRequest() {
    return this.request;
  }
  setTransformers(transformer) {
    this.transformer = transformer;
    return this;
  }
  getTransformers() {
    return this.transformer;
  }
  setManager(manager) {
    this.manager = manager;
    this.manager.setSerializer(new DataSerializer());
    return this;
  }
  getManager() {
    return this.manager;
  }
  item(item, relations = "") {
    return __awaiter(this, void 0, void 0, function* () {
      if (!item) {
        throw new NotFoundException_1.NotFoundException("item not found");
      }
      return yield this.getManager()
        .include(relations)
        .meta(this.getMeta())
        .item(item, this.getTransformers());
    });
  }
  rawItem(item, relations = "", transformer = null) {
    return __awaiter(this, void 0, void 0, function* () {
      if (!item) {
        throw new NotFoundException_1.NotFoundException("item not found");
      }
      const t = transformer
        ? transformer
        : RamenTransformerGenerator_1.RamenTransformerFactory(item);
      return yield this.getManager()
        .meta(this.getMeta())
        .include(relations)
        .item(item, t);
    });
  }
  setStatus(status) {
    this.status = status;
    return this;
  }
  getStatus() {
    return this.status;
  }
  collection(items, relations = "") {
    return __awaiter(this, void 0, void 0, function* () {
      return yield this.getManager()
        .include(relations)
        .paginate(items, this.getTransformers());
    });
  }
  rawCollection(items, relations = "", transformer = null) {
    return __awaiter(this, void 0, void 0, function* () {
			//for setup pagination and 
			let data = {}
			if (!items.rows) {
				if (items.data) {
					data.rows = items.data
					data.pages = {}
					data.pages.total = items.total
					data.pages.perPage = items.perPage
					data.pages.page = items.page
					data.pages.lastPage = items.lastPage
				}else {
					data.rows = items
					data.pages = {}
					data.pages.total = items.total
					data.pages.perPage = items.perPage
					data.pages.page = items.page
					data.pages.lastPage = items.lastPage
				}
			} else {
				data = items
			}
      const t = transformer
        ? transformer
        : this.getTransformers();
      return yield this.getManager().include(relations).paginate(data, t);
    });
  }
  setMeta(item) {
    this.meta = item;
    return this;
  }
  getMeta() {
    return this.meta;
  }
}
exports.RamenResponse = RamenResponse;
