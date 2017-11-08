export let evalCode = (code) => {

  try {
    let result =  eval(`(function self(){${code}}())`);
    let error = `EDITOR RESULT ERROR => result structure returned not correct ({t:'type', c:'object/number', o:'options'})`

    if(!result || typeof result !== 'object') return {status: 'err', body: error}
    if(!result.t) return {status: 'err', body: error}
    if(!result.c) return {status: 'err', body: error}

    return {status: 'ok', body: result}

  } catch (e) {
    let error = `EDITOR SYNTAX ERROR => ${e.message}`
    return {status: 'err', body: error}
  }
}
