import {findIndex, isNumber, curry, filter, each, isArray} from 'lodash'

//////////////////////////////////////////////
// GETTERS
//////////////////////////////////////////////

/////////////
// prop => index
/////////////

const getIndexFromProp = curry((prop:string, value:any, arr:any[]) => {
    let i = findIndex(arr, item => item[prop] === value)
    if (!isNumber(i)) return console.warn(`getIndexFromProp no index found prop:${prop} value: ${value}`)
    return i
})
export const getIndexFromId = getIndexFromProp('id')

/////////////
// prop => item
/////////////
const getItemFromProp = curry((prop:string, value:any, arr:any[]) => {
    let res = filter(arr, item => item[prop] === value)
    if (res[0]) return res[0]
    else return false
})

export const getItemFromId = getItemFromProp('id')
export const getEditedItem = getItemFromProp('edited', true)
export const getActiveItem = getItemFromProp('active', true)

/////////////
// ids => objs
/////////////

const getObjsFromIdsInArr = curry((ids:string[], arr:any[]): any[] => {
    if (!ids) return []
    return ids.map(id => getItemFromId(id, arr))
})
export const getSoundsFromIds = getObjsFromIdsInArr()


//////////////////////////////////////////////
// MUTATORS
//////////////////////////////////////////////

/////////////
// update item & item prop
/////////////

export const arrayWithUpdatedItem = curry((item:any, arr:any[]) => {
    let index = getIndexFromId(item.id, arr)
    if (isNumber(index)) arr[index] = item
    return arr
})

const arrayWithUpdatedItemProp = curry((prop:string, value:any, id:string, arr:any[]) => {
    let index = getIndexFromId(id, arr)
    if (isNumber(index)) arr[index][prop] = value
    return arr
})
export const arrayWithItemToEdited = arrayWithUpdatedItemProp('edited', true)
export const arrayWithItemToActive = arrayWithUpdatedItemProp('active', true)

/////////////
// update all
/////////////
export const arrayWithUpdatedItemsProp = curry((prop:string, value:any, arr:any[]) => {
    return arr.map(item => {
        item[prop] = value
        return item
    })
})
export const arrayWithItemsToNotEdited = arrayWithUpdatedItemsProp('edited', false)
export const arrayWithItemsToNotActive = arrayWithUpdatedItemsProp('active', false)

/////////////
// arr > add
/////////////
export const arrayWithItem = curry((item:any, arr:any[]) => {
    if (!isArray(arr)) arr = []
    arr.push(item)
    return arr
})

/////////////
// arr > remove
/////////////
export const arrayWithoutItem = curry((itemToDelete:any, arr:any[]) => {
    arr = filter(arr, item => item.id !== itemToDelete.id)
    return arr
})

/////////////
// item > arr > add
/////////////
const arrayWithItemArrPropInArray = curry((prop:string, itemToAdd:any, id:string, arr:any[]) => {
    let index = getIndexFromId(id, arr)
    if (!isNumber(index) || !arr || !arr[index as number] || !arr[index as number][prop]) return arr
    if (isNumber(index)) arr[index][prop].push(itemToAdd)
    return arr
})
export const addSoundToPart = arrayWithItemArrPropInArray('sounds')

/////////////
// item > arr > remove
/////////////
const arrayWithoutItemArrPropInArray = curry((prop:string, itemToRemove:any, id:string, arr:any[]) => {
    let index = getIndexFromId(id, arr)
    if (isNumber(index)) arr[index][prop] = filter(arr[index][prop], item => item !== itemToRemove)
    return arr
})
export const removeSoundToPart = arrayWithoutItemArrPropInArray('sounds')

