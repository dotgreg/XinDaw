import * as React from 'react';

export interface iSettingsItem {
    type: string
    value: number
    eventName: string
}

interface Props {
    onUpdate: Function
}

interface State {
}

export default class SettingsManager extends React.Component<Props,State> {

    constructor(props) {
        super(props)
        this.state = {
        }
    }

    componentDidMount() {
        let settings = [
            {type: 'event', value:48, eventName: 'controls.knob1'}
        ]
        this.props.onUpdate(settings)
    }

    render() {
        return (
           <div></div>
        )
    }   
}
