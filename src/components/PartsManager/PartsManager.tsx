import * as React from 'react';
import {random} from 'lodash'
import { arrayWithoutItem, arrayWithItem, arrayWithItemsToNotActive, arrayWithItemToActive } from 'src/helpers/arrayHelper';
import { iPart } from 'src/managers/types/part.type';
import Part from 'src/components/Part/Part';
import { BlockTitle, Input, Button } from 'src/styles/components';


interface Props {
    parts: iPart[],
    onUpdate: Function
}

interface State {
    formName: string
}

export default class PartsManager extends React.Component<Props,State> {

    constructor(props) {
        super(props)
        this.state = {
            formName: '',
        }
    }

    //
    // CRUD
    //

    createPart = () => {
        let newPart:iPart = {
            id: random(0,100000).toString(),
            name: this.state.formName,
            sounds: [],
            active: false
        }
        this.props.onUpdate(arrayWithItem(newPart)(this.props.parts))
    }
    deletePart = (partToDelete:iPart) => this.props.onUpdate(arrayWithoutItem(partToDelete, this.props.parts))
    selectPart = (partToSelect:iPart) => this.props.onUpdate(arrayWithItemToActive(partToSelect.id, arrayWithItemsToNotActive(this.props.parts)))

    updateFormName = (ev) => {
        this.setState({formName: ev.target.value})
    }

    render() {
        let parts = this.props.parts || []
        return (
            <div className="sounds" >
                <BlockTitle>Parts</BlockTitle>
                <div>
                    <Input type="text" placeholder="New Part Name" value={this.state.formName} onChange={this.updateFormName} />
                    <Button onClick={this.createPart}>+</Button>
                </div>

                {/* LIST PARTS */}

                <div className="sounds" >
                    <ul>
                        {
                            parts.map((part,i) => (
                                <Part 
                                    key={i} 
                                    part={part}
                                    onDelete={this.deletePart}
                                    onSelect={this.selectPart}
                                />
                            ))
                        }
                        
                    </ul>
                </div>
            </div>
        )
    }   
}