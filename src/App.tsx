import * as React from 'react';

import { iSound } from './components/Sound/Sound';
import SoundsManager from './components/SoundsManager/SoundsManager';
import PartsManager from './components/PartsManager/PartsManager';
import { iPart } from './components/Part/Part';

import LocalStorageMixin from 'react-localstorage'
import reactMixin  from 'react-mixin'
import ActivePartManager from './components/ActivePartManager/ActivePartManager';
import { getEditedItem, updateItemsToNotEdited, updateItemToEdited, addItem, updateItemInArray} from './helpers/arrayHelper';
import SoundEditor from './components/SoundEditor/SoundEditor';

interface State {
  sounds: iSound[],
  parts: iPart[],
}

@reactMixin.decorate(LocalStorageMixin)
class App extends React.Component<{}, State> {

  constructor(props) {
    super(props)
    this.state = {
      sounds: [],
      parts: [],
    }
  }

  updateSounds = (sounds:iSound[]) => {
    this.setState({sounds: sounds})
  }
  
  updateParts = (parts:iPart[]) => {
    console.log('updateParts',parts)
    this.setState({parts: parts})
  }

  onSoundEdit = (sound:iSound) => {
    this.setState({sounds: updateItemToEdited(sound.id, updateItemsToNotEdited(this.state.sounds))})
  }

  createSound = (sound: iSound) => {
    this.setState({sounds: addItem(sound, this.state.sounds)})
  }

  updateSound = (sound: iSound) => {
    this.setState({sounds: updateItemInArray(sound, this.state.sounds)})
  }

  public render() {
    return (
      <div className="App"> 
        <SoundsManager 
          sounds={this.state.sounds} 
          onUpdate={this.updateSounds}
        />

        <SoundEditor
          sound={getEditedItem(this.state.sounds)}
          onCreate={this.createSound}
          onUpdate={this.updateSound}
        />

        <PartsManager 
          parts={this.state.parts} 
          onUpdate={this.updateParts} 
        />

        <ActivePartManager 
          parts={this.state.parts} 
          sounds={this.state.sounds} 
          onUpdate={this.updateParts}
          onSoundEdit={this.onSoundEdit}
        />

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


//
// // SOUND CRUD
// //
// createSound = (sound:iSound) => {
//   let sounds = this.state.sounds
//   sounds.push(sound)
//   this.props.onUpdate(sounds)
// }

// updateSound = (sound:iSound) => {
//   let i = this.getSoundIndexFromId(sound.id)
//   let sounds = this.state.sounds
//   if (!isNumber(i)) return console.warn(`[SOUNDS CRUD] updating sound id ${sound.id} does not exists`, sounds)
//   sounds[i] = sound
//   config.debug.soundsCrud && console.log(`[SOUNDS CRUD] updating sound ${sounds[i].name} :`, sounds)
//   this.props.onUpdate(sounds)
// }