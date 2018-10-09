import * as React from 'react';
import Tone from 'tone'
import * as _ from 'lodash'
import { getUserMedia } from 'src/helpers/getUserMedia';

class TestToneOutput extends React.Component {
    context: any
    componentDidMount() {
        
        const createSound = () => {
            var synth = new Tone.Synth()
            setInterval(() => {
                synth.triggerAttackRelease("C4", "8n");
            }, 500)
            let ac = new Tone().context
            var audio = new Audio();
            this.context = ac._context
            var dest = this.context.createMediaStreamDestination();
            synth.connect(dest)
            console.log(ac, new Tone(), ac._context, dest)
            audio.src = URL.createObjectURL(dest.stream);
            
            return audio
        } 
        
        getUserMedia().then(() => {
            navigator.mediaDevices.enumerateDevices()
            .then(function(devices) {
                let audiodevices = _.filter(devices, device => device.kind === 'audiooutput')
                let audio:any = createSound()
                
                let audioSource = 2
                // console.log()
                setInterval(() => {
                    // audio.play()
                    audioSource = (audioSource === 2) ? 4 : 2
                    console.log(audiodevices, audio, audioSource)
                    if (audio.setSinkId) audio.setSinkId(audiodevices[audioSource].deviceId);
                }, 2000)
            })
            // if (audio.setSinkId) audio.setSinkId(audiodevices[4].deviceId);
        })
  
    }

    public render() {
        return (
        <div className="App">
            TestToneOutput
        </div>
        );
    }
}

export default TestToneOutput;
