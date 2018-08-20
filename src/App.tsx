import * as React from 'react';
import TestSwitchTone from './components/TestSwitchTone';
import TestSyncLocalStorage from './components/TestSyncLocalStorage';
import LocalStorageWatcher from './components/LocalStorageWatcher';
import TestToneOutput from './components/TestToneOutput';
import TestAudioHtmlOutput from './components/TestAudioHtmlOutput';
import TestSwitch from './components/testSwitch';
import TestWebMidi from './components/TestWebMidi';
import { sounds } from './datas/sounds';
import Sound, { iSound } from './components/Sound/Sound';
import SoundsManager from './components/SoundsManager/SoundsManager';
import LocalStorageStorageManager, { iStorageData } from './components/StorageManager/LocalStorageStorageManager';
import PartsManager from './components/PartsManager/PartsManager';


interface State {
  data: iStorageData,
}

class App extends React.Component<{}, State> {

  constructor(props) {
    super(props)
    this.state = {
      data: {
        sounds: [],
        parts: []
      }
    }
  }

  onStorageUpdate = (data:iStorageData) => {
      console.log('onStorageUpdate', data)
      this.setState({ data: data })
  }

  public render() {
    return (
      <div className="App"> 
        <LocalStorageStorageManager onUpdate={this.onStorageUpdate}>
          
          <SoundsManager sounds={this.state.data.sounds} />

          <PartsManager parts={this.state.data.parts} />

        </LocalStorageStorageManager>
        

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