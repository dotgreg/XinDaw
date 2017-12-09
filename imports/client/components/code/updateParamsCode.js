import { Meteor } from 'meteor/meteor'
import { intersection, filter, each, isNumber } from 'lodash'

import { Tones } from '/imports/api/tones';
Meteor.subscribe('tones');

import { Sounds } from '/imports/api/sounds';
Meteor.subscribe('sounds');

// Function that take the code that generate a tone and inject into the o/options array
// the current tone value of the parameter
export let updateParamsCode = (soundId, toneId) => {
  let sound = Sounds.findOne(soundId)
  let tone = Tones.findOne(toneId)

  let newCode = sound.code
  each(tone.options.vars, v => {
    let regString = `\\[(\\'|\\")${v[0]}(\\'|\\")\\,(.+)\\,(.+)\\,(.+)\\,(.+)(\\,(.+))*\\]`
    let regex = new RegExp(regString,"gi")

    let nameProp = v[0]
    let newValue = isNumber(v[1].persistedValue) ? v[1].persistedValue : v[1][nameProp]

    // newCode = newCode.replace(regex, `['${v[0]}'$3, ${newValue}]`)
    newCode = newCode.replace(regex, `['${v[0]}',$3,$4,$5,${newValue}]`)
  })
  Meteor.call('sounds.updateCode', soundId, newCode)
}
