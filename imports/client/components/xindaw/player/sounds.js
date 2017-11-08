import { evalCode } from './evalCode';
import { stopTone, startTone, persistTone } from './tones';

import {filter, reduce, intersection, indexOf, find, isEqual, each} from 'lodash';

tones = []
window.tones = tones

export let updateSound = (sound, props) => {

  removeSound(sound, true)

  let result = evalCode(sound.code)

  if (result.status === 'err') return result
  if (sound.muted) return {status:'ok'}

  result = result.body
  result = {id: sound._id, name: sound.name, tone: result.c, type: result.t, options: result.o}

  startTone(result.tone)
  tones.push(result)

  persistTone(result)

  return {status:'ok'}
}

export let removeSound = (sound) => {
  let old = find(tones, {'id': sound._id})
  old && stopTone(old.tone)

  tones = filter(tones, t => t.id !== sound._id)
  Meteor.call('tones.remove', sound._id)
}
