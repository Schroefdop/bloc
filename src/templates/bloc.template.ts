import * as changeCase from "change-case";

export function getBlocTemplate(blocName: string): string {
  const pascalCaseBlocName = changeCase.pascalCase(blocName.toLowerCase());
  const blocState = `${pascalCaseBlocName}State`;
  const blocEvent = `${pascalCaseBlocName}Event`;
  return `import 'dart:async';
import 'package:bloc/bloc.dart';
import './bloc.dart';

class ${pascalCaseBlocName}Bloc extends Bloc<${blocEvent}, ${blocState}> {
  @override
  ${blocState} get initialState => ${blocState}.initial();

  @override
  Stream<${blocState}> mapEventToState(
    ${blocEvent} event,
  ) {
    return event.join((exampleEvent) {
      return null;
      // return Observable state 
    }, (exampleEvent2) {
      return null;
      // return a different observable state
    });
  }
}
`;
}
