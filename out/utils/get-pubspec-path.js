"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const vscode_1 = require("vscode");
function getPubspecPath() {
    if (vscode_1.workspace.workspaceFolders && vscode_1.workspace.workspaceFolders.length > 0) {
        return `${vscode_1.workspace.workspaceFolders[0].uri.path}/pubspec.yaml`;
    }
}
exports.getPubspecPath = getPubspecPath;
//# sourceMappingURL=get-pubspec-path.js.map