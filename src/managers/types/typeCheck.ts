import * as t from "io-ts";
import {PathReporter} from "io-ts/lib/PathReporter";
import {lowerCase, each} from 'lodash'

/**
* dynamically checkType from a io-ts type against an object 
*/
export const checkType = (Type: t.Type<any>) => (obj: any) => {
    let result = Type.decode(obj)
    let report = PathReporter.report(result)
    if (result.isRight()) {
        return true
    } else {
        let repArr = report[0].split('/')
        console.error('[checkType]', repArr, 'obj: ',obj)
        return false
    }
}

export {t}

/**
* assert the output is a string included inside the union of choices 
* (like :'can'|'only'|'get'|'those'|'values')
*/
export const assertType = (KeyofType: t.KeyofType<any>) => (variable:any) => {
    let result:any = undefined
    
    const simplify = (val:any) => lowerCase(val).replace(/\s/g, '')

    let defaultValue
    each(KeyofType.keys, (val,name) => {
        defaultValue = name
        if (simplify(name) === simplify(variable)) result = name
    })

    if (!result) {
        console.warn(`[assertType] ${variable} could not be found in allowed value, giving default value of ${defaultValue}`)
        result = defaultValue
    }

    return result
}
