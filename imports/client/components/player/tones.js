import Tone from 'tone';
import { Meteor } from 'meteor/meteor'

import { Tones } from '/imports/api/tones';
import { each, find, get, set, isNumber } from 'lodash';

Meteor.subscribe('tones');

export let getToneType = tone => {
  if (typeof tone === 'number') return 'transport-event'
  else if (typeof tone === 'object') return 'loop'

  return false
}

export let stopTone = tone => {
  let type = getToneType(tone)
  type === 'loop' && Tone.Transport.scheduleOnce(t => tone.stop().dispose(), 1)
  type === 'transport-event' && Tone.Transport.clear(tone)
  type === 'transport-event' && console.log('transport event' + tone)
}

export let startTone = tone => {
  let type = getToneType(tone)
  type === 'loop' && Tone.Transport.scheduleOnce(t => tone.start(0), 1)
}

// persist the window.tones object to a meteor collection
export let persistTone = tone => {
  if (!get(tone, 'options.vars')) return false
  each(tone.options.vars, (v,i) => {
    if (!v[1]) {
      console.warn(`the options ${v[0]} is not interpreted as its value is null`)
      tone.options.vars.splice(i, 1)
      return false
    }
    if (v[1].value) v[1].persistedValue = v[1].value
  })
  Meteor.call('tones.insert', tone)
}

// if we have some vars inside the options that changed
// spread the change to value inside  window.tones to modify sound
export let observeTones = () => {
  setTimeout(() => {
    console.log(window.tones)
  }, 2000)
  var handle = Tones.find().observeChanges({
    changed: function(id, field) {
      let soundId = Tones.findOne(id).id
      let tone = find(window.tones, {id: soundId})
      let vars = field['options']['vars']

      each(vars, (v,i) => {
        // if the options.vars.variable is a Tone.Param (obj), update its .value prop
        // else if a number, update the number directly
        let nameProp = tone['options']['vars'][i][0]
        v[1].persistedValue ? tone['options']['vars'][i][1].value = v[1].persistedValue : tone['options']['vars'][i][1][nameProp] = v[1][nameProp]
      })
    }
  })
}
