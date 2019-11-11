"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs = require("fs");
const yaml = require("js-yaml");
const get_pubspec_path_1 = require("./get-pubspec-path");
function getPubspec() {
    const pubspecPath = get_pubspec_path_1.getPubspecPath();
    if (pubspecPath) {
        try {
            return yaml.safeLoad(fs.readFileSync(pubspecPath, "utf8"));
        }
        catch (_) { }
    }
}
exports.getPubspec = getPubspec;
//# sourceMappingURL=get-pubspec.js.map