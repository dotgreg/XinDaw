import { withTracker } from 'meteor/react-meteor-data';

import { Meteor } from 'meteor/meteor'

import { Tones } from '/imports/api/tones.js';
import { Sounds } from '/imports/api/sounds.js';
import { Songs } from '/imports/api/songs.js';

import { find, times, each } from 'lodash';

import React from 'react';
import styled from 'styled-components';

import MixTable from '../mixer/MixTable';
import SoundPush from '../sound/SoundPush.jsx';

class MixerScreen2 extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      songSounds: [],
      selectedSong: false
    }
  }

  componentWillUpdate(nextProps, nextState) {
    // get the selected song and its related sounds
    let selectedSong = find(nextProps.songs, {selected: true})
    let songSounds = times(selectedSong.sounds.length, id => Sounds.findOne(selectedSong.sounds[id]))

    nextState.songSounds = songSounds
    nextState.selectedSong = selectedSong
  }

	render() {
		return (
      <div className="Mixer2">
        <SoundsPushs>
          {this.state.songSounds.map(sound =>
            <SoundPush key={`${sound._id}-songSound`} sound={sound} type="songSound"/>
          )}
        </SoundsPushs>
        <MixTable tones={this.props.tones} />
      </div>
    )
  }
}

// CSS

const SoundsPushs = styled.div`
  display: flex;
  flex-wrap: wrap;
  // justify-content: space-between;
  flex-direction: row;
`;


//
// DATA CONTAINER (METEOR)
//

export default withTracker(props => {
  Meteor.subscribe('sounds');
  Meteor.subscribe('songs');
  Meteor.subscribe('tones');
  return {
    songs: Songs.find({}, { sort: { createdAt: -1 } }).fetch(),
    sounds: Sounds.find({}, { sort: { createdAt: -1 } }).fetch(),
    tones: Tones.find({}, { sort: { createdAt: -1 } }).fetch()
  };
})(MixerScreen2);
