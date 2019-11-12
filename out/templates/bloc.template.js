"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const changeCase = require("change-case");
function getBlocTemplate(blocName) {
    const pascalCaseBlocName = changeCase.pascalCase(blocName.toLowerCase());
    const blocType = `${pascalCaseBlocName}BlocType`;
    const blocState = `${pascalCaseBlocName}State`;
    const blocEvent = `${pascalCaseBlocName}Event`;
    return `import 'dart:async';
import 'package:bloc/bloc.dart';
import './bloc.dart';

abstract class ${blocType} extends Bloc<${blocEvent}, ${blocState}> {}

class ${pascalCaseBlocName}Bloc extends ${blocType} {
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
exports.getBlocTemplate = getBlocTemplate;
//# sourceMappingURL=bloc.template.js.map