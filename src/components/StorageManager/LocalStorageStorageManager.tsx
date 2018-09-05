import * as React from 'react';
import {isArray, each} from 'lodash'
import { iPart } from '../Part/Part';
import { areSame } from '../../helpers/areSame';
import { iSound } from '../../managers/types/sound.type';

export interface iStorageData {
    sounds: iSound[]
    parts: iPart[]
}

interface Props {
    onUpdate: Function
}

interface State {
    data:iStorageData
}

export default class LocalStorageStorageManager extends React.Component<Props,State> {
    hist: string
    watcher: any

    constructor(props){
        super(props)
        this.state = {
            data: {
                sounds: [],
                parts: []
            }
        }
    }

    /////////////////////////////////////////////////
    // EVENTS
    /////////////////////////////////////////////////

    componentDidMount () {
        this.watcher = setInterval(() => {  
            let ls = this.getLocalStorage()
            this.setState({data: this.dataVerified(ls)})
        }, 500)
    }

    componentDidUpdate(prevProps, prevState) {
        if (JSON.stringify(prevState.data) !== JSON.stringify(this.state.data)) {
            
            this.props.onUpdate(this.state.data)

            // update the localstorage
            each(this.state.data, (value, name) => {
                window.localStorage.setItem(name, JSON.stringify(value))
            })
        }
    }

    componentWillUnmount () {
        clearInterval(this.watcher)
    }
    
    public update (prop: string, newData: any) {
        let data = this.state.data
        data[prop] = newData
        data = this.dataVerified(data)
        this.setState({data: data})
    }

    dataVerified = (newData:any):iStorageData => {
        return {
            sounds: (isArray(newData.sounds)) ? newData.sounds : [],
            parts: (isArray(newData.parts)) ? newData.parts : [],
        }
    }

    getLocalStorage = () => {
        let data = {}
        let ls = JSON.parse(JSON.stringify(window.localStorage))
        each(ls, (value:string, name:string) => {
            let res = value
            try {
                res = JSON.parse(value)
            } catch (error) { }
            data[name] = res
        })
        return data
    }

    shouldComponentUpdate(nextProps, nextState) {
        if (areSame(nextState.data, this.state.data)) return false
        else return true
    }

    render() {
        console.log('render')
        let children:any[] = []
        if (!isArray(this.props.children)) children.push(this.props.children)
        else children = this.props.children

        let modifChildren = children.map( (child, i) => {
            return React.cloneElement(child, { key: i, store: this });
        });

        return (
            <div>
                {modifChildren}
            </div>
        )
    }   
}
