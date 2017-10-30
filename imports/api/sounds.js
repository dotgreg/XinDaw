import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';
import {random} from 'lodash';

export const Sounds = new Mongo.Collection('sounds');

if (!Meteor.isServer) return false

Meteor.publish('sounds', () => Sounds.find())

Meteor.methods({
  'sounds.insert'(code) {

    check(code, String);

    Sounds.insert({
      'name': `sound-${random(10000)}`,
      'selected': false,
      'muted': false,
      'code': code,
      'createdAt': new Date()
    });
  },
  'sounds.remove'(soundId) {
    check(soundId, String);

    Sounds.remove(soundId);
  },
  //
  // UPDATERS
  //
  'sounds.select'(soundId) {
    check(soundId, String);

    Sounds.update({ selected: true }, { $set: { selected: false } })
    Sounds.update(soundId, { $set: { selected: true } })
  },
  'sounds.toggleMute'(soundId) {
    check(soundId, String);
    let sound = Sounds.findOne(soundId)
    Sounds.update(soundId, { $set: { muted: !sound.muted } })
  },
  'sounds.updateCode'(soundId, code) {
    check(soundId, String);
    Sounds.update(soundId, { $set: { code: code } })
  }
});
