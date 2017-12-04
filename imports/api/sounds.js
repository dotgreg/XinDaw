import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';
import {random, each, filter} from 'lodash';

import {Songs} from './songs';

export const Sounds = new Mongo.Collection('sounds');

if (!Meteor.isServer) return false

Meteor.publish('sounds', () => Sounds.find())

Meteor.methods({
  'sounds.insert'(code) {

    check(code, String);

    Sounds.insert({
      'name': `sound-${random(10000)}`,
      'tags': ``,
      'selected': false,
      'muted': false,
      'code': code,
      'createdAt': new Date()
    });
  },
  'sounds.remove'(soundId) {
    check(soundId, String);

    Sounds.remove(soundId);

    // Clean orphan sounds id in songs
    Meteor.call('songs.cleanSoundsSongs')
  },
  'sounds.clone'(soundId) {
    check(soundId, String);
    let sound = Sounds.findOne(soundId)
    Sounds.insert({
      'name': `${sound.name}-clone`,
      'tags': sound.tags,
      'selected': sound.selected,
      'muted': sound.muted,
      'code': sound.code,
      'createdAt': new Date()
    });
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
  },
  'sounds.updateName'(soundId, name) {
    check(soundId, String);
    Sounds.update(soundId, { $set: { name: name } })
  },
  'sounds.updateTags'(soundId, tags) {
    check(soundId, String);
    Sounds.update(soundId, { $set: { tags: tags } })
  }
});
