import * as React from 'react';
import Sound from '../Sound/Sound';
import { arrayWithoutItem, arrayWithItemToEdited, arrayWithItemsToNotEdited, getEditedItem, getEditedIndex } from '../../helpers/arrayHelper';
import { ComponentPropsListener } from '../../Objects/ComponentPropsListener';
import { cx } from 'emotion';
import s from '../../styles';
import config from '../../config';
import { iSound } from '../../managers/types/sound.type';
import { iComponentEvent } from '../../managers/types/componentEvent.type';



interface Props {
    sounds: iSound[]

    onUpdate: Function
    onAddCurrentPart: Function

    eventIn: iComponentEvent
}

export default class SoundsManager extends React.Component<Props,{}> {

    propsListener: ComponentPropsListener
    constructor(props) {
        super(props)
        this.propsListener = new ComponentPropsListener({
            'eventIn': () => {
                let event = this.props.eventIn
                config.debug.soundsManager && console.log('[SOUNDSMANAGER] eventIn changed to', event)
                let editedIndex = getEditedIndex(this.props.sounds)
                if (event.action === 'list.up') this.editSound(this.props.sounds[editedIndex - 1]) 
                if (event.action === 'list.down') this.editSound(this.props.sounds[editedIndex + 1]) 
                if (event.action === 'list.addToPart') this.props.onAddCurrentPart(this.props.sounds[editedIndex]) 
            },
        })
    }
    componentDidUpdate = () => { this.propsListener.listen(this.props) }
    

    deleteSound = (soundToDelete:iSound) => this.props.onUpdate(arrayWithoutItem(soundToDelete, this.props.sounds))
    editSound = (sound:iSound) => sound && this.props.onUpdate(arrayWithItemToEdited(sound.id, arrayWithItemsToNotEdited(this.props.sounds)))
    startNewSoundEdit = () => this.props.onUpdate(arrayWithItemsToNotEdited(this.props.sounds))

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
                                <li key={i} className={cx( sound.edited && s.sound.active)}>
                                    <Sound 
                                        sound={sound}
                                        onEdit={this.editSound}
                                        onDelete={this.deleteSound}
                                        onAddCurrentPart={this.props.onAddCurrentPart}
                                    />
                                </li>
                            ))
                        }
                        
                    </ul>
                </div>
            </div>
        )
    }   
}
