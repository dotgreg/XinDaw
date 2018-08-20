import * as React from 'react';
import Sound, { iSound } from '../Sound/Sound';
import LocalStorageStorageManager, { iStorageData } from '../StorageManager/LocalStorageStorageManager';
import SoundFormCreate from '../Sound.form.create/SoundFormCreate';

interface State {
    sounds: iSound[]
}

export default class SoundsManager extends React.Component<{},State> {

    StorageManager: LocalStorageStorageManager

    constructor(props){
        super(props)
        this.state = {
            sounds: [],
        }
    }

    // STORAGE & SYNC
    onStorageUpdate = (data:iStorageData) => {
        this.setState({
            sounds:data.sounds
        })
    }

    // SOUND CRUD
    createSound = (sound:iSound) => {
        let sounds = this.state.sounds
        sounds.push(sound)
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


                {/* LIST SOUNDS */}

                <div className="sounds" >
                    <h3>sounds</h3>
                    <ul>
                    {
                        this.state.sounds.map((sound,i) => (
                            <Sound key={i} sound={sound}/>
                        ))
                    }
                    </ul>
                </div>

            </div>
        )
    }   
}
