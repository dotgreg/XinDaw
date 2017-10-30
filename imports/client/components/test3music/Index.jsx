import { createContainer } from 'meteor/react-meteor-data';
import {Sounds} from '/imports/api/sounds.js';

import React from 'react';

import AddSound from './AddSound.jsx';
import Sound from './Sound.jsx';
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

        <ul>
          {this.props.sounds.map(sound =>
            <Sound key={sound._id} sound={sound} />
          )}
        </ul>

        <AddSound />

        <Player />

      </div>
    )
  }
}

export default createContainer(() => {
  return {
    sounds: Sounds.find({}, { sort: { createdAt: -1 } }).fetch(),
    selectedSound: Sounds.findOne({selected: true})
  };
}, Test3Music)
