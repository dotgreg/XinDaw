import * as React from 'react';
import Tone from 'tone'
import * as _ from 'lodash'
import { getUserMedia } from '../helpers/getUserMedia';

class TestSwitchTone extends React.Component {
    componentDidMount() {
        
        const createSound = () => {
            var synth = new Tone.Synth().toMaster();
            setInterval(() => {
                synth.triggerAttackRelease("C4", "8n");
            }, 500)
        } 
        
        getUserMedia().then(() => {
            // navigator.mediaDevices.enumerateDevices()
            // .then(function(devices) {
            // let audiodevices = _.filter(devices, device => device.kind === 'audiooutput')
            // let audio:any = createSound()
            
            // let audioSource = 2
            //     setInterval(() => {
            //         audioSource = (audioSource === 2) ? 4 : 2
            //         console.log(audio, audioSource)
            //         if (audio.setSinkId) audio.setSinkId(audiodevices[audioSource].deviceId);
            //     }, 2000)
            // })
        })
  
    }

    public render() {
        return (
        <div className="App">
            switch audio tonejs
        </div>
        );
    }
}

export default TestSwitchTone;
