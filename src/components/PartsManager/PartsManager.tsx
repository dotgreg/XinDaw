import * as React from 'react';
import Sound, { iSound } from '../Sound/Sound';
import { iStorageData } from '../StorageManager/LocalStorageStorageManager';
import { iPart } from '../Part/Part';

interface Props {
    parts: iPart[]
}

interface State {
    formName: string
    parts: iPart[]
}

export default class PartsManager extends React.Component<Props,State> {

    constructor(props) {
        super(props)
        this.state = {
            formName: '',
            parts: []
        }
    }

     // STORAGE & SYNC
     onStorageUpdate = (data:iStorageData) => {
        // console.log('onStorageUpdate', data)
        // this.setState({
        //     // parts: data.parts
        // })
    }

    updateFormName = (ev) => {
        this.setState({formName: ev.target.value})
    }

    render() {
        return (
            <div className="sounds" >
                <h3>Parts Manager</h3>
                <input type="text" value={this.state.formName} onChange={this.updateFormName} />
            </div>
        )
    }   
}