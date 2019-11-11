"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const _ = require("lodash");
const fs = require("fs");
const get_pubspec_1 = require("./get-pubspec");
const vscode_1 = require("vscode");
const get_pubspec_path_1 = require("./get-pubspec-path");
function updatePubspecDependency(dependency) {
    const pubspec = get_pubspec_1.getPubspec();
    const dependencies = _.get(pubspec, "dependencies");
    if (vscode_1.workspace.workspaceFolders && vscode_1.workspace.workspaceFolders.length > 0) {
        const pubspecPath = get_pubspec_path_1.getPubspecPath();
        if (pubspecPath) {
            try {
                fs.writeFileSync(pubspecPath, fs
                    .readFileSync(pubspecPath, "utf8")
                    .replace(`${dependency.name}: ${dependencies[dependency.name]}`, `${dependency.name}: ${dependency.version}`));
            }
            catch (_) { }
        }
    }
}
exports.updatePubspecDependency = updatePubspecDependency;
//# sourceMappingURL=update-pubspec-dependency.js.map