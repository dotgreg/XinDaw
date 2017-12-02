import esprima from 'esprima'
import { intersection, filter } from 'lodash'

export let prepareCode = (code) => {
  try {
    result = esprima.parseModule(code)

    // get all the vars declarations
    let variables = filter(result.body, e => e.type === "VariableDeclaration")

    // build the object returned according to what is given
    let toneVar = filter(variables, v => ['t', 'tone', 'c'].includes(v.declarations[0].id.name))[0] || false
    if (toneVar) toneVar = toneVar.declarations[0].id.name

    let optionsVar = filter(variables, v => ['o', 'options'].includes(v.declarations[0].id.name))[0] || false
    if (optionsVar) optionsVar = optionsVar.declarations[0].id.name

    let allElements = variables.map(v => v.declarations[0].id.name)

    let returnStatement = `return {c: ${toneVar}, o: ${optionsVar}, e: [${allElements}]}`

    return code + '\n\r' + returnStatement

  } catch (e) {
    console.warn('PrepareCode Error :', e)
  }
}
