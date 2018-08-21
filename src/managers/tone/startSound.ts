import Tone from 'tone'
import { getToneType } from "./getToneType";

export let startSound = tone => {
  let type = getToneType(tone)
  console.log(type)
  type === 'loop' && Tone.Transport.scheduleOnce(t => tone.start(0), 1)
}