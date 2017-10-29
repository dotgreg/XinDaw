import {random} from 'lodash';
import React from 'react';

import Sound from './classes/Sound'

export default class AddSound extends React.Component {

  constructor(props){
    super(props)
  }

  createSound = () => {
    let newSound = new Sound({
      src: random(10000),
      name: `sound-${random(10000)}`
    })
    this.props.onNewSound(newSound)
  }

	render() {
		return (
      <button
        onClick={this.createSound}
        className="addSound">
        addSound
      </button>
    )
  }
}
