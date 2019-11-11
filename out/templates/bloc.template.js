"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const changeCase = require("change-case");
function getBlocTemplate(blocName) {
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
  ) async* {
    // TODO: Add Logic
    return event.join((exampleEvent) {
      return ${blocState}.initial();
    }, (exampleEvent2) {
      // return a different state
    });
  }
}
`;
}
exports.getBlocTemplate = getBlocTemplate;
//# sourceMappingURL=bloc.template.js.map