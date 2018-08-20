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
}

export default class LocalStorageStorageManager extends React.Component<Props,State> {
    hist: string
    watcher: any

    constructor(props){
        super(props)
    }

    /////////////////////////////////////////////////
    // EVENTS
    /////////////////////////////////////////////////

    componentDidMount () {
        this.watcher = setInterval(() => {  
           this.compareData(this.getLocalStorage())
        }, 500)
    }

    componentWillUnmount () {
        clearInterval(this.watcher)
    }
    
    public update (newData: any) {
        this.compareData(newData)
    }

    /////////////////////////////////////////////////
    // FUNCTIONS
    /////////////////////////////////////////////////

    compareData = (newData:any) => {
        let dataString = JSON.stringify(newData)

        if (this.hist === dataString) return

        // trigger an update
        newData = this.dataVerified(newData)
        config.debug.storage && console.log('[STORAGE] update data ', newData)
        this.props.onUpdate(newData)

        // update the localstorage
        each(newData, (value, name) => {
            window.localStorage.setItem(name, JSON.stringify(value))
        })

        this.hist = dataString 
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
