import R from 'ramda';

// ARRAY MANIP
//// +
// export const arrayWithThisObj = (obj, array) => [...array, obj]

//// -
export const arrayWithoutThis = R.curry((prop, val, array) => R.filter(item => item[prop] !== val, array))

//// get
export const getThis = R.curry((prop, val, array) => R.find(item => item[prop] === val, array))
