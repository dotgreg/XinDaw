import * as React from 'react';
import Sound, { iSound } from '../Sound/Sound';
import LocalStorageStorageManager, { iStorageData } from '../StorageManager/LocalStorageStorageManager';
import {filter, findIndex, isNumber} from 'lodash'
import CodeEditor from '../CodeEditor/CodeEditor';
import config from '../../config';
import SoundForm from '../Sound.form/SoundForm';
import { getIndexFromId } from '../../helpers/getIndexFromId';

interface Props {
    sounds: iSound[]
    store?: LocalStorageStorageManager
}

interface State {
    sounds: iSound[]
    editedSound: undefined | iSound
}

export default class SoundsManager extends React.Component<Props,State> {

    constructor(props){
        super(props)
        this.state = {
            sounds: [],
            editedSound: undefined
        }
    }

    // STORAGE & SYNC
    componentWillUpdate(prevProps) {
        console.log(this.props)
        if (this.props.sounds !== this.state.sounds) {
            this.setState({sounds: this.props.sounds})
        }
    }
    

    //
    // SOUND CRUD
    //
    createSound = (sound:iSound) => {
        let sounds = this.state.sounds
        sounds.push(sound)
        console.log(this.props)

        // @ts-ignore
        this.props.store.update('sounds', sounds)
    }

    updateSound = (sound:iSound) => {
        let i = this.getSoundIndexFromId(sound.id)
        let sounds = this.state.sounds
        if (!isNumber(i)) return console.warn(`[SOUNDS CRUD] updating sound id ${sound.id} does not exists`, sounds)
        sounds[i] = sound
        config.debug.soundsCrud && console.log(`[SOUNDS CRUD] updating sound ${sounds[i].name} :`, sounds)
        // @ts-ignore
        this.props.store.update('sounds', sounds)
    }
    
    deleteSound = (soundToDelete:iSound) => {
        let sounds = this.state.sounds
        sounds = filter(sounds, sound => sound.id !== soundToDelete.id)
        config.debug.soundsCrud && console.log(`[SOUNDS CRUD] deleting sound ${soundToDelete.name}`)
        // @ts-ignore
        this.props.store.update('sounds', sounds)
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
    getSoundIndexFromId = (id:string) => getIndexFromId(this.state.sounds, id)
   
    render() {
        return (
            <div>
                <div>SoundsManager</div>

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
