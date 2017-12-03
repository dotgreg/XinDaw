import { evalCode } from './evalCode';
import { stopTone, startTone, persistTone } from './tones';

import {filter, isFunction, reduce, intersection, indexOf, find, isEqual, each, get} from 'lodash';

tones = []
window.tones = tones

export let updateSound = (sound, props) => {

  removeSound(sound, true)

  if (sound.muted) return {status:'ok'}

  let result = evalCode(sound.code)

  if (result.status === 'err') return result

  result = result.body
  result = {id: sound._id, name: sound.name, tone: result.c, elementsToDispose: result.e, options: result.o}

  startTone(result.tone)
  tones.push(result)

  persistTone(result)

  return {status:'ok'}
}

export let removeSound = (sound) => {
  let old = find(tones, {'id': sound._id})

  old && stopTone(old.tone)

  if (get(old, 'elementsToDispose')) Tone.Transport.scheduleOnce(t => {
    each(old.elementsToDispose, e => {
      // if we have elementsToDispose, try to dispose them (tonejs)
      if (isFunction(e.dispose)) try { e.dispose() } catch (e) { console.log('error when dispose() :'+ e.message) }

      // then put them all equal to null to force the garbage collection process
      e = null
    })
  }, 1)

  tones = filter(tones, t => t.id !== sound._id)
  Meteor.call('tones.remove', sound._id)
}
