import * as React from 'react';
import Part, { iPart } from '../Part/Part';
import {random, filter} from 'lodash'
import { getIndexFromId, arrayWithoutItem, arrayWithItem, arrayWithItemsToNotActive, arrayWithItemToActive } from '../../helpers/arrayHelper';
import config from '../../config';


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
        this.props.onUpdate(arrayWithItem(newPart, this.props.parts))
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
                <h3>Parts Manager</h3>
                <div>
                    <input type="text" value={this.state.formName} onChange={this.updateFormName} />
                    <button onClick={this.createPart}>+</button>
                </div>

                {/* LIST PARTS */}

                <div className="sounds" >
                    <h3>parts</h3>
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