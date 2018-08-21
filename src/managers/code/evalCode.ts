import { filter } from 'lodash'
import config from '../../config';

export let evalCode = (code) => {

    try {
        config.debug.codeEval && console.log('[CODEEVAL] eval => start :', {code:code})
        let result =  eval(`(function self(){${code}}())`);
        let error = `EDITOR RESULT ERROR => the code should contain one c(code) var`
        
        // consol.log()
        if(!result || typeof result !== 'object') return {status: 'err', body: error}
        if(!result.c) return {status: 'err', body: error}
        if(!result.e) return {status: 'err', body: error}
        if(result.o && result.o.vars) {
            let error = {status: 'err', body: 'EDITOR RESULT ERROR => each result.o.vars structure should be [NAMEVAR, VAR, MINVAL, MAXVAL]'}
            if (filter(result.o.vars, v => v instanceof Array).length !== result.o.vars.length) return error
        }
        config.debug.codeEval && console.log('[CODEEVAL] eval => success :', {result:result})
        return {status: 'ok', body: result}
        
    } catch (e) {
        let error = `EDITOR SYNTAX ERROR => ${e.message}`
        console.warn('[CODEEVAL] eval => fail :', {result:e})
        return {status: 'err', body: error}
    }
}
