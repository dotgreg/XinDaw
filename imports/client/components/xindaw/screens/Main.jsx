import { withTracker } from 'meteor/react-meteor-data';
import { Meteor } from 'meteor/meteor'
import { Sounds } from '/imports/api/sounds.js';
import { Songs } from '/imports/api/songs.js';

import React from 'react';
import { find, times, random } from 'lodash';

import AddSound from '../AddSound.jsx';
import Sound from '../Sound.jsx';

import AddSong from '../AddSong.jsx';
import Song from '../Song.jsx';

import Bpm from '../Bpm.jsx';
import Editor from '../editor/Editor.jsx';
import Player from '../player/Player.jsx';
import Explorer from '../explorer/Explorer.jsx';
// import Explorer from '../explorer/Explorer2.jsx';

import styled from 'styled-components';

export class MainScreen extends React.Component {

  constructor(props){
    super(props)
    this.state = {
      songSounds: [],
      selectedSong: false,
      tones: []
    }
  }

  componentWillUpdate(nextProps, nextState) {
    let selectedSong = find(nextProps.songs, {selected: true})
    let sounds = times(selectedSong.sounds.length, id => Sounds.findOne(selectedSong.sounds[id]))

    nextState.songSounds = sounds
    nextState.selectedSong = selectedSong
  }

	render() {
		return (
      <div className="MainsScreen">

        <Panel w={25}>
          <Bpm />

          <p> SOUNDS SONG </p>
          <ul>
            {this.state.songSounds.map(sound =>
              <Sound key={`${sound._id}-songSound`} sound={sound} type="songSound"/>
            )}
          </ul>

          <p> SONGS </p>
          <ul>
            {this.props.songs.map(song =>
              <Song key={song._id} song={song} />
            )}
          </ul>
          <AddSong />
        </Panel>

        <Panel w={50}>
          <Editor
            sound={this.props.selectedSound} />

          <Player sounds={this.state.songSounds} />
        </Panel>

        <Panel w={25}>
          <Explorer />
          <AddSound />
        </Panel>
      </div>
    )
  }
}

const Panel = styled.div`
  width: ${props => props.w}%;
  overflow-y: scroll;
  float: left;
`;

//
// DATA CONTAINER (METEOR)
//

export default withTracker(props => {
  Meteor.subscribe('sounds');
  Meteor.subscribe('songs');
  return {
    sounds: Sounds.find({}, { sort: { createdAt: -1 } }).fetch(),
    songs: Songs.find({}, { sort: { createdAt: -1 } }).fetch(),
    selectedSound: Sounds.findOne({selected: true})
  };
})(MainScreen);
