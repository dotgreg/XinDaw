import * as esprima from 'esprima'
import { filter } from 'lodash'
import config from '../../config';


// adds a
// return {c: c, o: false, e: [c]} in end of code
// where e is all variables to be able to be disposed

export let prepareCode = (code:any) => {
    let result

    try {
        result = esprima.parseModule(code)
    } catch (e) {
        return console.warn('[CODEEVAL] prepare => PrepareCode Error :', e)
    }

    config.debug.codeEval && console.log('[CODEEVAL] prepare => start :', {code, result})

    // get all the vars declarations
    let variables = filter(result.body, e => e.type === "VariableDeclaration")

    // build the object returned according to what is given

    // @ts-ignore
    let toneVar = filter(variables, v => ['t', 'tone', 'c'].includes(v.declarations[0].id.name))[0] || false
    // @ts-ignore
    if (toneVar) toneVar = toneVar.declarations[0].id.name
    
    // @ts-ignore
    let optionsVar = filter(variables, v => ['o', 'options'].includes(v.declarations[0].id.name))[0] || false
    // @ts-ignore
    if (optionsVar) optionsVar = optionsVar.declarations[0].id.name
    
    // @ts-ignore
    let allElements = variables.map(v => v.declarations[0].id.name)

    let returnStatement = `return {c: ${toneVar}, o: ${optionsVar}, e: [${allElements}]}`
    
    let res =  code + '\n\r' + returnStatement
    config.debug.codeEval && console.log('[CODEEVAL] prepare => success :', {res})
    return res
}
