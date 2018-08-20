import * as React from 'react';
import { iSound } from '../Sound/Sound';
import config from '../../config';
import {isArray} from 'lodash'

export interface iStorageData {
    sounds: iSound[]
}

interface Props {
    onUpdate: Function
    data: iStorageData
}

interface State {
}

export default class LocalStorageStorageManager extends React.Component<Props,State> {
    hist: string
    int: any

    constructor(props){
        super(props)
    }

    dataVerified = (newData:any):iStorageData => {
        return {
            sounds: (isArray(newData.sounds)) ? newData.sounds : []
        }
    }

    compareData = (newData:iStorageData) => {
        let dataString = JSON.stringify(newData)
        if (this.hist === dataString) return

        // trigger an update
        newData = this.dataVerified(newData)
        config.debug.storage && console.log('[STORAGE] update data ', newData)
        this.props.onUpdate(newData)

        // update the localstorage
        window.localStorage

        this.hist = dataString 
    }

    componentDidMount () {
        let data:any = window.localStorage

        this.int = setInterval(() => {
           this.compareData(data)
        }, 500)
    }

    componentWillUnmount () {
        clearInterval(this.int)
    }

    render() {
        return (<div></div>)
    }   
}
