import * as changeCase from "change-case";

export function getBlocStateTemplate(
  blocName: string,
  useEquatable: boolean
): string {
  return useEquatable
    ? getEquatableBlocStateTemplate(blocName)
    : getDefaultBlocStateTemplate(blocName);
}

function getEquatableBlocStateTemplate(blocName: string): string {
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

function getDefaultBlocStateTemplate(blocName: string): string {
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
