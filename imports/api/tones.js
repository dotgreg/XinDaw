import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';

import {each} from 'lodash';

export const Tones = new Mongo.Collection('tones');

if (!Meteor.isServer) return false

Meteor.publish('tones', () => Tones.find())

Meteor.methods({
  'tones.insert'(tone) {
    Tones.insert(tone);
    // each(tone.options.vars, v => {
    //   console.log(v.persistedValue)
    // })
  },

  'tones.remove'(toneId) {
    Tones.remove({id: toneId});
  },

  'tones.removeAll'() {
    Tones.remove({});
  },

  'tones.update'(tone) {
    Tones.update(tone._id, { $set: tone })
  }
});
