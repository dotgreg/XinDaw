import React from 'react';
import Tone from 'tone';
import Songs from '/imports/api/songs';
import {filter, reduce, indexOf, find, isEqual, each} from 'lodash';

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
    Tone.Transport.loopEnd = '4m'
    Tone.Transport.loop = true
    window.Tone = Tone

    tones = []
    window.tones = tones
  }

  // initializeSounds
  componentWillReceiveProps(nextProps) {
    let a =[this.props.sounds, nextProps.sounds]

    // 1 DETECT SOUNDS ADDED
    each(a[1], sound => {
      let oldSound = find(a[0], {'_id': sound._id})
      if (!oldSound) {
        this.updateSound(sound)
        return console.log(`${sound.name} ADDED`)
      }
    })

    // 2 DETECT SOUNDS DELETED
    each(a[0], sound => {
      let newSound = find(a[1], {'_id': sound._id})
      if (!newSound) {
        this.removeSound(sound)
        return console.log(`${sound.name} DELETED`)
      }

      // 3 DETECT SOUNDS UPDATED
      let res = reduce(sound, (result, value, key) => isEqual(value, newSound[key]) ? result : result.concat(key), [])

      if (res.length === 0) return
      if (indexOf(['code', 'muted'], res[0]) > 0)  {
        this.updateSound(sound)
        console.log('code change, UPDATE')
      } else {
        console.log(`${res[0]}, do nothing`)
      }
    })
    console.log('===================')
  }

  //
  // HOT SOUND SWAPPING ENGINE
  //
  updateSound = (sound) => {
    console.log(`updateSound => ${sound.name}`)
    this.removeSound(sound, true)

    if (sound.muted) return true

    let tone = this.evalCode(sound.code)
    this.startTone(tone)

    tones.push({id: sound._id, tone: tone})
  }

  removeSound = (sound) => {
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