import * as React from 'react';
import Sound, { iSound } from '../Sound/Sound';
import { removeItem, updateItemToEdited, updateItemsToNotEdited } from '../../helpers/arrayHelper';

interface Props {
    sounds: iSound[]
    onUpdate: Function,
    onAddCurrentPart: Function
}

interface State {

}

export default class SoundsManager extends React.Component<Props,State> {

    deleteSound = (soundToDelete:iSound) => this.props.onUpdate(removeItem(soundToDelete, this.props.sounds))
    editSound = (sound:iSound) => this.props.onUpdate(updateItemToEdited(sound.id, updateItemsToNotEdited(this.props.sounds)))
    startNewSoundEdit = () => this.props.onUpdate(updateItemsToNotEdited(this.props.sounds))

    render() {
        return (
            <div>
                <div>SoundsManager</div>

                {/* CRUD SOUND */}

                <button onClick={this.startNewSoundEdit}> + </button>
                 
                {/* LIST SOUNDS */}

                <div className="sounds" >
                    <h3>sounds</h3>
                    <ul>
                        {
                            this.props.sounds.map((sound,i) => (
                                <Sound 
                                    key={i} 
                                    sound={sound}
                                    onEdit={this.editSound}
                                    onDelete={this.deleteSound}
                                    onAddCurrentPart={this.props.onAddCurrentPart}
                                />
                            ))
                        }
                        
                    </ul>
                </div>

            </div>
        )
    }   
}
