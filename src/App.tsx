import * as React from 'react';

import SoundsManager from './components/SoundsManager/SoundsManager';
import PartsManager from './components/PartsManager/PartsManager';
import { iPart } from './components/Part/Part';

import LocalStorageMixin from 'react-localstorage'
import reactMixin  from 'react-mixin'
import { getEditedItem, arrayWithItemsToNotEdited, arrayWithItemToEdited, arrayWithItem, updateIdArrayItem, getActiveItem, addSoundToPart, getSoundsFromIds, removeSoundToPart, getControlsFromIds, updateArrayItem, getItemFromId} from './helpers/arrayHelper';
import SoundEditor from './components/SoundEditor/SoundEditor';
import SoundPartManager from './components/SoundPartManager/SoundPartManager';

import { startToneApp } from './managers/tone/startToneApp';
import Controls, { iSoundControls } from './components/Controls/Controls';
import MidiWatcher, { iMidiEvent } from './components/MidiWatcher/MidiWatcher';
import SettingsManager, { iSettingsItem } from './components/SettingsManager/SettingsManager';

import {each, filter} from 'lodash'
import helpers from './helpers';
import { iSound, tSound } from './managers/types/sound.type';
import { checkType } from './managers/types/typeCheck';

export interface iComponentEvent {
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

    // @ts-ignore
    this.createSound({test:'nonfdsofdas'})
  }

  updateSounds = (sounds:iSound[]) => {
    this.setState({sounds: sounds})
  }
  
  updateParts = (parts:iPart[]) => {
    this.setState({parts: parts})
  }



  triggerSoundEdit = (sound:iSound) => {
    if(!checkType(tSound)(sound)) return
    sound && this.setState({sounds: arrayWithItemToEdited(sound.id, arrayWithItemsToNotEdited(this.state.sounds))})
  }
  
  createSound = (sound: iSound) => {
    if(!checkType(tSound)(sound)) return
    this.setState({sounds: arrayWithItem(sound)(this.state.sounds)})
  }
  
  updateSound = (sound: iSound) => {
    if(!checkType(tSound)(sound)) return
    this.setState({sounds: updateIdArrayItem(sound)(this.state.sounds)})
  }
  
  addSoundToCurrentPart = (sound: iSound) => {
    if(!checkType(tSound)(sound)) return
    this.setState({parts: addSoundToPart(sound.id)(getActiveItem(this.state.parts).id)(this.state.parts)  })
  }
  
  removeSoundToCurrentPart = (sound: iSound) => {
    if(!checkType(tSound)(sound)) return
    // @ts-ignore
    this.setState({parts: removeSoundToPart(sound.id, getActiveItem(this.state.parts).id, this.state.parts)})
  }
  
  updateSoundControls = (soundControls:iSoundControls) => {
    this.setState({controls: updateIdArrayItem(soundControls)(this.state.controls)})
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
    let action = eventName.replace(componentId+'.','')
    let value = event.value

    let resEvent:iComponentEvent = {id: componentId, action, value}
    console.log(resEvent)

    this.setState({events: updateIdArrayItem(resEvent)(this.state.events)})
  }

  onSettingsUpdate = (settings:iSettingsItem[]) => {
    this.setState({settings: settings})
  }

  public render() {
    return (
      <div className="App"> 

        {/* CURRENT SOUNDS */}
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

          eventIn={getItemFromId('SoundPartManager', this.state.events)}
          />



        {/* ALL SOUNDS LIBRARY*/}
        <SoundsManager 
          sounds={this.state.sounds} 

          onUpdate={this.updateSounds}
          onAddCurrentPart={this.addSoundToCurrentPart}

          eventIn={getItemFromId('soundsManager', this.state.events)}
          />


        {/* CURRENT SOUND WORKSTATION*/}
        <SoundEditor
          sound={getEditedItem(this.state.sounds)}
          onCreate={this.createSound}
          onUpdate={this.updateSound}
          />

        <Controls 
          code={getEditedItem(this.state.sounds).code}
          soundId={getEditedItem(this.state.sounds).id}
          onUpdate={this.updateSoundControls}

          eventIn={getItemFromId('controls', this.state.events)}
          />

        {/* SETTINGS*/}
        <SettingsManager 
          settings={this.state.settings}
          onUpdate={this.onSettingsUpdate}
        />
        
        <MidiWatcher onUpdate={this.onMidiUpdate}/>


      </div>
    );
  } 
}

export default App;
