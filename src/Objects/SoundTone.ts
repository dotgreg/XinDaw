import { prepareCode } from "../managers/code/prepareCode";
import { evalCode } from "../managers/code/evalCode";
import config from "../config";
import Tone from 'tone'
import {each} from 'lodash'
import { iControlVar } from "../managers/types/control.type";
import { analyzeCode } from "src/managers/code/analyzeCode";
import { iPlayType, iToneType, iProcessedMidiInfos } from "src/managers/types/general.types";
import { idKeyToNote } from "src/managers/keyboard";

interface optionsSoundTone {
    vars: iControlVar[] 
}


/** SoundTone is an object belonging to Sound Component that contains and manages a Tone object  */
export class SoundTone {

    private code:string

    private tone:any
    private elementsToDispose:any[]
    
    public options:optionsSoundTone
    public type:iToneType
    public error:null|string

    constructor(code:string){
        this.code = code
        this.createTone(this.code)
        this.type = this.getToneType(this.tone)

        config.debug.soundTone && console.log('[SOUNDTONE] soundTone initialized', {type:this.type, code:JSON.stringify(this.code)})
    }

    createTone(code:string):any {
        let codeReady = prepareCode(code)
        if (codeReady.error) return this.error = codeReady.error

        let codeLiveRaw = evalCode(codeReady.code)
        if (codeLiveRaw.status === 'err') return this.error = codeLiveRaw.body
        else this.error = null

        this.tone = codeLiveRaw.body.c, 
        this.elementsToDispose = codeLiveRaw.body.e, 
        this.options = codeLiveRaw.body.o

    }

    //
    // LIFECYCLE FUNCTIONS
    //

    
    play(midiInfos:iProcessedMidiInfos) {
        this.type === 'pattern' && Tone.Transport.scheduleOnce(t => {
            this.tone.mute = false
            this.tone.start(0)
        }, 1)
        // console.log(this.type, this.tone);
        
        // for an event, it is just a function, so just starts it
        let rest = {
            rawNote: midiInfos.rawNote,
            idKeyToNote: idKeyToNote
        }
        this.type === 'event' && this.tone(midiInfos.type, midiInfos.note, midiInfos.power, rest)
        // this.type === 'event' && this.tone.play()
        // this.type === 'event' && this.tone.start()
    }
    
    pause() {
        this.type === 'pattern' && Tone.Transport.scheduleOnce(t => { if (this.tone) this.tone.mute = true }, 1)
        // if(this.type === 'event') this.tone.mute = true
    }

    destroy() {
        this.type === 'pattern' && Tone.Transport.scheduleOnce(t => { if (this.tone) this.tone.stop().dispose() }, 1)
        // this.type === 'event' && Tone.Transport.clear(this.tone)
    }

    updateControls(controlVars:iControlVar[]) {
        // console.log('updatecontrols');
        if (!this.options || !this.options.vars) return
        each(controlVars, varControl => {
            each(this.options.vars, varTone => {
                if (varControl.id === varTone.id) {
                    
                    // console.log(`controlvar modif sound ${varTone.name} to ${varControl.value}`)
                    if (varTone.target && typeof varTone.target.value !== 'undefined') varTone.target.value = varControl.value
                    else console.warn('[SOUNDTONE] cannot update varTone.target.value!', this.options.vars, controlVars)
                }
            })
        })
    }

    //
    // SUPPORT FUNCTIONS
    // 

    getToneType(tone:any) {
       return analyzeCode(this.code).toneType
    }
}