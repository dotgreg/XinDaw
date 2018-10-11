import * as esprima from 'esprima'
import config from 'src/config';
import {each, has} from 'lodash'
import { stringToId } from 'src/helpers/stringHelper';
import { iControlVar } from 'src/managers/types/control.type';

export const analyzeCode = (code:string) => {
    
    let analysis = {
        controls: <iControlVar[]>[]
    }
    
    let esprimaResults
    try {
        esprimaResults = esprima.parseModule(code)
    } catch (e) {
        console.warn('[CODE ANALYZE] prepare => PrepareCode Error :', e)
        return analysis
    }


    each(esprimaResults.body, item => {
        if (!has(item, 'declarations.0')) return
        let varInfo = item.declarations[0]


        // OPTIONS 
        if (varInfo.id.name === 'o' || varInfo.id.name === 'options') {
            // we have object 'options'


            // OPTIONS > VARS 
            each(varInfo.init.properties, item2 => {
                if (item2.key.name === 'vars') {
                    // we have object 'vars'


                    if (!item2.value.elements) return
                    each(item2.value.elements, item3 => {
                        
                        if (!item3.elements) return
                        // for each array element
                        let res:iControlVar = {
                            id: stringToId(getEsprimaElementValue(item3.elements[0])), 
                            name: getEsprimaElementValue(item3.elements[0]), 
                            target: getEsprimaElementValue(item3.elements[1]), 
                            value: getEsprimaElementValue(item3.elements[2]) || 0, 
                            min: getEsprimaElementValue(item3.elements[3]), 
                            max: getEsprimaElementValue(item3.elements[4]),
                            step: getEsprimaElementValue(item3.elements[5]) || 1,
                        }
                        analysis.controls.push(res)
                    })
                }
            })
        }
    })
    config.debug.codeAnalyze && console.log('[CODE ANALYZE] results ', {analysis, code:{code}})
    return analysis

}

const getEsprimaElementValue = (el:any) => {
    if (!el) return undefined

    // most of the types
    if (el.type === 'Literal') return el.value

    // if -100 => el.operator is - and el.argument.value is 100
    if (el.type === 'UnaryExpression') return parseInt(`${el.operator}${el.argument.value}`)
}


