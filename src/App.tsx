import * as React from 'react';
import TestSwitchTone from './components/TestSwitchTone';
import TestSyncLocalStorage from './components/TestSyncLocalStorage';
import LocalStorageWatcher from './components/LocalStorageWatcher';
import TestToneOutput from './components/TestToneOutput';
import TestAudioHtmlOutput from './components/TestAudioHtmlOutput';
import TestSwitch from './components/testSwitch';
import TestWebMidi from './components/TestWebMidi';
import Editor from './components/Editor/Editor';
import { sounds } from './datas/sounds';
import Sound, { iSound } from './components/Sound/Sound';
import SoundsManager from './components/SoundsManager/SoundsManager';


interface State {
  data: any,
  sounds: iSound[]
}

class App extends React.Component<{}, State> {
  constructor(props) {
    super(props)
    this.state = {
      data: {},
      sounds: sounds
    }
  }

  onLocalStorageUpdate = (data:any) => {
    console.log('onLocalStorageUpdate', data)
    this.setState({data: data})
  }

  increment(){
    if (!localStorage.getItem('counter')) return localStorage.setItem('counter', '0')
    
    let currentVal = parseInt(localStorage.getItem('counter') as string)
    let newVal = currentVal + 1
    localStorage.setItem('counter', `${newVal}`)

  }

  componentDidMount() {
   
  }

  public render() {
    return (
      <div className="App">
        <SoundsManager />
      </div>
    );
  } 
}

export default App;

// {
//   this.state.sounds.map(sound => (
//     <Sound sound={sound}/>
//   ))
// }


// <TestSyncLocalStorage />
// <button onClick={this.increment}>increment</button>
// <div>{this.state.data.counter}</div>
// <LocalStorageWatcher onUpdate={this.onLocalStorageUpdate} />
// {/* <TestToneOutput /> */}
// <TestWebMidi />
// <Editor code={this.state.sounds[0].code}/>
// {/* <TestAudioHtmlOutput /> */}