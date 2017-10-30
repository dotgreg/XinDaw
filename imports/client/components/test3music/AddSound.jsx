import {random} from 'lodash';
import React from 'react';
import dedent from 'dedent-js';

import { Meteor } from 'meteor/meteor'
import {Sounds} from '/imports/api/sounds.js'

let notes = ['A2','B2','C2','D2','E2','F2','G2']
let timeNotes = ['2n','4n','8n','16n']
let times = ['0.5','1','1.5','2','2.5']

export default class AddSound extends React.Component {

  constructor(props){
    super(props)
  }

  createSound = () => {
    let codeDefault = dedent(`
      let freeverb = new Tone.Freeverb().toMaster();
      freeverb.dampening.value = ${random(1000,5000)};
      let synth = new Tone.AMSynth().connect(freeverb);
      Tone.Transport.schedule(time => {
        synth.triggerAttackRelease('${notes[random(notes.length - 1)]}', '${timeNotes[random(timeNotes.length - 1)]}', time)
      }, ${times[random(times.length - 1)]})`)

    Meteor.call('sounds.insert', codeDefault);
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
