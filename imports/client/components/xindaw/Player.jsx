import React from 'react';
import Tone from 'tone';
import Songs from '/imports/api/songs';
import {filter, reduce, intersection, indexOf, find, isEqual, each} from 'lodash';

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
    let a =[this.props.sounds, nextProps.sounds]

    // 1 DETECT SOUNDS ADDED
    each(a[1], sound => {
      let oldSound = find(a[0], {'_id': sound._id})
      if (!oldSound) {
        this.updateSound(sound)
        // return console.log(`${sound.name} ADDED`)
      }
    })

    // 2 DETECT SOUNDS DELETED
    each(a[0], sound => {
      let newSound = find(a[1], {'_id': sound._id})
      if (!newSound) {
        return this.removeSound(sound)
        // return console.log(`${sound.name} DELETED`)
      }

      // 3 DETECT SOUNDS UPDATED
      let res = reduce(sound, (result, value, key) => isEqual(value, newSound[key]) ? result : result.concat(key), [])

      if (res.length === 0) return
      if (intersection(['code', 'muted'], res).length > 0)  {
        this.updateSound(newSound)
        console.log(`${res[0]} change, UPDATE`)
      } else {
        console.log(`${res[0]}, do nothing`)
      }
    })
  }

  //
  // HOT SOUND SWAPPING ENGINE
  //
  updateSound = (sound) => {
    this.removeSound(sound, true)

    if (sound.muted) return

    let codeToEval = `(function self(){${sound.code}}())`
    let result = this.evalCode(codeToEval)

    if (!result) return
    result = {id: sound._id, name: sound.name, tone: result.c, type: result.t, options: result.o}

    // check in the mongo if ID + name vars exist, if yes, change the options.vars[namevars].value accordingly

    this.startTone(result.tone)
    tones.push(result)

    // console.log('sound added', tones)
    this.outputTones()
  }

  removeSound = (sound) => {
    let old = find(tones, {'id': sound._id})
    old && this.stopTone(old.tone)
    tones = filter(tones, t => t.id !== sound._id)
    // console.log('sound removed', tones)
    this.outputTones()
  }

  stopTone = (tone) => {
    let type = this.getToneType(tone)
    type === 'loop' && Tone.Transport.scheduleOnce(t => tone.stop().cancel().dispose(), 0)
    type === 'transport-event' && Tone.Transport.clear(tone)

    // remove the mongo ID params values
  }

  startTone = (tone) => {
    let type = this.getToneType(tone)
    type === 'loop' && Tone.Transport.scheduleOnce(t => tone.start(0), 0)
  }

  getToneType = (tone) => {
    // if (typeof tone === 'object' && tone.constructor.toString().match(/Tone\.Sequence/) && tone.constructor.toString().match(/Tone\.Sequence/).length === 1) return 'loop'
    // if (typeof tone === 'object' && tone.constructor.toString().match(/Tone\.Loop/) && tone.constructor.toString().match(/Tone\.Loop/).length === 1) return 'loop'
    if (typeof tone === 'number') return 'transport-event'
    else if (typeof tone === 'object') return 'loop'

    return false
  }

  //
  // GET TONES TO PARENT
  //
  outputTones = () => {
    // this.props.outputTones(tones)
  }

  //
  // CODE EVAL
  //

  evalCode = (code) => {
    this.setState({codeErrors: false})
    try {
      let result =  eval(code);
      let error = `EDITOR RESULT ERROR => result structure returned not correct ({t:'type', c:'object/number', o:'options'})`
      if(!result || typeof result !== 'object') return this.setState({codeErrors: error})
      if(!result.t) return this.setState({codeErrors: error})
      if(!result.c) return this.setState({codeErrors: error})
      return result
    } catch (e) {
      let error = `EDITOR SYNTAX ERROR => ${e.message}`
      return this.setState({codeErrors: error})
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
