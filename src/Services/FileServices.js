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
const SobaServices_1 = require("./SobaServices");
const shortid_1 = require("shortid");
const mime_types_1 = require("mime-types");
const Drive = use('Drive');
class FileServices extends SobaServices_1.default {
    assign(item) {
        return __awaiter(this, void 0, void 0, function* () {
            let name = shortid_1.default.generate();
            if (typeof item === 'object') {
                name = `${Buffer.from(item.tmpPath).toString('base64').replace('=', 'A')}.${mime_types_1.default.extension(mime_types_1.default.lookup(item.clientName))}`;
            }
            try {
                yield Drive.put(name, item);
                return yield Drive.getUrl(name);
            }
            catch (e) {
                console.log(name, e);
            }
        });
    }
}
exports.FileServices = FileServices;
