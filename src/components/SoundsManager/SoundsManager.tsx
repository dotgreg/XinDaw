import * as React from 'react';
import Sound, { iSound } from '../Sound/Sound';
import { arrayWithoutItem, arrayWithItemToEdited, arrayWithItemsToNotEdited } from '../../helpers/arrayHelper';
import { iComponentEvent } from '../../App';
import { areSame } from '../../helpers/areSame';
import { ComponentPropsListener } from '../../Objects/ComponentPropsListener';
import { cx } from 'emotion';
import s from '../../styles';

interface Props {
    sounds: iSound[]

    onUpdate: Function
    onAddCurrentPart: Function

    eventIn: iComponentEvent
}

interface State {
    activeSound: number
}

export default class SoundsManager extends React.Component<Props,State> {

    propsListener: ComponentPropsListener
 
    constructor(props) {
        super(props)

        this.state = {
            activeSound: 0
        }

        this.propsListener = new ComponentPropsListener({
            'eventIn': this.onEventInChange,
        })
    }
    
    // ON PROPS CHANGE
    onEventInChange = () => {
        console.log('eventIn changed to', this.props.eventIn)
    }

    componentDidUpdate = () => { this.propsListener.listen(this.props) }

    deleteSound = (soundToDelete:iSound) => this.props.onUpdate(arrayWithoutItem(soundToDelete, this.props.sounds))
    editSound = (sound:iSound) => this.props.onUpdate(arrayWithItemToEdited(sound.id, arrayWithItemsToNotEdited(this.props.sounds)))
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
                                <li 
                                    key={i} 
                                    className={cx(
                                        sound.edited && s.sound.active, 
                                    )}>
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
