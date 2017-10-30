import React from 'react';
import Tone from 'tone';
import Songs from '/imports/api/songs';
import {filter, find, remove, differenceWith, isEqual} from 'lodash';

import { Meteor } from 'meteor/meteor'

export default class Player extends React.Component {

  constructor(props){
    super(props)
  }

  componentDidMount () {
    Tone.Transport.start('+0.1')
    Tone.Transport.loopEnd = '2m'
    Tone.Transport.loop = true
    window.Tone = Tone

    soundsInTransport = []
  }

  componentDidUpdate(prevProps, prevState) {

    let diffObj = differenceWith(prevProps.sounds, this.props.sounds, isEqual)[0]
    let diffObjAdd = differenceWith(this.props.sounds, prevProps.sounds, isEqual)[0]

    if (prevProps.sounds.length > this.props.sounds.length && typeof diffObj === 'object') this.removeSound(diffObj)
    if (prevProps.sounds.length < this.props.sounds.length && typeof diffObjAdd === 'object') this.updateSound(diffObjAdd)
    if (prevProps.sounds.length === this.props.sounds.length && typeof diffObj === 'object') this.updateSound(diffObj)
  }

  updateSound = (sound) => {
    // console.log(sound)
    let alreadyExist = find(soundsInTransport, {'id': sound._id})
    if (alreadyExist) Tone.Transport.clear(alreadyExist.transportId);

    if (!sound.muted) {
      let newTransportId = eval(sound.code)
      alreadyExist ? alreadyExist.transportId = newTransportId : soundsInTransport.push({id: sound._id, transportId: newTransportId})
    }
    // console.log(soundsInTransport)
  }

  removeSound = (sound) => {
    let alreadyExist = find(soundsInTransport, {'id': sound._id})
    if (alreadyExist) Tone.Transport.clear(alreadyExist.transportId);
    remove(soundsInTransport, s => s.id === sound._id)

    // console.log(soundsInTransport)
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
