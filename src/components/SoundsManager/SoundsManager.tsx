import * as React from 'react';
import Sound, { iSound } from '../Sound/Sound';
import LocalStorageStorageManager, { iStorageData } from '../StorageManager/LocalStorageStorageManager';
import SoundFormCreate from '../Sound.form.create/SoundFormCreate';
import {filter, findIndex, isNumber} from 'lodash'
import CodeEditor from '../CodeEditor/CodeEditor';
import config from '../../config';

interface State {
    sounds: iSound[]
    editedCodeSound: undefined | iSound
}

export default class SoundsManager extends React.Component<{},State> {

    StorageManager: LocalStorageStorageManager

    constructor(props){
        super(props)
        this.state = {
            sounds: [],
            editedCodeSound: undefined
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

    deleteSound = (soundToDelete:iSound) => {
        let sounds = this.state.sounds
        sounds = filter(sounds, sound => sound.id !== soundToDelete.id)
        this.StorageManager.update({sounds: sounds})
    }

    //
    // SOUND EDITION
    //

    startCodeEditor = (sound:iSound) => {
        this.setState({editedCodeSound: sound})
    }

    saveCode = (newCode: string) => { 
        if (!this.state.editedCodeSound) return console.warn('[EDIT] no editedCodeSound to save code to')
        let sounds = this.state.sounds
        let i = findIndex(sounds, sound => sound.id === (this.state.editedCodeSound as iSound).id)
        if (!isNumber(i)) return
        sounds[i].code = newCode
        config.debug.soundsCrud && console.log(`[SOUNDS CRUD] updating code of sound ${sounds[i].name}`, sounds)
        this.StorageManager.update({sounds: sounds})
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

                <SoundFormCreate 
                    onCreate={this.createSound}
                />

                {/* EDITOR */}
                {
                    this.state.editedCodeSound && (
                        <CodeEditor
                            onSave={this.saveCode}
                            code={this.state.editedCodeSound.code}
                        />
                    )
                }
                 

                {/* LIST SOUNDS */}

                <div className="sounds" >
                    <h3>sounds</h3>
                    <ul>
                    {
                        this.state.sounds.map((sound,i) => (
                            <Sound 
                                key={i} 
                                sound={sound}
                                onEdit={this.startCodeEditor}
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
