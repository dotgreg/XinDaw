import { createContainer } from 'meteor/react-meteor-data';
import {Sounds} from '/imports/api/sounds.js';
import {Songs} from '/imports/api/songs.js';

import React from 'react';

import AddSound from './AddSound.jsx';
import Sound from './Sound.jsx';

import AddSong from './AddSong.jsx';
import Song from './Song.jsx';

import Editor from './Editor.jsx';
import Player from './Player.jsx';


export class Test3Music extends React.Component {

  constructor(props){
    super(props)
  }

	render() {
		return (
      <div className="test3Music">
        test3Music

        <Editor
          sound={this.props.selectedSound} />

        <h1> SOUNDS </h1>
        <ul>
          {this.props.sounds.map(sound =>
            <Sound key={sound._id} sound={sound} />
          )}
        </ul>
        <AddSound />

        <h1> SONGS </h1>
        <ul>
          {this.props.songs.map(song =>
            <Song key={song._id} song={song} />
          )}
        </ul>

        <AddSong />

        <Player />

      </div>
    )
  }
}

export default createContainer(() => {
  return {
    sounds: Sounds.find({}, { sort: { createdAt: -1 } }).fetch(),
    songs: Songs.find({}, { sort: { createdAt: -1 } }).fetch(),
    selectedSound: Sounds.findOne({selected: true})
  };
}, Test3Music)
