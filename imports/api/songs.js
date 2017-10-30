import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';
import { random, filter, uniq } from 'lodash';

import {Sounds} from './sounds';

export const Songs = new Mongo.Collection('songs');

if (!Meteor.isServer) return false

Meteor.publish('songs', () => Songs.find())

Meteor.methods({
  'helloworld' () {
    return `helloworld-${random(10000)}`
  },
  'songs.insert'() {
    Songs.insert({
      'name': `song-${random(10000)}`,
      'selected': false,
      'selectedSound': false,
      'sounds': [],
      'createdAt': new Date()
    });
  },

  'songs.remove'(songId) {
    Songs.remove(songId);
  },

  'songs.select'(songId) {
    Songs.update({ selected: true }, { $set: { selected: false } })
    Songs.update(songId, { $set: { selected: true } })
  },

  'songs.addSound'(soundId) {
    let song = Songs.findOne({selected: true})
    Songs.update(song._id, { $set: { sounds: uniq([...song.sounds, soundId]) } })
  },

  'songs.removeSound'(soundId) {
    let song = Songs.findOne({selected: true})
    Songs.update(song._id, { $set: { sounds: filter(song.sounds, s => s !== soundId) } })
  },

  'songs.selectSound'(soundId) {
    let song = Songs.findOne({selected: true})
    Songs.update(song._id, { $set: { selectedSound: soundId } })
  }
});
