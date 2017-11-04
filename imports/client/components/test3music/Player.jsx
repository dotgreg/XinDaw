import React from 'react';
import Tone from 'tone';
import Songs from '/imports/api/songs';
import {filter, find, remove, differenceWith, isEqual, each} from 'lodash';

import { Meteor } from 'meteor/meteor'
import styled from 'styled-components';

export default class Player extends React.Component {

  constructor(props){
    super(props)
    this.state = {
      codeErrors: false
    }
  }

  componentDidMount () {
    Tone.Transport.start('+0.1')
    Tone.Transport.loopEnd = '2m'
    Tone.Transport.loop = true
    window.Tone = Tone

    tones = []
    window.tones = tones
  }

  // initializeSounds
  componentWillReceiveProps(nextProps) {
    let addOrModif = differenceWith(nextProps.sounds, this.props.sounds, isEqual)
    let rm = differenceWith(this.props.sounds, nextProps.sounds, isEqual)

    if (addOrModif.length >= 1) each(addOrModif, sound => this.updateSound(sound))
    else if (rm.length >= 1) each(rm, sound => this.removeSound(sound))

    // console.log(this.props.sounds, nextProps.sounds)
    // console.log(addOrModif, rm)
  }

  //
  // HOT SOUND SWAPPING ENGINE
  //

  updateSound = (sound) => {
    // compare

    console.log(`updateSound => ${sound.name}`)
    this.removeSound(sound, true)

    if (sound.muted) return true

    let tone = this.evalCode(sound.code)
    this.startTone(tone)

    tones.push({id: sound._id, tone: tone})
  }

  compareCode = (sound) => {

  }

  removeSound = (sound, precleaning) => {
    !precleaning && console.log(`removeSound => ${sound.name}`)
    let old = find(tones, {'id': sound._id})
    old && this.stopTone(old.tone)
    tones = filter(tones, t => t.id !== sound._id)
  }

  stopTone = (tone) => {
    let type = this.getToneType(tone)
    type === 'loop' && tone.stop().cancel().dispose()
    type === 'transport-event' && Tone.Transport.clear(tone)
  }

  startTone = (tone) => {
    let type = this.getToneType(tone)
    type === 'loop' && tone.start(0)
    // type === 'transport-event' && Tone.Transport.clear(tone)
  }

  getToneType = (tone) => {
    if (typeof tone === 'object' && tone.constructor.toString().match(/Tone\.Sequence/) && tone.constructor.toString().match(/Tone\.Sequence/).length === 1) return 'loop'
    if (typeof tone === 'object' && tone.constructor.toString().match(/Tone\.Loop/) && tone.constructor.toString().match(/Tone\.Loop/).length === 1) return 'loop'
    if (typeof tone === 'number') return 'transport-event'
    return false
  }

  //
  // CODE EVAL
  //

  evalCode = (code) => {
    this.setState({codeErrors: false})
    try {
        return eval(code);
    } catch (e) {
        if (e instanceof SyntaxError) {
            let error = `EDITOR SYNTAX ERROR => ${e.message}`
            return this.setState({codeErrors: error})
        }
    }
  }

  componentWillUnmount () {
    console.log('componentWillUnmount')
    Tone.Transport.stop()
  }

	render() {
    let errors = this.state.codeErrors ? this.state.codeErrors : 'no synthax error'

		return (
      <div>
        <Result error={this.state.codeErrors}> {errors} </Result>
      </div>

    )
  }
}


const Result = styled.p`
  color: ${props => props.error ? 'red' : 'green'};
`;
