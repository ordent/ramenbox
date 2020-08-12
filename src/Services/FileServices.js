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
const SobaServices_1 = require("./SobaServices");
const UndefinedException_1 = require("../Exception/UndefinedException");
const shortid_1 = require("shortid");
const mime_types_1 = require("mime-types");
const Drive = use("Floppy");
const fs = use("fs");
const base64Mime = require("base64mime");
class FileServices extends SobaServices_1.SobaServices {
  assign(item) {
    return __awaiter(this, void 0, void 0, function* () {
      if (typeof item === "object") {
        return yield this.file(item);
      } else if (typeof item === "string") {
        return yield this.stringBase64(item);
      }
    });
  }

  stringBase64(item) {
    return __awaiter(this, void 0, void 0, function* () {
      let name = shortid_1.generate();
      const mime = base64Mime(item);
      name = `${name}.${mime_types_1.extension(mime)}`;

      const base64File = item.split(";base64,").pop();

      const file = new Buffer(base64File, "base64");
      // this.urltoFile(item, name, mime)

      try {
        yield Drive.put(name, file);
        let value = null;
        if (Drive._config.default === "local") {
          value = yield Drive.disk().getStream(name).path;
        } else {
          value = yield Drive.disk().getUrl(name);
        }
        return value.substring(value.lastIndexOf("/tmp"));
      } catch (e) {
        throw new UndefinedException_1.UndefinedException(
          "File Services base64 have a problem"
        );
      }
    });
  }

  file(item) {
    return __awaiter(this, void 0, void 0, function* () {
      try {
        const chunks = [];
        const fileStream = fs.createReadStream(item.tmpPath);
        let fileBuffer;
        const result = new Promise((resolve, reject) => {
          let value = "";
          fileStream.once("error", (err) => {
            reject(err);
          });
          fileStream.on("data", (chunk) => {
            chunks.push(chunk);
          });
          fileStream.once("end", () =>
            __awaiter(this, void 0, void 0, function* () {
              fileBuffer = Buffer.concat(chunks);
              let name = shortid_1.generate();
              name = `${Buffer.from(item.tmpPath)
                .toString("base64")
                .replace("=", "A")}.${mime_types_1.extension(
                mime_types_1.lookup(item.clientName)
              )}`;
              try {
                yield Drive.put(name, fileBuffer);
                if (Drive._config.default === "local") {
                  const path = yield Drive.disk().getStream(name).path;
                  value = path.substring(path.lastIndexOf("/tmp"));
                } else {
                  value = yield Drive.disk().getUrl(name);
                }
              } catch (e) {
                throw new UndefinedException_1.UndefinedException(
                  "File Services have a problem"
                );
              }
              resolve(value);
            })
          );
        });
        return result;
      } catch (e) {
        throw new UndefinedException_1.UndefinedException(
          "File Services have a problem"
        );
      }
    });
  }

  resolver(item) {
    if (!item) {
      return false;
    }
    if (typeof item === "object" && !Array.isArray(item)) {
      return true;
    }
    if (
      typeof item === "string" &&
      is_base64_1.isBase64(item) &&
      item.includes("data:image")
    ) {
      return true;
    }
    if (Array.isArray(item)) {
      const i = item.pop();
      if (
        (typeof i === "object" && !Array.isArray(i)) ||
        (typeof i === "string" &&
          is_base64_1.isBase64(i) &&
          i.includes("data:image"))
      ) {
        return true;
      }
    }
    return false;
  }
}
exports.FileServices = FileServices;
