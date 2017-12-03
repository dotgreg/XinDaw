import Tone from 'tone';
import React from 'react';

import * as css from '/imports/client/components/css/styles.js'

export default class Bpm extends React.Component {

  constructor(props){
    super(props)
    this.state = {
      bpm: '120'
    }
  }

  componentDidMount () {
    Tone.Transport.bpm.value = this.state.bpm
  }

  updateBpm = () => {
    setTimeout(() => Tone.Transport.bpm.value = this.state.bpm, 100)
    this.setState({bpm: this.refs.bpm.value})
  }

	render() {
		return (
      <css.FieldWrapper>
        <css.Number
          type="number"
          width="50px"
          ref="bpm"
          defaultValue={this.state.bpm} />
        <css.Button onClick={this.updateBpm} > Change BPM </css.Button>
      </css.FieldWrapper>
    )
  }
}
