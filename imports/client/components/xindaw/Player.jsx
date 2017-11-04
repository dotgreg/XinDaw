import React from 'react';
import Tone from 'tone';
import Songs from '/imports/api/songs';
import {filter, reduce, find, remove, difference, differenceBy, differenceWith, isEqual, each} from 'lodash';

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
    // let addOrModif = differenceWith(nextProps.sounds, this.props.sounds, isEqual)
    // let rm = differenceWith(this.props.sounds, nextProps.sounds, isEqual)
    // let a = (nextProps.sounds.length > this.props.sounds.length) ? [this.props.sounds, nextProps.sounds] : [nextProps.sounds, this.props.sounds]
    let a =[this.props.sounds, nextProps.sounds]
    // console.log(a[0], a[1])

    // console.log(a[0].length, a[1].length)

    // if (a[0].length > a[1].length) {
    //   // console.log(1)
    //   let deleted = differenceWith(a[0], a[1], isEqual)
    //   deleted[0] && console.log(deleted, `=> DELETED`)
    //   // deleted && console.log(deleted[0].name, `=> DELETED`)
    // }

    // if (a[0].length < a[1].length) {
    //   let added = differenceWith(a[1], a[0], isEqual)
    //   added[0] && console.log(added, `=> ADDED`)
    //   // added && console.log(added[0].name, `=> ADDED`)
    // }
    // let a = [this.props.sounds, nextProps.sounds]

    each(a[1], sound => {
      let oldSound = find(a[0], {'_id': sound._id})
      if (!oldSound) return console.log(`${sound.name} ADDED`)
    })

    each(a[0], sound => {
      let newSound = find(a[1], {'_id': sound._id})
      // console.log(newSound)
      if (!newSound) return console.log(`${sound.name} DELETED`)

      let res = reduce(sound, (result, value, key) => isEqual(value, newSound[key]) ? result : result.concat(key), [])
      res.length > 0 && console.log(`${sound.name} => ${res}`)
      // console.log(res)


      // !newSound && console.log(`${sound._id} => DELETED`)
      // console. log(differenceBy(sound, newSound, isEqual))
    })
    console.log('===================')

    // if (addOrModif.length >= 1) each(addOrModif, sound => this.updateSound(sound))
    // else if (rm.length >= 1) each(rm, sound => this.removeSound(sound))

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
