import * as esprima from 'esprima'
import config from '../../config';
import {each, has} from 'lodash'
// import VerEx from 'verbal-expressions';

export const analyzeCode = (code:string) => {
    let result

    try {
        result = esprima.parseModule(code)
    } catch (e) {
        return console.warn('[CODE ANALYZE] prepare => PrepareCode Error :', e)
    }

    // find vars
    // let reg = //ig

    // remove spaces
    // let codeWithoutSpaces = code.replace(/( |\n)/g, '')
    // console.log(codeWithoutSpaces)

    //
    //
    //
    type controlType = [any, any, any, any]

    let analysis = {
        controls: <controlType[]>[]
    }
    each(result.body, item => {
        if (!has(item, 'declarations.0')) return
        let varInfo = item.declarations[0]
        if (varInfo.id.name === 'o' || varInfo.id.name === 'options') {
            // we have object 'options'


            each(varInfo.init.properties, item2 => {
                if (item2.key.name === 'vars') {
                    // we have object 'vars'


                    if (!item2.value.elements) return
                    each(item2.value.elements, item3 => {
                        
                        // for each array element
                        let res:controlType = [
                            getEsprimaElementValue(item3.elements[0]), 
                            getEsprimaElementValue(item3.elements[2]), 
                            getEsprimaElementValue(item3.elements[3]),
                            getEsprimaElementValue(item3.elements[4]) || 1,
                        ]
                        analysis.controls.push(res)
                        
                    })
                    
                }
            })


        }
        
    })


    console.log(analysis)

}

export const getEsprimaElementValue = (el:any) => {
    if (!el) return undefined

    // most of the types
    if (el.type === 'Literal') return el.value

    // if -100 => el.operator is - and el.argument.value is 100
    if (el.type === 'UnaryExpression') return parseInt(`${el.operator}${el.argument.value}`)
}




    // const tester = VerEx()
    //     .startOfLine()
    //     .then('http')
    //     .maybe('s')
    //     .then('://')
    //     .maybe('www.')
    //     .anythingBut(' ')
    //     .endOfLine();

    // // Create an example URL
    // const testMe = 'https://www.google.com';

    // // Use RegExp object's native test() function
    // if (tester.test(testMe)) {
    
    
        // config.debug.codeAnalyze && console.log('[CODE ANALYZE] start :', {code, result})

        // //https://regex101.com/r/Dkw8wp/1
    