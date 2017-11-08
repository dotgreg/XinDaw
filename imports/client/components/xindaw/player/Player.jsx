import { withTracker } from 'meteor/react-meteor-data';
import { Meteor } from 'meteor/meteor'

import React from 'react';
import Tone from 'tone';

import styled from 'styled-components';

import { updateSound, removeSound } from './sounds';
import { soundsWatcher } from './soundsWatcher';
import { observeTones } from './tones';

export default class Player extends React.Component {

  constructor(props){
    super(props)
    this.state = {
      codeErrors: false
    }
  }

  componentDidMount () {
    Meteor.call('tones.removeAll')

    Tone.Transport.start('+0.1')
    Tone.Transport.loopEnd = '2m'
    Tone.Transport.loop = true
    window.Tone = Tone

    observeTones()
  }

  // initializeSounds
  componentWillReceiveProps(nextProps) {
    let a =[this.props.sounds, nextProps.sounds]

    soundsWatcher({
      array1: nextProps.sounds,
      array2: this.props.sounds,
      added: s => {
        updateSound(s)
      },
      updated: (s, p) => {
        let result = updateSound(s)
        result.status === 'err' ? this.setState({codeErrors: result.body}) : this.setState({codeErrors: false})
      },
      deleted: s => {
        removeSound(s)
      },
      nothing: (s, p) => console.log('nothing', p)
    })
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
