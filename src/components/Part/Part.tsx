import * as React from 'react';
import Sound, { iSound } from '../Sound/Sound';

export interface iPart {
    id: string
    name: string
    sounds: iSound[]
}

interface Props {
    part: iPart
    onDelete: Function
    // onEdit:Function
}

interface State {

}

export default class Part extends React.Component<Props,State> {
    render() {
        return (
            <div>
                {/* <span onClick={() => {this.props.onEdit(this.props.part)}}> {this.props.part.name} </span> */}
                {this.props.part.name} 
                <button onClick={() => {this.props.onDelete(this.props.part)}}>X</button>
            </div>
        )
    }   
}