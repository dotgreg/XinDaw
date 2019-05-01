import * as esprima from 'esprima'
import { filter } from 'lodash'
import config from 'src/config';
import {iError} from '../types/error.type'

// adds a
// return {c: c, o: false, e: [c]} in end of code
// where e is all variables to be able to be disposed
interface prepareCodeAnswer {
    status: 200|400
    code?: string
    error?: string
}

export let prepareCode = (code:string):prepareCodeAnswer => {
    let result

    try {
        result = esprima.parseModule(code)
    } catch (e) {
        let codeErrorReport = `[CODEEVAL] prepare => PrepareCode Error : ${JSON.stringify(e)}`
        // console.warn(codeErrorReport)
        return {status: 400, error: codeErrorReport}
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
    return {status: 200, code: res}
}

