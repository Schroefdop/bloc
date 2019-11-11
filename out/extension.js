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
const _ = require("lodash");
const changeCase = require("change-case");
const mkdirp = require("mkdirp");
const vscode_1 = require("vscode");
const fs_1 = require("fs");
const templates_1 = require("./templates");
const utils_1 = require("./utils");
function activate(_context) {
    utils_1.analyzeDependencies();
    vscode_1.commands.registerCommand("extension.new-bloc", (uri) => __awaiter(this, void 0, void 0, function* () {
        const blocName = yield promptForBlocName();
        if (_.isNil(blocName) || blocName.trim() === "") {
            vscode_1.window.showErrorMessage("The bloc name must not be empty");
            return;
        }
        let targetDirectory;
        if (_.isNil(_.get(uri, "fsPath")) || !fs_1.lstatSync(uri.fsPath).isDirectory()) {
            targetDirectory = yield promptForTargetDirectory();
            if (_.isNil(targetDirectory)) {
                vscode_1.window.showErrorMessage("Please select a valid directory");
                return;
            }
        }
        else {
            targetDirectory = uri.fsPath;
        }
        // const useEquatable = (await promptForUseEquatable()) === "yes (advanced)";
        const pascalCaseBlocName = changeCase.pascalCase(blocName.toLowerCase());
        try {
            yield generateBlocCode(blocName, targetDirectory, false);
            vscode_1.window.showInformationMessage(`Successfully Generated ${pascalCaseBlocName} Bloc`);
        }
        catch (error) {
            vscode_1.window.showErrorMessage(`Error:
        ${error instanceof Error ? error.message : JSON.stringify(error)}`);
        }
    }));
}
exports.activate = activate;
function promptForBlocName() {
    const blocNamePromptOptions = {
        prompt: "Bloc Name",
        placeHolder: "counter"
    };
    return vscode_1.window.showInputBox(blocNamePromptOptions);
}
// function promptForUseEquatable(): Thenable<string | undefined> {
//   const useEquatablePromptValues: string[] = ["no (default)", "yes (advanced)"];
//   const useEquatablePromptOptions: QuickPickOptions = {
//     placeHolder:
//       "Do you want to use the Equatable Package in this bloc to override equality comparisons?",
//     canPickMany: false
//   };
//   return window.showQuickPick(
//     useEquatablePromptValues,
//     useEquatablePromptOptions
//   );
// }
function promptForTargetDirectory() {
    return __awaiter(this, void 0, void 0, function* () {
        const options = {
            canSelectMany: false,
            openLabel: "Select a folder to create the bloc in",
            canSelectFolders: true
        };
        return vscode_1.window.showOpenDialog(options).then(uri => {
            if (_.isNil(uri) || _.isEmpty(uri)) {
                return undefined;
            }
            return uri[0].fsPath;
        });
    });
}
function generateBlocCode(blocName, targetDirectory, useEquatable) {
    return __awaiter(this, void 0, void 0, function* () {
        const snakeCaseBlocName = changeCase.snakeCase(blocName.toLowerCase());
        const blocDirectoryPath = `${targetDirectory}/${snakeCaseBlocName}_bloc`;
        if (!fs_1.existsSync(blocDirectoryPath)) {
            yield createDirectory(blocDirectoryPath);
        }
        yield Promise.all([
            createBlocEventTemplate(blocName, targetDirectory, useEquatable),
            createBlocStateTemplate(blocName, targetDirectory, useEquatable),
            createBlocTemplate(blocName, targetDirectory),
            createBarrelTemplate(blocName, targetDirectory)
        ]);
    });
}
function createDirectory(targetDirectory) {
    return new Promise((resolve, reject) => {
        mkdirp(targetDirectory, error => {
            if (error) {
                return reject(error);
            }
            resolve();
        });
    });
}
function createBlocEventTemplate(blocName, targetDirectory, useEquatable) {
    const snakeCaseBlocName = changeCase.snakeCase(blocName.toLowerCase());
    const targetPath = `${targetDirectory}/${snakeCaseBlocName}_bloc/${snakeCaseBlocName}_event.dart`;
    if (fs_1.existsSync(targetPath)) {
        throw Error(`${snakeCaseBlocName}_event.dart already exists`);
    }
    return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
        fs_1.writeFile(targetPath, templates_1.getBlocEventTemplate(blocName, useEquatable), "utf8", error => {
            if (error) {
                reject(error);
                return;
            }
            resolve();
        });
    }));
}
function createBlocStateTemplate(blocName, targetDirectory, useEquatable) {
    const snakeCaseBlocName = changeCase.snakeCase(blocName.toLowerCase());
    const targetPath = `${targetDirectory}/${snakeCaseBlocName}_bloc/${snakeCaseBlocName}_state.dart`;
    if (fs_1.existsSync(targetPath)) {
        throw Error(`${snakeCaseBlocName}_state.dart already exists`);
    }
    return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
        fs_1.writeFile(targetPath, templates_1.getBlocStateTemplate(blocName, useEquatable), "utf8", error => {
            if (error) {
                reject(error);
                return;
            }
            resolve();
        });
    }));
}
function createBlocTemplate(blocName, targetDirectory) {
    const snakeCaseBlocName = changeCase.snakeCase(blocName.toLowerCase());
    const targetPath = `${targetDirectory}/${snakeCaseBlocName}_bloc/${snakeCaseBlocName}_bloc.dart`;
    if (fs_1.existsSync(targetPath)) {
        throw Error(`${snakeCaseBlocName}_bloc.dart already exists`);
    }
    return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
        fs_1.writeFile(targetPath, templates_1.getBlocTemplate(blocName), "utf8", error => {
            if (error) {
                reject(error);
                return;
            }
            resolve();
        });
    }));
}
function createBarrelTemplate(blocName, targetDirectory) {
    const snakeCaseBlocName = changeCase.snakeCase(blocName.toLowerCase());
    const targetPath = `${targetDirectory}/${snakeCaseBlocName}_bloc/bloc.dart`;
    if (fs_1.existsSync(targetPath)) {
        return new Promise((resolve, reject) => {
            fs_1.appendFile(targetPath, templates_1.getBarrelTemplate(blocName), "utf8", error => {
                if (error) {
                    reject(error);
                    return;
                }
                resolve();
            });
        });
    }
    return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
        fs_1.writeFile(targetPath, templates_1.getBarrelTemplate(blocName), "utf8", error => {
            if (error) {
                reject(error);
                return;
            }
            resolve();
        });
    }));
}
//# sourceMappingURL=extension.js.map