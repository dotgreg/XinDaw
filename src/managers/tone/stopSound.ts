import { getToneType } from "./getToneType";
import Tone from 'tone'

export let stopSound = tone => {
    let type = getToneType(tone)
    console.log('stopTone', tone, type)
    type === 'loop' && Tone.Transport.scheduleOnce(t => {
        if (tone) tone.stop().dispose()
    }, 1)
    type === 'transport-event' && Tone.Transport.clear(tone)
    type === 'transport-event' && console.log('transport event' + tone)
}