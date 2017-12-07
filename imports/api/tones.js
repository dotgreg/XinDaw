import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';

import {each} from 'lodash';

export const Tones = new Mongo.Collection('tones');

if (!Meteor.isServer) return false

Meteor.publish('tones', () => Tones.find())

Meteor.methods({
  'tones.insert'(tone) {
    console.log('insert', tone.soundId)
    Tones.insert(tone);
    // each(tone.options.vars, v => {
    //   console.log(v.persistedValue)
    // })
  },

  'tones.removeFromSoundId'(soundId) {
    Tones.remove({soundId: soundId});
    console.log('removeFromSoundId', soundId, Tones.find().count())
    // console.log('removeFromSoundId', soundId, Tones.find().count())
  },

  'tones.removeAll'() {
    console.log('removeAll')
    Tones.remove({});
  },

  'tones.update'(tone) {
    console.log('update')
    Tones.update(tone._id, { $set: tone })
  }
});
