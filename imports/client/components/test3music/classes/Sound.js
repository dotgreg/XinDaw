import {random} from 'lodash';
import Tone from 'tone';

let notes = ['A2','B2','C2','D2','E2','F2','G2']
let timeNotes = ['2n','4n','8n','16n']
let times = ['0.5','1','1.5','2','2.5']



export default class Sound {

  constructor (config) {
    let codeDefault =
`
let freeverb = new Tone.Freeverb().toMaster();
freeverb.dampening.value = ${random(1000,5000)};
let synth = new Tone.AMSynth().connect(freeverb);
Tone.Transport.schedule(time => {
  synth.triggerAttackRelease('${notes[random(notes.length - 1)]}', '${timeNotes[random(timeNotes.length - 1)]}', time)
}, ${times[random(times.length - 1)]})`

    this.src = config.src
    this.name = config.name
    this.code = codeDefault
  }

  sayHello () {
    console.log(this.name)
  }
}
