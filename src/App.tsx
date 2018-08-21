import * as React from 'react';

import { iSound } from './components/Sound/Sound';
import SoundsManager from './components/SoundsManager/SoundsManager';
import PartsManager from './components/PartsManager/PartsManager';
import { iPart } from './components/Part/Part';

import LocalStorageMixin from 'react-localstorage'
import reactMixin  from 'react-mixin'
import { getEditedItem, arrayWithItemsToNotEdited, arrayWithItemToEdited, arrayWithItem, arrayWithUpdatedItem, getActiveItem, addSoundToPart, getSoundsFromIds, removeSoundToPart} from './helpers/arrayHelper';
import SoundEditor from './components/SoundEditor/SoundEditor';
import SoundPartManager from './components/SoundPartManager/SoundPartManager';

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
    this.setState({parts: parts})
  }



  onSoundEdit = (sound:iSound) => {
    this.setState({sounds: arrayWithItemToEdited(sound.id, arrayWithItemsToNotEdited(this.state.sounds))})
  }

  createSound = (sound: iSound) => {
    this.setState({sounds: arrayWithItem(sound, this.state.sounds)})
  }

  updateSound = (sound: iSound) => {
    this.setState({sounds: arrayWithUpdatedItem(sound, this.state.sounds)})
  }



  addSoundToCurrentPart = (sound: iSound) => {
    // @ts-ignore
    this.setState({parts: addSoundToPart(sound.id, getActiveItem(this.state.parts).id, this.state.parts)})
  }

  removeSoundToCurrentPart = (sound: iSound) => {
    // @ts-ignore
    this.setState({parts: removeSoundToPart(sound.id, getActiveItem(this.state.parts).id, this.state.parts)})
  }

  public render() {
    return (
      <div className="App"> 
        <SoundsManager 
          sounds={this.state.sounds} 
          onUpdate={this.updateSounds}
          onAddCurrentPart={this.addSoundToCurrentPart}
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

        <SoundPartManager
          part={getActiveItem(this.state.parts).sounds} 
          // @ts-ignore
          sounds={getSoundsFromIds(getActiveItem(this.state.parts).sounds, this.state.sounds)} 
          onUpdate={this.updateParts}
          onSoundEdit={this.onSoundEdit}
          onRemoveCurrentPart={this.removeSoundToCurrentPart}
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