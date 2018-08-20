import * as React from 'react';
import Sound, { iSound } from '../Sound/Sound';

export interface iPart {
    id: string
    name: string
    sounds: iSound[]
}

interface Props {
    part: iPart
}

interface State {

}

export default class Part extends React.Component<Props,State> {
    render() {
        return (
            <div className="part" >
                <div>Part</div>

            </div>
        )
    }   
}