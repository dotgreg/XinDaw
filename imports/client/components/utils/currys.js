import _ from 'ramda';
import R from 'ramda';

//// NUMBERS
export const intervalWithIntVariation = (callback, min, max, step, intTime) => {
  step = step || 1
  intTime = intTime || 100
  let nb = min
  let up = true

  return setInterval(() => {
    nb = up ? nb + step : nb - step
    if (nb === max) up = false
    if (nb === min) up = true
    callback(nb)
  }, intTime)
}



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
