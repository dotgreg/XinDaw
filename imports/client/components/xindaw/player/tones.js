import Tone from 'tone';
import { Meteor } from 'meteor/meteor'

import { Tones } from '/imports/api/tones';
import { each, find, keys, get, set } from 'lodash';

Meteor.subscribe('tones');

export let getToneType = tone => {
  // if (typeof tone === 'object' && tone.constructor.toString().match(/Tone\.Sequence/) && tone.constructor.toString().match(/Tone\.Sequence/).length === 1) return 'loop'
  // if (typeof tone === 'object' && tone.constructor.toString().match(/Tone\.Loop/) && tone.constructor.toString().match(/Tone\.Loop/).length === 1) return 'loop'
  if (typeof tone === 'number') return 'transport-event'
  else if (typeof tone === 'object') return 'loop'

  return false
}

export let stopTone = tone => {
  let type = getToneType(tone)
  type === 'loop' && Tone.Transport.scheduleOnce(t => tone.stop().cancel().dispose(), 0)
  type === 'transport-event' && Tone.Transport.clear(tone)
}

export let startTone = tone => {
  let type = getToneType(tone)
  type === 'loop' && Tone.Transport.scheduleOnce(t => tone.start(0), 0)
}

export let persistTone = tone => {
  each(tone.options.vars, v => v.persistedValue = v.value)
  Meteor.call('tones.insert', tone)
}

export let observeTones = () => {
  var handle = Tones.find().observeChanges({
    changed: function(id, field) {
      console.log(id, field)
      let soundId = Tones.findOne(id).id
      let tone = find(tones, {id: soundId})
      let vars = field['options']['vars']

      each(vars, (v,i) => {
        tone['options']['vars'][i].value = v.persistedValue
      })
    }
  })
}
