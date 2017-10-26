import _ from 'lodash';
import React from 'react';

import Sound from './classes/Sound'

export default class AddSound extends React.Component {

  constructor(props){
    super(props)
  }

  createSound = () => {
    let newSound = new Sound({
      src: _.random(10000),
      name: `sound-${_.random(10000)}`
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
