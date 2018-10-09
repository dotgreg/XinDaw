import * as React from 'react';
import Tone from 'tone'
import * as _ from 'lodash'
import { getUserMedia } from 'src/helpers/getUserMedia';

class TestSwitch extends React.Component {
    componentDidMount() {
        
        const createSound = () => {
            var ac = new AudioContext();
            var audio = new Audio();
            var o = ac.createOscillator();
            o.type = 'square';
            o.start();
            var dest = ac.createMediaStreamDestination();
            o.connect(dest);
            audio.src = URL.createObjectURL(dest.stream);
            return audio
        }
        
        getUserMedia().then(() => {
            navigator.mediaDevices.enumerateDevices()
            .then(function(devices) {
            let audiodevices = _.filter(devices, device => device.kind === 'audiooutput')
            console.log(audiodevices)
            let audio:any = createSound()
            
            let audioSource = 2
                setInterval(() => {
                    audioSource = (audioSource === 2) ? 4 : 2
                    console.log(audio, audioSource)
                    if (audio) audio.setSinkId(audiodevices[audioSource].deviceId);
                }, 2000) 
            })
        })
  
    }

    public render() {
        return (
        <div className="App">
            switch audio api
        </div>
        );
    }
}

export default TestSwitch;
