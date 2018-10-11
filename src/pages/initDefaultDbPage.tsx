import * as React from 'react';
import { Link, navigate } from '@reach/router';

interface Props {
  path?: string
}

let defaultDb = `{\"sounds\":[{\"id\":\"501862\",\"name\":\"test2\",\"code\":\"var vol = new Tone.Volume(10).toMaster();\\nlet scale = [\\\"B3\\\", \\\"C#4\\\", \\\"D#4\\\", \\\"F#4\\\", \\\"G#4\\\"]\\nvar synth = new Tone.FMSynth().chain(vol);\\nvar c = new Tone.Pattern(function(time, note){\\n console.log(note);\\n synth.triggerAttackRelease(note, '4n', time)\\n}, scale, \\\"upDown\\\");\\nc.interval = \\\"8n\\\";\",\"edited\":true},{\"id\":\"272575\",\"name\":\"testWOptions\",\"code\":\"var vol = new Tone.Volume(10).toMaster();\\nlet scale = [\\\"B3\\\", \\\"C#4\\\", \\\"D#4\\\", \\\"F#4\\\", \\\"G#4\\\"]\\nvar synth = new Tone.FMSynth().chain(vol);\\nvar c = new Tone.Pattern(function(time, note){\\n console.log(note);\\n synth.triggerAttackRelease(note, '4n', time)\\n}, scale, \\\"upDown\\\");\\nc.interval = \\\"8n\\\";\\nvar o = {\\n\\tvars:[\\n      ['vol', vol.volume, 0, -100, 100]\\n    ]\\n}\",\"edited\":false}],\"parts\":[{\"id\":\"63509\",\"name\":\"11111\",\"sounds\":[\"564477\",\"176319\",\"501862\"],\"active\":false},{\"id\":\"68120\",\"name\":\"22222\",\"sounds\":[],\"active\":true}],\"controls\":[{\"id\":\"272575\",\"controls\":[{\"id\":\"vol\",\"name\":\"vol\",\"value\":-33,\"min\":-100,\"max\":100,\"step\":1}]}],\"settings\":[{\"type\":\"event\",\"value\":48,\"eventName\":\"controls.knob1\"},{\"type\":\"event\",\"value\":49,\"eventName\":\"controls.knob2\"},{\"type\":\"event\",\"value\":50,\"eventName\":\"controls.knob3\"},{\"type\":\"event\",\"value\":51,\"eventName\":\"controls.knob4\"},{\"type\":\"event\",\"value\":52,\"eventName\":\"controls.knob5\"},{\"type\":\"event\",\"value\":\"86\",\"eventName\":\"controls.knob6\"},{\"type\":\"event\",\"value\":54,\"eventName\":\"controls.knob7\"},{\"type\":\"event\",\"value\":55,\"eventName\":\"controls.knob8\"},{\"type\":\"event\",\"value\":56,\"eventName\":\"controls.knob9\"},{\"type\":\"event\",\"value\":57,\"eventName\":\"controls.knob10\"},{\"type\":\"event\",\"value\":58,\"eventName\":\"soundsManager.list.up\"},{\"type\":\"event\",\"value\":58,\"eventName\":\"soundsManager.list.down\"},{\"type\":\"event\",\"value\":60,\"eventName\":\"soundsManager.list.addToPart\"},{\"type\":\"event\",\"value\":61,\"eventName\":\"PartSoundsManager.list.up\"},{\"type\":\"event\",\"value\":62,\"eventName\":\"PartSoundsManager.list.down\"},{\"type\":\"event\",\"value\":63,\"eventName\":\"PartSoundsManager.sound.pause\"},{\"type\":\"event\",\"value\":64,\"eventName\":\"PartSoundsManager.sound.delete\"},{\"type\":\"event\",\"value\":65,\"eventName\":\"PartSoundsManager.sound.play\"}],\"events\":[]}`

class InitDefaultDbPage extends React.Component<Props, {}> {
  
  constructor(props) {
    super(props)
    window.localStorage.setItem('DawPage', defaultDb)
    setTimeout(() => {
      navigate(`/daw`)
    }, 2000)
  }

  public render() {
    return (
        <div>
            <h3>Init Default DB page</h3>
            <p> inject some default sounds to get started with...</p>
        </div>
    );
  } 
}

  
  
export default InitDefaultDbPage;
  