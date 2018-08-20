import * as React from 'react';

export interface iSound {
    id: string
    name: string
    code: string
  }

interface Props {
    sound: iSound
}



export default class Sound extends React.Component<Props,{}> {

    constructor(props){
        super(props)
    }

    render() {
        return (
            <div>sound {this.props.sound.name}</div>
        )
    }   
}
