import { each, filter } from 'lodash'
import { prepareCode } from './prepareCode'

import Tone from 'tone';
import teoria from 'teoria'

export let evalCode = (code) => {

  code = prepareCode(code)
  // console.log('evalCode '+code)

  try {
    let result =  eval(`(function self(){${code}}())`);
    let error = `EDITOR RESULT ERROR => the code should contain one c(code) var`

    if(!result || typeof result !== 'object') return {status: 'err', body: error}
    if(!result.c) return {status: 'err', body: error}
    if(!result.e) return {status: 'err', body: error}
    if(result.o && result.o.vars) {
      let error = {status: 'err', body: 'EDITOR RESULT ERROR => each result.o.vars structure should be [NAMEVAR, VAR, MINVAL, MAXVAL]'}
      if (filter(result.o.vars, v => v instanceof Array).length !== result.o.vars.length) return error
    }

    return {status: 'ok', body: result}

  } catch (e) {
    let error = `EDITOR SYNTAX ERROR => ${e.message}`
    return {status: 'err', body: error}
  }
}
