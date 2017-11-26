import { each, filter } from 'lodash'

import Tone from 'tone';
import teoria from 'teoria'
import _ from 'lodash'

export let evalCode = (code) => {
  console.log('evalCode '+code)
  try {
    let result =  eval(`(function self(){${code}}())`);
    let error = `EDITOR RESULT ERROR => result structure returned not correct ({t:'type', c:'object/number', o:'options', e: 'elementsToDisposeWhenSoundGetDeleted'})`

    if(!result || typeof result !== 'object') return {status: 'err', body: error}
    if(!result.t) return {status: 'err', body: error}
    if(!result.c) return {status: 'err', body: error}
    if(!result.e) return {status: 'err', body: error}
    if(result.o && result.o.vars) {
      // console.log(typeof result.o.vars[0], result.o.vars[0] instanceof Array, filter(result.o.vars, v => typeof v !== 'array'))
      let error = {status: 'err', body: 'EDITOR RESULT ERROR => each result.o.vars structure should be [NAMEVAR, VAR, MINVAL, MAXVAL]'}
      if (filter(result.o.vars, v => v instanceof Array).length !== result.o.vars.length) return error
    }

    return {status: 'ok', body: result}

  } catch (e) {
    let error = `EDITOR SYNTAX ERROR => ${e.message}`
    return {status: 'err', body: error}
  }
}
