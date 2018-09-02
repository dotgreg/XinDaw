import {findIndex, isNumber, curry, filter, each, isArray, uniq, unionBy} from 'lodash'

//////////////////////////////////////////////
// GETTERS
//////////////////////////////////////////////

/////////////
// prop => index
/////////////

const getIndexFromProp = curry((prop:string, value:any, arr:any[]):number => {
    let i = findIndex(arr, item => item[prop] === value)
    if (!isNumber(i)) return -1; 
    // console.warn(`getIndexFromProp no index found prop:${prop} value: ${value}`)
    return i
})
export const getIndexFromId = getIndexFromProp('id')
export const getEditedIndex = getIndexFromProp('edited', true)

/////////////
// prop => item
/////////////
export const getItemFromProp = curry((prop:string, value:any, arr:any[]) => {
    let res = filter(arr, item => item[prop] === value)
    if (res[0]) return res[0]
    else return false
})

export const getItemFromId = getItemFromProp('id')
export const getItemFromName = getItemFromProp('name')
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
export const getControlsFromIds = getObjsFromIdsInArr()


//////////////////////////////////////////////
// MUTATORS
//////////////////////////////////////////////

/////////////
// arr > item(->prop) update
/////////////


/** update an array item, return array, indexed by [key] prop */
export const updateArrayItem = (key:string) => (item:any) => (arr:any[]) => {
    let index = getIndexFromProp(key, item[key], arr)
    if (!isNumber(index)) return arr
    if (index === -1) arr.push(item)
    arr[index] = item
    return arr
}

/** update an array item, return array, indexed by id prop */
export const updateIdArrayItem = updateArrayItem('id')

const arrayWithUpdatedItemPropFromId = curry((prop:string, value:any, id:string, arr:any[]) => {
    let index = getIndexFromId(id, arr)
    if (!prop || !value || !id) return arr
    if (isNumber(index)) arr[index][prop] = value
    return arr
})
export const arrayWithItemToEdited = arrayWithUpdatedItemPropFromId('edited', true)
export const arrayWithItemToActive = arrayWithUpdatedItemPropFromId('active', true)
export const arrayWithUpdatedValue = arrayWithUpdatedItemPropFromId('value')

/////////////
// arr > allItems[prop] update
/////////////
export const allItemsPropTo = curry((prop:string, value:any, arr:any[]) => {
    return arr.map(item => {
        item[prop] = value
        return item
    })
})
export const arrayWithItemsToNotEdited = allItemsPropTo('edited', false)
export const arrayWithItemsToNotActive = allItemsPropTo('active', false)

/////////////
// arr + arr2 (prop as id)
/////////////

export const mergeArraysByProp = curry((prop:string, arrBase:any[], arrOverrider:any[]) => {
    return unionBy(arrOverrider, arrBase, prop)
})

/////////////
// arr > add
/////////////
export const arrayWithItem = (item:any) => (arr:any[]) => {
    if (!isArray(arr)) arr = []
    arr.push(item)
    return arr
}

/////////////
// arr > remove
/////////////
export const arrayWithoutItem = curry((itemToDelete:any, arr:any[]) => {
    arr = filter(arr, item => item.id !== itemToDelete.id)
    return arr
})

/////////////
// arr > item > arr > add
/////////////
const addArrayItemInArrayItem = (parentPropArray:string) => (childToAdd:any) => (parentId:string) => (arr:any[]) => {
    let index = getIndexFromId(parentId, arr)
    if (!isNumber(index) || !arr || !arr[index as number] || !arr[index as number][parentPropArray]) return arr
    if (isNumber(index)) arr[index][parentPropArray].push(childToAdd)
    arr[index][parentPropArray] = uniq(arr[index][parentPropArray])
    return arr
}

export const addSoundToPart = addArrayItemInArrayItem('sounds')


const addArrayItemInArrayItemLodash = curry((prop:string, itemToAdd:any, id:string, arr:any[]) => {
    let index = getIndexFromId(id, arr)
    if (!isNumber(index) || !arr || !arr[index as number] || !arr[index as number][prop]) return arr
    if (isNumber(index)) arr[index][prop].push(itemToAdd)
    arr[index][prop] = uniq(arr[index][prop])
    return arr
})
export const addSoundToPartLodash = addArrayItemInArrayItemLodash('sounds')

/////////////
// arr > item > arr > remove
/////////////
const arrayWithoutPropArrayItem = curry((prop:string, itemToRemove:any, id:string, arr:any[]) => {
    let index = getIndexFromId(id, arr)
    if (isNumber(index)) arr[index][prop] = filter(arr[index][prop], item => item !== itemToRemove)
    return arr
})
export const removeSoundToPart = arrayWithoutPropArrayItem('sounds')




// new arrr(array)
//     .indexProp('id')
//     .each(item => item.update({name: 'newName'}) )
//     .values()

// update(array).select(item => item.name === 'dfskfdslj').modify(item.name = 'another value')
// upsert(array).select(item => item.name === 'dfskfdslj').

// updateArray(array, item)

// export const updateArrayItem = curry((prop:string, item:any, arr:any[]) => {
//     let index = getIndexFromProp(prop, item[prop], arr)
//     if (!isNumber(index)) return arr
//     if (index === -1) arr.push(item)
//     arr[index] = item
//     return arr
// })
    


// const compose = (...fns) =>
//   fns.reduceRight((prevFn, nextFn) =>
//     (...args) => nextFn(prevFn(...args)),
//     value => value
//   );

// const testComposition = compose(
//     val => { console.log(1); return `1<${val}>`; },
//     val => { console.log(2); return `2<${val}>`; },
//     val => { console.log(3); return `3<${val}>`; 
// )

// compose(
//     mergeSelectedInArray
//     modifySelected,
//     select,
// )


// updateArrayItem(
//     setProp('property', value)
//     select('id', sound)
// )

// // modifyArray(
// //     modifyProp('property', value)
// //     select('id', sound)
// // )


// testComposition('hello')