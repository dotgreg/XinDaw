import * as React from 'react';

import { iSound } from './components/Sound/Sound';
import SoundsManager from './components/SoundsManager/SoundsManager';
import PartsManager from './components/PartsManager/PartsManager';
import { iPart } from './components/Part/Part';

import LocalStorageMixin from 'react-localstorage'
import reactMixin  from 'react-mixin'
import { getEditedItem, arrayWithItemsToNotEdited, arrayWithItemToEdited, arrayWithItem, arrayWithUpdatedItemFromId, getActiveItem, addSoundToPart, getSoundsFromIds, removeSoundToPart, getControlsFromIds, arrayWithUpdatedItemFromProp} from './helpers/arrayHelper';
import SoundEditor from './components/SoundEditor/SoundEditor';
import SoundPartManager from './components/SoundPartManager/SoundPartManager';

import { startToneApp } from './managers/tone/startToneApp';
import Controls, { iSoundControls } from './components/Controls/Controls';
import MidiWatcher, { iMidiEvent } from './components/MidiWatcher/MidiWatcher';
import SettingsManager, { iSettingsItem } from './components/SettingsManager/SettingsManager';

import {each, filter} from 'lodash'

interface iComponentEvent {
  id: string
  value: number
  action: string
}

interface State {
  sounds: iSound[],
  parts: iPart[],
  controls: iSoundControls[],
  settings: iSettingsItem[],
  events: iComponentEvent[]
}

@reactMixin.decorate(LocalStorageMixin)
class App extends React.Component<{}, State> {

  constructor(props) {
    super(props)
    this.state = {
      sounds: [],
      parts: [],
      controls: [],
      settings: [],
      events: []
    }

    startToneApp()
  }

  updateSounds = (sounds:iSound[]) => {
    this.setState({sounds: sounds})
  }
  
  updateParts = (parts:iPart[]) => {
    this.setState({parts: parts})
  }



  triggerSoundEdit = (sound:iSound) => {
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
  
  updateSoundControls = (soundControls:iSoundControls) => {
    this.setState({controls: arrayWithUpdatedItemFromId(soundControls, this.state.controls)})
  }


  onMidiUpdate = (midiEvent:iMidiEvent) => {
    this.triggerEvent(midiEvent)
  }

  triggerEvent = (event: iMidiEvent) => {
    let res = filter(this.state.settings, config => {
      return (config.type === 'event' && config.value === event.id)
    })
    if (!res[0]) return

    let eventName = res[0].eventName
    let componentId = eventName.split('.')[0]
    let action = eventName.split('.')[1]
    let value = event.value

    let resEvent:iComponentEvent = {id: componentId, action, value}
    console.log(resEvent);
    

    this.setState({events: arrayWithUpdatedItemFromId(resEvent, this.state.events)})
  }

  onSettingsUpdate = (settings:iSettingsItem[]) => {
    this.setState({settings: settings})
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

        <MidiWatcher onUpdate={this.onMidiUpdate}/>

        <SettingsManager onUpdate={this.onSettingsUpdate}/>

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
          controls={this.state.controls}
          onUpdate={this.updateParts}
          onRemoveSound={this.removeSoundToCurrentPart}
          onTriggerSoundEdit={this.triggerSoundEdit}
        />

      </div>
    );
  } 
}

export default App;
