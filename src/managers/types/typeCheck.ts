import * as t from "io-ts";
import {PathReporter} from "io-ts/lib/PathReporter";
import {lowerCase, each, random} from 'lodash'
import { randomString } from "src/helpers/string";

/***
* the typescript interfaces are mostly generated from types io-ts https://github.com/gcanti/io-ts
* io-ts allows us to manipulate types on runtime, after compilation and so doings things
* like typeChecking an API against its schema or generating a series of dummy objects from their definition
*/

/**
* dynamically checkType from a io-ts type against an object 
*/
export const checkType = (Type: t.Type<any>) => (obj: any) => {
    if (!Type) console.error('[checkType] the io-ts Type provided does not exists!')
    let result = Type.decode(obj)
    let report = PathReporter.report(result)
    if (result.isRight()) {
        return true
    } else {
        let repArr = report[0].split('/')
        console.error('[checkType] an object differ from its expected typescript definition: ', repArr, 'obj: ',obj)
        return false
    }
}

export {t}


/**
* create recursively an empty/dummy object from its io-ts definition
*/
type typedObjFlavor = 'empty' | 'random'
export const generateTypedObj = (flavor: typedObjFlavor = 'empty') => (Type: t.Type<any>):any => {
    
    const generateValue = (type:string) => {
        switch (type) {
            case 'number':
                return (flavor === 'empty') ? 0 : random(0, 1000000000) / 1000
            case 'Integer':
                return (flavor === 'empty') ? 0 : random(0, 1000000000)
            case "string":
                return (flavor === 'empty') ? "" : randomString(random(0,100));
            case "null":
                return null
            case "dictionary":
            case "object":
            case "any":
                if (flavor === 'empty') return {}
                else {
                    let obj = {}
                    for (let i = 0; i < random(0, 20); i++) {
                        obj[randomString(10, 'alphanum')] = randomString(random(0,100)) 
                    }
                    return obj
                }
            default:
                return ''
                break;
            
        }
    }

    const baseTypes = ['Integer', 'string', 'number', 'any', 'object', 'null']
    
    // if type is undefined
    if (!Type) return undefined

    let Type2:any = Type

    // if is simple
    if (baseTypes.includes(Type.name)) return generateValue(Type.name)
    
    // if dictionnary 
    if (Type2._tag === "DictionaryType") return generateValue('dictionary')
    
    // if has children
    if (Type2.props) {
        let res = {}
        each(Type2.props, (prop:any, name:string) => {
            
            if (baseTypes.includes(prop.name)) {
                // PLAIN 
                res[name] = generateValue(prop.name)
            } else {
                // ELSE TYPE, RECURSIVELY APPLY
                res[name] = generateTypedObj(flavor)(prop)
            }
        })
        return res
    }
    
    // if arrayType
    if (Type2._tag === "ArrayType") {
        let resArr:any[] = []
        for (let i = 0; i < random(0, 30); i++) {
            resArr.push(generateTypedObj(flavor)(Type2.type))
        }
        return resArr
    }

    // if has types
    if (Type2.types) {

        // if union, take randomly the
        if (Type2._tag === "UnionType") return generateTypedObj(flavor)(Type2.types[random(0,Type2.types.length)])
        if (Type2._tag === "IntersectionType") {
            let res = {}
            each(Type2.types, type => {
                res = Object.assign(res, generateTypedObj(flavor)(type))
            })
            return res
        }
    }

    if (Type2.type) return generateTypedObj(flavor)(Type2.type)
    
    return Type2._tag + " type not found"
}

/**
* generate a typed-valid dummy object from its io-ts definition
*/
export const dummyTypedObj = generateTypedObj('random')

/**
* generate a typed-valid empty object from its io-ts definition
*/
export const emptyTypedObj = generateTypedObj('empty')





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
