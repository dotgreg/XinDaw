import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';
import { random, filter } from 'lodash';

export const Songs = new Mongo.Collection('songs');

if (!Meteor.isServer) return false

Meteor.methods({
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

  'songs.addSound'(songId, soundId) {
    let song = Songs.findOne(songId)
    Songs.update(songId, { $set: { sounds: song.sounds.push(soundId) } })
  },

  'songs.removeSound'(songId, soundId) {
    let song = Songs.findOne(songId)
    Songs.update(songId, { $set: { sounds: filter(song.sounds, s => s !== soundId) } })
  },

  'songs.selectSoung'(songId, soundId) {
    Songs.update(songId, { $set: { selectedSound: soundId } })
  }
});
