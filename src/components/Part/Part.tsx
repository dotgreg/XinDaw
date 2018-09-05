import * as React from 'react';

import './part.css'

export interface iPart {
    id: string
    name: string
    sounds: string[]
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
                <span onClick={() => {this.props.onSelect(this.props.part)}}>{this.props.part.name}</span>
                <button onClick={() => {this.props.onDelete(this.props.part)}}>X</button>
            </div>
        )
    }   
}