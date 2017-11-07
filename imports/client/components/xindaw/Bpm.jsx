import Tone from 'tone';
import React from 'react';

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
      <div>
        <input
          type="text"
          size="2"
          ref="bpm"
          defaultValue={this.state.bpm} />
        <button onClick={this.updateBpm} > Change BPM </button>
      </div>
    )
  }
}
