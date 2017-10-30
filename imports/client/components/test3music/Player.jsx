import React from 'react';
import Tone from 'tone';
import {filter, find, remove} from 'lodash';
// import _ from 'lodash';

import { Sounds } from '/imports/api/sounds.js';
import { Meteor } from 'meteor/meteor'

import {intervalWithIntVariation, arrayWithoutObjFrom, objInArrayFrom, arrayWithUpdatedObjFrom} from './utils/currys';

export default class Player extends React.Component {

  constructor(props){
    super(props)
  }

  updateSound = (id, sound, event) => {
    let alreadyExist = find(soundsInTransport, {'id': id})
    if (alreadyExist) Tone.Transport.clear(alreadyExist.transportId);

    let newTransportId = eval(sound.code)
    alreadyExist ? alreadyExist.transportId = newTransportId : soundsInTransport.push({id: id, transportId: newTransportId})
  }

  removeSound = (id) => {
    let alreadyExist = find(soundsInTransport, {'id': id})
    if (alreadyExist) Tone.Transport.clear(alreadyExist.transportId);
    remove(soundsInTransport, s => s.id === id)
    console.log(soundsInTransport)
  }

  componentDidMount () {
    Tone.Transport.start('+0.1')
    Tone.Transport.loopEnd = '2m'
    Tone.Transport.loop = true
    window.Tone = Tone

    soundsInTransport = []

    var cursor = Sounds.find();
    cursor.observeChanges({
        added: (id, fields) => this.updateSound(id, fields, 'added'),
        changed: (id, fields) => this.updateSound(id, fields, 'changed'),
        removed: id => this.removeSound(id)
    });
  }

  componentWillUnmount () {
    console.log('componentWillUnmount')
    Tone.Transport.stop()
  }

	render() {
		return (
      <div> player </div>
    )
  }
}
