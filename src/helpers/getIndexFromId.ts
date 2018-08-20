import {findIndex, isNumber} from 'lodash'

export const getIndexFromId = (arr:any[], id:string) => {
    let i = findIndex(arr, item => item.id === id)
    if (!isNumber(i)) return false
    return i
}