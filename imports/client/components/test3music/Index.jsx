import { createContainer, withTracker } from 'meteor/react-meteor-data';
import { Meteor } from 'meteor/meteor'
import { Sounds } from '/imports/api/sounds.js';
import { Songs } from '/imports/api/songs.js';

import React from 'react';
import { find, times } from 'lodash';

import AddSound from './AddSound.jsx';
import Sound from './Sound.jsx';

import AddSong from './AddSong.jsx';
import Song from './Song.jsx';

import Editor from './Editor.jsx';
import Player from './Player.jsx';


export class Test3Music extends React.Component {

  constructor(props){
    super(props)
    this.state = {
      songSounds: []
    }
  }

  componentWillUpdate(nextProps, nextState) {
    let selectedSong = find(nextProps.songs, {selected: true})
    let sounds = times(selectedSong.sounds.length, id => Sounds.findOne(selectedSong.sounds[id]))
    nextState.songSounds = sounds
  }

	render() {
		return (
      <div className="test3Music">
        <Editor
          sound={this.props.selectedSound} />

        <h3> SONG SOUNDS</h3>

        <ul>
          {this.state.songSounds.map(sound =>
            <Sound key={sound._id} sound={sound} type="songSound"/>
          )}
        </ul>

        <h3> SOUNDS</h3>

        <ul>
          {this.props.sounds.map(sound =>
            <Sound key={sound._id} sound={sound} />
          )}
        </ul>
        <AddSound />

        <h3> SONGS </h3>
        <ul>
          {this.props.songs.map(song =>
            <Song key={song._id} song={song} />
          )}
        </ul>

        <AddSong />

        <Player sounds={this.state.songSounds}/>

      </div>
    )
  }
}

export default withTracker(props => {
  Meteor.subscribe('sounds');
  Meteor.subscribe('songs');
  return {
    sounds: Sounds.find({}, { sort: { createdAt: -1 } }).fetch(),
    songs: Songs.find({}, { sort: { createdAt: -1 } }).fetch(),
    selectedSound: Sounds.findOne({selected: true})
  };
})(Test3Music);
