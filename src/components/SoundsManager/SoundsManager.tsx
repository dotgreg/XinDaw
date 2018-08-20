import * as React from 'react';
import Sound, { iSound } from '../Sound/Sound';
import LocalStorageStorageManager, { iStorageData } from '../StorageManager/LocalStorageStorageManager';

interface State {
    sounds: iSound[]
}

export default class SoundsManager extends React.Component<{},State> {

    constructor(props){
        super(props)
        this.state = {
            sounds: []
        }
    }

    onStorageUpdate = (data:iStorageData) => {
        console.log(data)
        this.setState({
            sounds:data.sounds
        })
    }

    render() {
        return (
            <div>
                <div>SoundsManager</div>

                <LocalStorageStorageManager 
                    onUpdate={this.onStorageUpdate}
                    data={{
                        sounds: this.state.sounds
                    }}
                />

                <div className="sounds" >
                    <h3>sounds</h3>
                    <ul>
                    {
                        this.state.sounds.map(sound => (
                            <Sound sound={sound}/>
                        ))
                    }
                    </ul>
                </div>

            </div>
        )
    }   
}
