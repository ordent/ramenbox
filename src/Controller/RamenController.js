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
const RamenServices_1 = require("../Services/RamenServices");
const RamenRepository = require('../Repository/RamenRepository');
class RamenController {
    constructor(item) {
        this.services = null;
        this.setServices(item);
    }
    getServices() {
        return this.services;
    }
    setServices(item) {
        if (item instanceof RamenServices_1.RamenServices) {
            this.services = item;
        }
        else {
            this.services = new RamenServices_1.RamenServices(item);
        }
    }
    index({ request, response, transform }) {
        var _a, _b, _c;
        return __awaiter(this, void 0, void 0, function* () {
            // const t0 = performance.now()
            (_a = this.getServices()) === null || _a === void 0 ? void 0 : _a.getResponse().setResponse(response);
            (_b = this.getServices()) === null || _b === void 0 ? void 0 : _b.getResponse().setManager(transform);
            const data = yield ((_c = this.getServices()) === null || _c === void 0 ? void 0 : _c.getCollection(request));
            //     const t1 = performance.now()
            // console.log(`${(t1-t0)/1000} seconds`)
            return data;
        });
    }
    show({ request, response, transform }) {
        var _a, _b, _c;
        return __awaiter(this, void 0, void 0, function* () {
            (_a = this.getServices()) === null || _a === void 0 ? void 0 : _a.getResponse().setResponse(response);
            (_b = this.getServices()) === null || _b === void 0 ? void 0 : _b.getResponse().setManager(transform);
            const data = yield ((_c = this.getServices()) === null || _c === void 0 ? void 0 : _c.getItem(request.params.id, request));
            // console.log('data', data)
            //     const t1 = performance.now()
            // console.log(`${(t1-t0)/1000} seconds`)
            return data;
        });
    }
    store({ request, response, transform }) {
        var _a, _b, _c;
        return __awaiter(this, void 0, void 0, function* () {
            // console.log('store')
            (_a = this.getServices()) === null || _a === void 0 ? void 0 : _a.getResponse().setResponse(response);
            (_b = this.getServices()) === null || _b === void 0 ? void 0 : _b.getResponse().setManager(transform);
            const data = yield ((_c = this.getServices()) === null || _c === void 0 ? void 0 : _c.postItem(request));
            return data;
        });
    }
    update({ request, response, transform }) {
        var _a, _b, _c;
        return __awaiter(this, void 0, void 0, function* () {
            (_a = this.getServices()) === null || _a === void 0 ? void 0 : _a.getResponse().setResponse(response);
            (_b = this.getServices()) === null || _b === void 0 ? void 0 : _b.getResponse().setManager(transform);
            const data = (_c = this.getServices()) === null || _c === void 0 ? void 0 : _c.putItem(request.params.id, request);
            return data;
        });
    }
    delete({ request, response, transform }) {
        var _a, _b, _c;
        return __awaiter(this, void 0, void 0, function* () {
            (_a = this.getServices()) === null || _a === void 0 ? void 0 : _a.getResponse().setResponse(response);
            (_b = this.getServices()) === null || _b === void 0 ? void 0 : _b.getResponse().setManager(transform);
            const data = (_c = this.getServices()) === null || _c === void 0 ? void 0 : _c.deleteItem(request);
        });
    }
}
module.exports = RamenController;
