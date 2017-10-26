import R from 'ramda';

//// ARRAY MANIP
// +
// export const arrayWithThisObj = (obj, array) => [...array, obj]

// -
export const arrayWithoutObjFrom = R.curry((prop, val, array) => R.filter(item => item[prop] !== val, array))

// get
export const objInArrayFrom = R.curry((idProp, idVal, array) => R.find(R.propEq(idProp, idVal), array))
export const indexObjInArrayFrom = R.curry((idProp, idVal, array) => R.findIndex(R.propEq(idProp, idVal), array))

// update
export const arrayWithUpdatedObjFrom = R.curry((idProp, idVal, update, array) => R.update(indexObjInArrayFrom(idProp, idVal, array), update, array))
