import React from 'react';
import Tone from 'tone';

export default class Test1Music extends React.Component {

  constructor(props){
    super(props)
    this.state = {
      code: "// Code",
      old: false,
    }
    // this.uuid = this.guid()
    // this.synth = new Tone.FMSynth().toMaster()
    var freeverb = new Tone.Freeverb().toMaster()
    freeverb.dampening.value = 1000

    setInterval(() => {
      freeverb.dampening.value += 1000
      // console.log(freeverb.dampening.value)
    }, 100)
    //routing synth through the reverb
    this.synth = new Tone.AMSynth().connect(freeverb)
    // this.synth = new Tone.AMSynth().toMaster()
    // this.updateCode = this.updateCode.bind(this)
  }

  guid() {
    function s4() {
      return Math.floor((1 + Math.random()) * 0x10000)
        .toString(16)
        .substring(1);
    }
    return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
      s4() + '-' + s4() + s4() + s4();
  }

  getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min; //The maximum is exclusive and the minimum is inclusive
  }

  s (note, timeNote, time) {
    // console.log(Tone.Transport)
    this.uuid = Tone.Transport.schedule(time => {
      console.log(`${this.uuid} - ${note} - ${timeNote}- ${time}`)
      this.synth.triggerAttackRelease(note, timeNote, time)
    }, time)
  }

  rs () {

    let notes = ['A2','B2','C2','D2','E2','F2','G2']
    // let notes = ['A2']
    let timeNotes = ['2n','4n','8n','16n']
    // let timeNotes = ['1n', '2n','4n']
    // let timeNotes = ['6n']
    // let timeout = ['2n','4n','8n','16n']

    let note = notes[this.getRandomInt(0,notes.length)]
    let timeNote = timeNotes[this.getRandomInt(0,timeNotes.length)]
    let time = this.getRandomInt(0,2)

    this.s(note, timeNote, time)

    console.log(`SETUP ${this.uuid} - ${note} - ${timeNote}- ${time}`)
  }

  componentDidMount () {
    // synth.triggerAttackRelease('E4', 3.5, 0)
    // synth.triggerAttackRelease('E4', 0.5, 1)
    // synth.triggerAttackRelease('G4', 0.5, 2)
    // synth.triggerAttackRelease('B4', 0.5, 3)
    console.log(`componentDidMount ${this.uuid}`)
    Tone.Transport.start('+0.1')
    this.rs()
    window.Tone = Tone
    // this.s(2)
    // this.s(4)
    // this.s(6)
    Tone.Transport.loopEnd = '1m'
    Tone.Transport.loop = true


    // TONE
    // Tone.Transport.bpm.value = 120
    // Tone.Transport.loopEnd = '4m'
    // Tone.Transport.loop = true
    // Tone.Transport.start('+0.1')
    // window.Tone = Tone

  }

  componentWillUnmount () {
    console.log('componentWillUnmount')
    Tone.Transport.stop()
  }

	render() {

		return (
      <div className="test1Music">
        test1Music
        fsdsdfajkfdsalkjfdshljkfsd
        dsfahfdslkajhfdaslkjhadsf
        fsdalkjfdshalkfdjsah
      </div>
    )
  }

}

// React.render(<App />, document.getElementById('app'));
