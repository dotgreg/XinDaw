import * as React from 'react';

import PartsManager from 'src/components/PartsManager/PartsManager';
import { getEditedItem, arrayWithItemsToNotEdited, arrayWithItemToEdited, arrayWithItem, updateIdArrayItem, getActiveItem, addSoundToPart, getSoundsFromIds, removeSoundToPart, getItemFromId, getItemFromProp} from 'src/helpers/arrayHelper';

import { startToneApp } from 'src/managers/tone/startToneApp';
import Controls from 'src/components/Controls/Controls';
import MidiWatcher, { iMidiSignal }  from 'src/components/MidiWatcher/MidiWatcher';

import {filter,random} from 'lodash'
import { iSound, tSound } from 'src/managers/types/sound.type';
import { checkType, t } from 'src/managers/types/typeCheck';
import { iPart, tPart } from 'src/managers/types/part.type';
import { iSoundControls } from 'src/managers/types/control.type';
import { iSettingsItem } from 'src/managers/types/settings.type';
import { iComponentEvent } from 'src/managers/types/componentEvent.type';
import { getDB, persistDB, generateInitialDb, iStateDawPage } from 'src/managers/db.manager';
import SoundEditor from 'src/components/SoundEditor/SoundEditor';
import styled, { css } from 'react-emotion';
import { Panel, Settings, BlockTitle, Input, Li } from 'src/styles/components';
import KeysBindingManager from 'src/components/KeysBindingManager/KeysBindingManager';
import Checkbox from 'src/components/Checkbox/Checkbox';
import SettingsPart from 'src/components/SettingsPart/SettingsPart';
import PartSoundsManager from 'src/components/PartSoundsManager/PartSoundsManager';

import hotkeys from 'hotkeys-js'
import SoundsLibrary from 'src/components/SoundsLibrary/SoundsLibrary';
import config from 'src/config';
import { consts } from 'src/constants';
import { buildSettingsObj } from 'src/managers/settings.manager';
import { getMidiSignalType } from 'src/managers/midi/signalType.midi';
import ErrorBoundary from 'src/components/ErrorBoundary';

interface Props {
  path?: string
  history?: any
}



// @reactMixin.decorate(LocalStorageMixin)
class DawPage extends React.Component<Props, iStateDawPage> {

  constructor(props) {
    super(props)
    console.log('load LS at that moment');
    
    this.state = generateInitialDb()

    let persistedDb = getDB()
    
    if (persistedDb && persistedDb.sounds) {
      config.debug.dbManager && console.log('[DB] db found, loading it', persistedDb);

      // reinit events to not have possible ancient events coming back from the death 
      persistedDb.events = []

      this.state = persistedDb
    }

    buildSettingsObj(this.state.settings)

    startToneApp()

    hotkeys('ctrl+d', (event, handler) => {
      event.preventDefault() 
      this.setState({settingsOpen: !this.state.settingsOpen})
    });


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

  onMidiSignal = (midiSignal:iMidiSignal) => {
    this.triggerEvent(midiSignal)
  }

  triggerEvent = (midiSignal: iMidiSignal) => {
    let value = midiSignal.value
    let state = midiSignal.state
    let raw = midiSignal
    let signalType = getMidiSignalType(midiSignal)
    let log = `[MIDI] midi signal ${JSON.stringify(midiSignal)} no action triggered (${JSON.stringify(signalType)})`

    // check inside settings if event exists
    if (signalType.device === 'button' || signalType.device === 'knob') {
      let res = filter(this.state.settings, config => {
        return (config.type === 'event' && config.value === midiSignal.id)
      })
  
      // Action found for event
      if (res[0]) {
        let eventName = res[0].key
        let componentId = eventName.split('.')[0]
        let action = eventName.replace(componentId+'.','')
        let triggeredEvent:iComponentEvent = {id: componentId, action, value, state, signalType, raw}
        
        log = `[MIDI] midi signal ${JSON.stringify(midiSignal)} triggered BUTTON/KNOB action ${JSON.stringify(triggeredEvent)}`
        this.setState({events: updateIdArrayItem(triggeredEvent)(this.state.events)})
      } 
    }

    // if event type is keyboard, trigger that action
    else if (signalType.device === 'keyboard') {
      console.log(2222);
      
      let value = midiSignal.value
      let triggeredEvent:iComponentEvent = {id: consts.comps.partSoundsManager, action: "keyboard.pressed", value, state, signalType, raw}
      log = `[MIDI] midi signal ${JSON.stringify(midiSignal)} triggered KEYBOARD action ${JSON.stringify(triggeredEvent)}`
      this.setState({events: updateIdArrayItem(triggeredEvent)(this.state.events)})
    }
    
    if (config.debug.midiWatcher && log) console.log(log)
    
  }

  onSettingsUpdate = (settings:iSettingsItem[]) => {
    this.setState({settings: settings}, () => {
      // recreate the settings Obj
      buildSettingsObj(this.state.settings)
    })
  }

  public render() {
    // rerender everytime this.state changes, thus persist at that moment
    persistDB(this.state)

    return (
      <StyledApp> 

        <div className="main-wrapper">
          {/* CURRENT SOUNDS */}
          <Panel w={25} className="left panel">
            <PartsManager 
              parts={this.state.parts} 
              onUpdate={this.updateParts} 
              />

        
                <ErrorBoundary>
                  <PartSoundsManager
                    // part={getActiveItem(this.state.parts).sounds} 
                    // @ts-ignore
                    sounds={getSoundsFromIds(getActiveItem(this.state.parts).sounds, this.state.sounds)} 
                    controls={this.state.controls}

                    onUpdate={this.updateParts}
                    onRemoveSound={this.removeSoundToCurrentPart}
                    onTriggerSoundEdit={this.triggerSoundEdit}

                    eventIn={getItemFromId(consts.comps.partSoundsManager, this.state.events)}
                    />
                </ErrorBoundary>
              
          </Panel>



          <Panel w={50} className="middle panel">
            {/* CURRENT SOUND WORKSTATION*/}

            <BlockTitle>Sound Editor</BlockTitle>

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
            <SoundsLibrary 
              sounds={this.state.sounds} 

              onUpdate={this.updateSounds}
              onAddCurrentPart={this.addSoundToCurrentPart}

              eventIn={getItemFromId(consts.comps.soundsLibrary, this.state.events)}
              />
              
            <BlockTitle onClick={()=>{this.setState({settingsOpen: true})}}>Settings</BlockTitle> 
          </Panel>

        </div>  


        
        {/* SETTINGS*/}

        <Settings open={this.state.settingsOpen}>
          <div onClick={()=>{this.setState({settingsOpen: false})}}>X</div>
          
          <SettingsPart name="Documentation" h={50} w={70}>
            <iframe src="https://tonejs.github.io/docs/r12/Event" className={css`width: 100%; height: 100%; border: none; background: white;`}></iframe>
          </SettingsPart>

          <SettingsPart name="Interface" h={10}>
            <Checkbox 
              label="midi watcher panel enabled" 
              initVal={this.state.midiDebugOpen} 
              onChange={(res)=>{this.setState({midiDebugOpen: res})}
            } />
          </SettingsPart>

          <SettingsPart name="Key Bindings" h={50}>
            <KeysBindingManager 
              settings={this.state.settings}
              onUpdate={this.onSettingsUpdate}
              />
          </SettingsPart>
          
          <SettingsPart name="Backup & Restore" h={10}>
            {/* <textarea className={css`width: 100%; height: 300px;`}>{JSON.stringify(this.state)}</textarea> */}
            <ul>
              <Li> <button onClick={()=>{prompt("Exported DB", JSON.stringify(this.state));}}>export data to console</button> </Li>
              <Li> <button onClick={()=>{this.props.history.push('/db')}}>modify db</button> </Li>
            </ul>
            
          </SettingsPart>

        </Settings>


        <MidiWatcher 
          onUpdate={this.onMidiSignal} 
          debugPanel={this.state.midiDebugOpen}/>

      </StyledApp>
    );
  } 
}


let StyledApp = styled('div')`
  .main-wrapper {
    display: flex;

    .panel {
      flex: 1 1 auto;
    }
  }
`


export default DawPage;
