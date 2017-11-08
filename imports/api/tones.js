import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';

export const Tones = new Mongo.Collection('tones');

if (!Meteor.isServer) return false

Meteor.publish('tones', () => Tones.find())

Meteor.methods({
  'tones.insert'(tone) {
    Tones.insert(tone);
  },

  'tones.remove'(toneId) {
    Tones.remove(songId);
  },

  'tones.update'(tone) {
    Tones.update(tone.id, { $set: tone })
  }
});
