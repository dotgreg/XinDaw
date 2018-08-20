import * as React from 'react';
import LocalStorageStorageManager from '../StorageManager/LocalStorageStorageManager';
import Part, { iPart } from '../Part/Part';
import {random, filter} from 'lodash'
import { getIndexFromId } from '../../helpers/getIndexFromId';
import config from '../../config';


interface Props {
    parts: iPart[],
    onUpdate: Function
}

interface State {
    formName: string
    parts: iPart[]
}

export default class PartsManager extends React.Component<Props,State> {

    constructor(props) {
        super(props)
        this.state = {
            formName: '',
            parts: []
        }
    }

    //
    // CRUD
    //

    createPart = () => {
        let newPart:iPart = {
            id: random(0,100000).toString(),
            name: this.state.formName,
            sounds: []
        }
        let parts = this.state.parts
        parts.push(newPart)
        
        this.props.onUpdate(parts)
    }
    
    deletePart = (partToDelete:iPart) => {
        let parts = this.state.parts
        parts = filter(parts, sound => sound.id !== partToDelete.id)
        config.debug.partsCrud && console.log(`[parts CRUD] deleting sound ${partToDelete.name}`)
        
        this.props.onUpdate(parts)
    }

    //
    // SUPPORT FUNCTIONS
    //
    getPartIndexFromId = (id:string) => getIndexFromId(this.state.parts, id)

    updateFormName = (ev) => {
        this.setState({formName: ev.target.value})
    }

    render() {
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
                            this.state.parts.map((part,i) => (
                                <Part 
                                    key={i} 
                                    part={part}
                                    onDelete={this.deletePart}
                                />
                            ))
                        }
                        
                    </ul>
                </div>
            </div>
        )
    }   
}