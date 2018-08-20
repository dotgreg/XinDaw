import * as React from 'react';

export interface iSound {
    id: string
    name: string
    code: string
  }

interface Props {
    sound: iSound,
    onDelete: Function
}



export default class Sound extends React.Component<Props,{}> {

    constructor(props){
        super(props)
    }

    render() {
        return (
            <div>
                sound {this.props.sound.name} 
                <button onClick={() => {this.props.onDelete(this.props.sound)}}>X</button>
            </div>
        )
    }   
}
