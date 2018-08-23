import * as React from 'react';

import { iSound } from './components/Sound/Sound';
import SoundsManager from './components/SoundsManager/SoundsManager';
import PartsManager from './components/PartsManager/PartsManager';
import { iPart } from './components/Part/Part';

import LocalStorageMixin from 'react-localstorage'
import reactMixin  from 'react-mixin'
import { getEditedItem, arrayWithItemsToNotEdited, arrayWithItemToEdited, arrayWithItem, arrayWithUpdatedItemFromId, getActiveItem, addSoundToPart, getSoundsFromIds, removeSoundToPart} from './helpers/arrayHelper';
import SoundEditor from './components/SoundEditor/SoundEditor';
import SoundPartManager from './components/SoundPartManager/SoundPartManager';

import { startToneApp } from './managers/tone/startToneApp';
import Controls, { iControlVar } from './components/Controls/Controls';

interface State {
  sounds: iSound[],
  parts: iPart[],
  controls: {
    [key:string]: iControlVar[]
  },
}

@reactMixin.decorate(LocalStorageMixin)
class App extends React.Component<{}, State> {

  constructor(props) {
    super(props)
    this.state = {
      sounds: [],
      parts: [],
      controls: {}
    }

    startToneApp()
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
    this.setState({sounds: arrayWithUpdatedItemFromId(sound, this.state.sounds)})
  }



  addSoundToCurrentPart = (sound: iSound) => {
    // @ts-ignore
    this.setState({parts: addSoundToPart(sound.id, getActiveItem(this.state.parts).id, this.state.parts)})
  }

  removeSoundToCurrentPart = (sound: iSound) => {
    // @ts-ignore
    this.setState({parts: removeSoundToPart(sound.id, getActiveItem(this.state.parts).id, this.state.parts)})
  }
  
  updateSoundControls = (soundId: string, controlsVars:iControlVar[]) => {
    let controls = this.state.controls
    controls[soundId] = controlsVars
    this.setState({controls: controls})
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

        <Controls 
          // sound={getEditedItem(this.state.sounds)}
          code={getEditedItem(this.state.sounds).code}
          soundId={getEditedItem(this.state.sounds).id}
          onUpdate={this.updateSoundControls}
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
