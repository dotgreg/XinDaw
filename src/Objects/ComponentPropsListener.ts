import {each} from 'lodash'
import { areSame } from '../helpers/areSame';
import config from '../config';

export class ComponentPropsListener {
    private hist: {[key:string]:any}
    private callbacks: {[key:string]:Function}

    constructor(){
        this.hist = {}
        this.callbacks = {}
    }

    onChange(propName:string, callback:Function) {
        this.callbacks[propName] = callback
    }

    listen(props:any) {
        console.log('test')
        each(props, (prop, propName) => {
            if (!areSame(this.hist[propName], prop)){
                config.debug.ComponentPropsListener && console.log(`[ComponentPropsListener] ${propName} changed, trigger callback`)
                
                this.hist[propName] = Object.assign({}, prop)
                let callback = this.callbacks[propName]
                
                callback ? callback() : config.debug.ComponentPropsListener && console.warn(`[ComponentPropsListener] no callback function found for ${propName}`)
            }
        })
    }
}