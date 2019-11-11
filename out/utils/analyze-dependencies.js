"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const _ = require("lodash");
const semver = require("semver");
const vscode_1 = require("vscode");
const _1 = require(".");
const update_pubspec_dependency_1 = require("./update-pubspec-dependency");
function analyzeDependencies() {
    const dependenciesToAnalyze = [
        {
            name: "equatable",
            version: "^0.6.1",
            actions: [
                {
                    name: "Open Migration Guide",
                    callback: () => {
                        vscode_1.env.openExternal(vscode_1.Uri.parse("https://github.com/felangel/equatable/blob/master/doc/migration_guides/migration-0.6.0.md"));
                    }
                }
            ]
        },
        { name: "bloc", version: "^2.0.0", actions: [] },
        { name: "bloc_test", version: "^2.0.0", actions: [] },
        { name: "flutter_bloc", version: "^2.0.0", actions: [] },
        { name: "angular_bloc", version: "^2.0.0", actions: [] }
    ];
    const dependencies = _.get(_1.getPubspec(), "dependencies", {});
    for (let i = 0; i < dependenciesToAnalyze.length; i++) {
        const dependency = dependenciesToAnalyze[i];
        if (_.has(dependencies, dependency.name)) {
            const dependencyVersion = _.get(dependencies, dependency.name, "latest");
            if (dependencyVersion === "latest")
                continue;
            if (dependencyVersion == null)
                continue;
            if (typeof dependencyVersion !== "string")
                continue;
            const minVersion = _.get(semver.minVersion(dependencyVersion), "version", "0.0.0");
            if (!semver.satisfies(minVersion, dependency.version)) {
                vscode_1.window
                    .showWarningMessage(`This workspace contains an unsupported version of ${dependency.name}. Please update to ${dependency.version}.`, ...dependency.actions.map(action => action.name).concat("Update"))
                    .then(invokedAction => {
                    if (invokedAction === "Update") {
                        return update_pubspec_dependency_1.updatePubspecDependency({
                            name: dependency.name,
                            version: dependency.version
                        });
                    }
                    const action = dependency.actions.find(action => action.name === invokedAction);
                    if (!_.isNil(action)) {
                        action.callback();
                    }
                });
            }
        }
    }
}
exports.analyzeDependencies = analyzeDependencies;
//# sourceMappingURL=analyze-dependencies.js.map