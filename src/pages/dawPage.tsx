import * as React from 'react';

import SoundsManager from 'src/components/SoundsManager/SoundsManager';
import PartsManager from 'src/components/PartsManager/PartsManager';

import LocalStorageMixin from 'react-localstorage'
import reactMixin  from 'react-mixin'
import { getEditedItem, arrayWithItemsToNotEdited, arrayWithItemToEdited, arrayWithItem, updateIdArrayItem, getActiveItem, addSoundToPart, getSoundsFromIds, removeSoundToPart, getItemFromId} from 'src/helpers/arrayHelper';
import SoundPartManager from 'src/components/SoundPartManager/SoundPartManager';

import { startToneApp } from 'src/managers/tone/startToneApp';
import Controls from 'src/components/Controls/Controls';
import MidiWatcher, { iMidiEvent } from 'src/components/MidiWatcher/MidiWatcher';

import {filter} from 'lodash'
import { iSound, tSound } from 'src/managers/types/sound.type';
import { checkType, t } from 'src/managers/types/typeCheck';
import { iPart, tPart } from 'src/managers/types/part.type';
import { iSoundControls } from 'src/managers/types/control.type';
import { iSettingsItem } from 'src/managers/types/settings.type';
import { iComponentEvent } from 'src/managers/types/componentEvent.type';
import SoundEditor from 'src/components/SoundEditor/SoundEditor';
import styled from 'react-emotion';
import { Panel, Settings, SettingsPanel, BlockTitle } from 'src/styles/components';
import KeysBindingManager from 'src/components/KeysBindingManager/KeysBindingManager';



interface State {
  sounds: iSound[],
  parts: iPart[],
  controls: iSoundControls[],
  settings: iSettingsItem[],
  events: iComponentEvent[],
  settingsOpened: boolean
}

interface Props {
  path?: string
}

@reactMixin.decorate(LocalStorageMixin)
class DawPage extends React.Component<Props, State> {

  constructor(props) {
    super(props)
    this.state = {
      sounds: [],
      parts: [],
      controls: [],
      settings: [],
      events: [],
      settingsOpened: false
    }

    startToneApp()

    // if we have no sounds, import some defaults
    // if (this.state.sounds.length === 0)

    // @ts-ignore
    // this.createSound({test:'nonfdsofdas'})
  }

  updateSounds = (sounds:iSound[]) => {
    if(!checkType(t.array(tSound))(sounds)) return
    this.setState({sounds: sounds})
  }
  
  updateParts = (parts:iPart[]) => {
    if(!checkType(t.array(tPart))(parts)) return
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
      <StyledApp> 

        <div className="main-wrapper">
          {/* CURRENT SOUNDS */}
          <Panel w={25} className="left panel">
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
          </Panel>



          <Panel w={50} className="middle panel">
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
          </Panel>
          
          <Panel w={25} className="right panel">
          
            {/* ALL SOUNDS LIBRARY*/}
            <SoundsManager 
              sounds={this.state.sounds} 

              onUpdate={this.updateSounds}
              onAddCurrentPart={this.addSoundToCurrentPart}

              eventIn={getItemFromId('soundsManager', this.state.events)}
              />
              
            <BlockTitle onClick={()=>{this.setState({settingsOpened: true})}}>Settings</BlockTitle> 
          </Panel>

        </div>  


        
        <Settings open={this.state.settingsOpened}>
          <div onClick={()=>{this.setState({settingsOpened: false})}}>X</div>
          <SettingsPanel>
            {/* SETTINGS*/}
            <KeysBindingManager 
              settings={this.state.settings}
              onUpdate={this.onSettingsUpdate}
            />
          </SettingsPanel>
        </Settings>

        <div className="hidden panel">
          <MidiWatcher onUpdate={this.onMidiUpdate}/>
        </div>

      </StyledApp>
    );
  } 
}


let StyledApp = styled('div')`
  .main-wrapper {
    display: flex;

    .panel {
      flex: 1 1 auto;
      &.right {
      
      }
      &.middle {

      }
      &.left {

      }
    }
  }
`


export default DawPage;
