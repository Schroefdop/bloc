"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const changeCase = require("change-case");
function getBlocStateTemplate(blocName, useEquatable) {
    return useEquatable
        ? getEquatableBlocStateTemplate(blocName)
        : getDefaultBlocStateTemplate(blocName);
}
exports.getBlocStateTemplate = getBlocStateTemplate;
function getEquatableBlocStateTemplate(blocName) {
    const pascalCaseBlocName = changeCase.pascalCase(blocName.toLowerCase());
    return `import 'package:equatable/equatable.dart';

abstract class ${pascalCaseBlocName}State extends Equatable {
  const ${pascalCaseBlocName}State();
}

class Initial${pascalCaseBlocName}State extends ${pascalCaseBlocName}State {
  @override
  List<Object> get props => [];
}
`;
}
function getDefaultBlocStateTemplate(blocName) {
    const pascalCaseBlocName = changeCase.pascalCase(blocName.toLowerCase());
    const snakeCaseBlocName = changeCase.snakeCase(blocName.toLowerCase());
    return `import 'package:sealed_unions_annotations/sealed_unions_annotations.dart';
import 'package:sealed_unions/sealed_unions.dart';

part '${snakeCaseBlocName}_state.g.dart';

@Seal('${pascalCaseBlocName}State')
abstract class ${pascalCaseBlocName}StateType {
  @Sealed()
  void initial();
}
`;
}
//# sourceMappingURL=bloc-state.template.js.map