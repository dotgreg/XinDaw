import {each, cloneDeep} from 'lodash'
import { areSame } from 'src/helpers/areSame';
import config from 'src/config';

export class ComponentPropsListener {
    private hist: {[key:string]:any}
    private callbacks: {[key:string]:Function}

    constructor(listeners?:{[prop:string]:Function}){
        this.hist = {}
        this.callbacks = {}

        if (listeners) {
            each(listeners, (callback, propName) => {
                this.add(propName, callback)
            })
        }
    }

    add(propName:string, callback:Function) {
        this.callbacks[propName] = callback
    }

    listen(props:any) {
        each(props, (prop, propName) => {
            if (!areSame(this.hist[propName], prop)){
                config.debug.ComponentPropsListener && console.log(`[ComponentPropsListener] ${propName} changed, trigger callback`)
                
                this.hist[propName] = cloneDeep(prop)
                let callback = this.callbacks[propName]
                
                callback ? callback() : config.debug.ComponentPropsListener && console.warn(`[ComponentPropsListener] no callback function found for ${propName}`)
            }
        })
    }
}