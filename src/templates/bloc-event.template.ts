import * as changeCase from "change-case";

export function getBlocEventTemplate(
  blocName: string,
  useEquatable: boolean
): string {
  return useEquatable
    ? getEquatableBlocEventTemplate(blocName)
    : getDefaultBlocEventTemplate(blocName);
}

function getEquatableBlocEventTemplate(blocName: string): string {
  const pascalCaseBlocName = changeCase.pascalCase(blocName.toLowerCase());
  return `import 'package:equatable/equatable.dart';

abstract class ${pascalCaseBlocName}Event extends Equatable {
  const ${pascalCaseBlocName}Event();
}
`;
}

function getDefaultBlocEventTemplate(blocName: string): string {
  const pascalCaseBlocName = changeCase.pascalCase(blocName.toLowerCase());
  const snakeCaseBlocName = changeCase.snakeCase(blocName.toLowerCase());
  return `import 'package:sealed_unions/sealed_unions.dart';
import 'package:sealed_unions_annotations/sealed_unions_annotations.dart';

part '${snakeCaseBlocName}_event.g.dart';

@Seal('${pascalCaseBlocName}Event')
abstract class ${pascalCaseBlocName}EventType {
  @Sealed()
  void exampleEvent();
  @Sealed()
  void exampleEvent2();
}
`;
}
