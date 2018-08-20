import * as React from 'react';
import Sound, { iSound } from '../Sound/Sound';

import './part.css'

export interface iPart {
    id: string
    name: string
    sounds: iSound[]
    active: boolean
}

interface Props {
    part: iPart
    onDelete: Function
    onSelect:Function
}

interface State {

}

export default class Part extends React.Component<Props,State> {
    render() {
        return (
            <div className={`part ${this.props.part.active && 'active'}`}>
                {this.props.part.name}
                <button onClick={() => {this.props.onSelect(this.props.part)}}>S</button>
                <button onClick={() => {this.props.onDelete(this.props.part)}}>X</button>
            </div>
        )
    }   
}