import * as React from 'react';

import './part.css'
import { iPart } from 'src/managers/types/part.type';
import { Li, Button } from 'src/styles/components';

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
            <Li>
                <div className={`part ${this.props.part.active && 'active'}`}>
                    <span onClick={() => {this.props.onSelect(this.props.part)}}>{this.props.part.name}</span>
                    <Button onClick={() => {this.props.onDelete(this.props.part)}}>X</Button>
                </div>
            </Li>
        )
    }   
}