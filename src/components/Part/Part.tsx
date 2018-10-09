import * as React from 'react';

import './part.css'
import { iPart } from 'src/managers/types/part.type';
import { Li, Button, ButtonSmall } from 'src/styles/components';
import { cx } from 'emotion';
import s from 'src/styles';

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
                <div className={cx(this.props.part.active && s.text.active)}>
                    <span onClick={() => {this.props.onSelect(this.props.part)}}>{this.props.part.name}</span>
                    <ButtonSmall onClick={() => {this.props.onDelete(this.props.part)}}>X</ButtonSmall>
                </div>
            </Li>
        )
    }   
}