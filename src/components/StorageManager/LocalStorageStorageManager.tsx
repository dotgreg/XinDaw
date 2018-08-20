import * as React from 'react';
import { iSound } from '../Sound/Sound';
import config from '../../config';
import {isArray, each} from 'lodash'

export interface iStorageData {
    sounds: iSound[]
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
                sounds: []
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
            config.debug.storage && console.log('[STORAGE] update data ', this.state.data)
            
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
    
    public update (newData: any) {
        this.setState({data: this.dataVerified(newData)})
    }

    dataVerified = (newData:any):iStorageData => {
        return {
            sounds: (isArray(newData.sounds)) ? newData.sounds : []
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

    

    render() {
        return (<div></div>)
    }   
}
