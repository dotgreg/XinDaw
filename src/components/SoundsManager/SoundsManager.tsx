import * as React from 'react';
import Sound, { iSound } from '../Sound/Sound';
import LocalStorageStorageManager, { iStorageData } from '../StorageManager/LocalStorageStorageManager';
import SoundFormCreate from '../Sound.form.create/SoundFormCreate';
import {filter, findIndex, isNumber} from 'lodash'
import CodeEditor from '../CodeEditor/CodeEditor';
import config from '../../config';
import SoundForm from '../Sound.form/SoundForm';

interface State {
    sounds: iSound[]
    editedSound: undefined | iSound
}

export default class SoundsManager extends React.Component<{},State> {

    StorageManager: LocalStorageStorageManager

    constructor(props){
        super(props)
        this.state = {
            sounds: [],
            editedSound: undefined
        }
    }

    // STORAGE & SYNC
    onStorageUpdate = (data:iStorageData) => {
        this.setState({
            sounds:data.sounds
        })
    }

    //
    // SOUND CRUD
    //
    createSound = (sound:iSound) => {
        let sounds = this.state.sounds
        sounds.push(sound)
        this.StorageManager.update({sounds: sounds})
    }

    updateSound = (sound:iSound) => {
        let i = this.getSoundIndexFromId(sound.id)
        if (!i) return
        let sounds = this.state.sounds
        sounds[i] = sound
        config.debug.soundsCrud && console.log(`[SOUNDS CRUD] updating sound ${sounds[i].name} :`, sounds)
        this.StorageManager.update({sounds: sounds})
    }
    
    deleteSound = (soundToDelete:iSound) => {
        let sounds = this.state.sounds
        sounds = filter(sounds, sound => sound.id !== soundToDelete.id)
        config.debug.soundsCrud && console.log(`[SOUNDS CRUD] deleting sound ${soundToDelete.name}`)
        this.StorageManager.update({sounds: sounds})
    }


    startSoundEdit = (sound:iSound) => {
        this.setState({editedSound: sound})
    }

    startNewSoundEdit = () => {
        this.setState({editedSound: undefined})
    }

    //
    // SUPPORT FUNCTIONS
    //

    getSoundIndexFromId = (id:string) => {
        let sounds = this.state.sounds
        let i = findIndex(sounds, sound => sound.id === id)
        if (!isNumber(i)) return false
        return i
    }
   
    render() {
        return (
            <div>
                <div>SoundsManager</div>

                {/* STORAGE */}
                <LocalStorageStorageManager 
                    ref={(instance:LocalStorageStorageManager) => { this.StorageManager = instance }}
                    onUpdate={this.onStorageUpdate}
                />

                {/* CRUD SOUND */}

                <button onClick={this.startNewSoundEdit}> + </button>
                <SoundForm 
                    sound={this.state.editedSound}
                    onCreate={this.createSound}
                    onUpdate={this.updateSound}
                />
                 
                {/* LIST SOUNDS */}

                <div className="sounds" >
                    <h3>sounds</h3>
                    <ul>
                    {
                        this.state.sounds.map((sound,i) => (
                            <Sound 
                                key={i} 
                                sound={sound}
                                onEdit={this.startSoundEdit}
                                onDelete={this.deleteSound}
                            />
                        ))
                    }
                    </ul>
                </div>

            </div>
        )
    }   
}
