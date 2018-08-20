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
import { iPart } from './components/Part/Part';

import LocalStorageMixin from 'react-localstorage'
import reactMixin  from 'react-mixin'

interface State {
  sounds: iSound[],
  parts: iPart[]
}

@reactMixin.decorate(LocalStorageMixin)
class App extends React.Component<{}, State> {

  constructor(props) {
    super(props)
    this.state = {
      sounds: [],
      parts: []
    }
  }

  updateSounds = (sounds:iSound[]) => {
    this.setState({sounds: sounds})
  }
 
  updateParts = (parts:iPart[]) => {
    this.setState({parts: parts})
  }
 
  public render() {
    return (
      <div className="App"> 
        <SoundsManager sounds={this.state.sounds} onUpdate={this.updateSounds}/>

        <PartsManager parts={this.state.parts} onUpdate={this.updateParts} />
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