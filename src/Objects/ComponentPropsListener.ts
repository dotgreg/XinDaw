import {each, cloneDeep} from 'lodash'
import { areSame } from 'src/helpers/areSame';
import config from 'src/config';
import { checkType } from 'src/managers/types/typeCheck';


export class ComponentPropsListener {
    private hist: {[key:string]:any}
    private callbacks: {[key:string]:Function}

    /**
    *  Adding a change listener system for components that is comparing 
    *  complex props (multi-depth objects for instance)
    * 
    *  example :
    *  ``` 
    *  constructor(props) {
            super(props)
            this.propsListener = new ComponentPropsListener({
                'PropName1': Function to proceed when "PropName1" is changed
            )}
        }
        ...
        componentDidUpdate = () => { this.propsListener.listen(this.props) }
        ```
    * 
    */
    constructor(listeners?:{[prop:string]:Function}){
        this.hist = {}
        this.callbacks = {}

        if (listeners) {
            each(listeners, (callback, propName) => {
                this.add(propName, callback)
            })
        }
    }

    /**
    * register new event to props listener
    */
   add(propName:string, callback:Function) {
       this.callbacks[propName] = callback
    }
    
    /**
    * listen to all events, should be used as followed :  
    * ```componentDidUpdate = () => { this.propsListener.listen(this.props) }```
    */
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