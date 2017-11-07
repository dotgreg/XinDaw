import { createContainer, withTracker } from 'meteor/react-meteor-data';
import { Meteor } from 'meteor/meteor'
import { Sounds } from '/imports/api/sounds.js';
import { Songs } from '/imports/api/songs.js';

import React from 'react';
import { find, times, random } from 'lodash';

import AddSound from './AddSound.jsx';
import Sound from './Sound.jsx';

import AddSong from './AddSong.jsx';
import Song from './Song.jsx';

import Bpm from './Bpm.jsx';
import Editor from './Editor.jsx';
import Mixer from './Mixer.jsx';
import Player from './Player.jsx';
import Explorer from './explorer/Explorer.jsx';

import styled from 'styled-components';

export class Xindaw extends React.Component {

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

  //
  // CHILD2PARENTS DATA FLOWS
  //

  // Tones objs : PLAYER -> INDEX
  onTonesUpdate = tones =>  this.setState({tones: tones})

	render() {
		return (
      <div className="test3Music">

        <Panel w={30}>
          <Bpm />

          <p> SOUNDS SONG </p>
          <ul>
            {this.state.songSounds.map(sound =>
              <Sound key={`${sound._id}-songSound`} sound={sound} type="songSound"/>
            )}
          </ul>

          <Mixer tones={this.state.tones} />

          <p> SONGS </p>
          <ul>
            {this.props.songs.map(song =>
              <Song key={song._id} song={song} />
            )}
          </ul>
          <AddSong />
        </Panel>

        <Panel w={40}>
          <Editor
            sound={this.props.selectedSound} />

          <Player sounds={this.state.songSounds} outputTones={this.onTonesUpdate}/>
        </Panel>

        <Panel w={30}>
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

export default withTracker(props => {
  Meteor.subscribe('sounds');
  Meteor.subscribe('songs');
  return {
    sounds: Sounds.find({}, { sort: { createdAt: -1 } }).fetch(),
    songs: Songs.find({}, { sort: { createdAt: -1 } }).fetch(),
    selectedSound: Sounds.findOne({selected: true})
  };
})(Xindaw);
