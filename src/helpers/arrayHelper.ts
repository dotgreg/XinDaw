import {findIndex, isNumber, curry, filter, each} from 'lodash'

//
// GETTERS
//

const getIndexFromProp = curry((prop:string, value:any, arr:any[]) => {
    let i = findIndex(arr, item => item[prop] === value)
    if (!isNumber(i)) return console.warn(`getIndexFromProp no index found prop:${prop} value: ${value}`)
    return i
})
export const getIndexFromId = getIndexFromProp('id')


const getItemFromProp = curry((prop:string, value:any, arr:any[]) => {
    let res = filter(arr, item => item[prop] === value)
    if (res[0]) return res[0]
    else return false
})

export const getItemFromId = getItemFromProp('id')
export const getEditedItem = getItemFromProp('edited', true)
export const getActiveItem = getItemFromProp('active', true)

const getObjsFromIdsInArr = curry((ids:string[], arr:any[]): any[] => {
    if (!ids) return []
    return ids.map(id => getItemFromId(id, arr))
})
export const getSoundsFromIds = getObjsFromIdsInArr()


//
// MUTATORS
//

// update
export const updateItemInArray = curry((item:any, arr:any[]) => {
    let index = getIndexFromId(item.id, arr)
    if (isNumber(index)) arr[index] = item
    return arr
})

const updateItemPropInArray = curry((prop:string, value:any, id:string, arr:any[]) => {
    let index = getIndexFromId(id, arr)
    if (isNumber(index)) arr[index][prop] = value
    return arr
})
export const updateItemToEdited = updateItemPropInArray('edited', true)
export const updateItemToActive = updateItemPropInArray('active', true)

// all
export const updateItemsPropInArray = curry((prop:string, value:any, arr:any[]) => {
    return arr.map(item => {
        item[prop] = value
        return item
    })
})
export const updateItemsToNotEdited = updateItemsPropInArray('edited', false)
export const updateItemsToNotActive = updateItemsPropInArray('active', false)


// add
export const addItem = curry((item:any, arr:any[]) => {
    arr.push(item)
    return arr
})

// delete
export const removeItem = curry((itemToDelete:any, arr:any[]) => {
    arr = filter(arr, item => item.id !== itemToDelete.id)
    return arr
})


// arr prop add
const addItemArrPropInArray = curry((prop:string, itemToAdd:any, id:string, arr:any[]) => {
    let index = getIndexFromId(id, arr)
    if (isNumber(index)) arr[index][prop].push(itemToAdd)
    return arr
})
export const addSoundToPart = addItemArrPropInArray('sounds')

const removeItemArrPropInArray = curry((prop:string, itemToRemove:any, id:string, arr:any[]) => {
    let index = getIndexFromId(id, arr)
    if (isNumber(index)) arr[index][prop] = filter(arr[index][prop], item => item !== itemToRemove)
    return arr
})
export const removeSoundToPart = removeItemArrPropInArray('sounds')

