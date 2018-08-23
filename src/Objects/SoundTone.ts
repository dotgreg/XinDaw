import { prepareCode } from "../managers/code/prepareCode";
import { evalCode } from "../managers/code/evalCode";
import config from "../config";
import Tone from 'tone'

interface optionsSoundTone {
    vars: any[]
}

export class SoundTone {

    private code:string

    private tone:any
    private elementsToDispose:any[]
    private options:optionsSoundTone

    public type:string

    constructor(code:string){
        this.code = code
        this.createTone(this.code)
        this.type = this.getToneType(this.tone)

        config.debug.soundTone && console.log('[SOUNDTONE] soundTone initialized', {type:this.type, code:JSON.stringify(this.code)})
    }

    createTone(code:string) {
        let codeReady = prepareCode(code)
        if (!codeReady) return

        let codeLiveRaw = evalCode(codeReady)
        if (codeLiveRaw.status === 'err') return

        this.tone = codeLiveRaw.body.c, 
        this.elementsToDispose = codeLiveRaw.body.e, 
        this.options = codeLiveRaw.body.o
    }

    //
    // LIFECYCLE FUNCTIONS
    //

    play() {
        this.type === 'loop' && Tone.Transport.scheduleOnce(t => this.tone.start(0), 1)
    }
    
    pause() {

    }

    destroy() {
        this.type === 'loop' && Tone.Transport.scheduleOnce(t => { this.tone.stop().dispose() }, 1)
        this.type === 'transport-event' && Tone.Transport.clear(this.tone)
    }

    //
    // SUPPORT FUNCTIONS
    // 

    getToneType(tone:any) {
        if (typeof tone === 'number') return 'transport-event'
        else if (tone && tone.interval) return 'loop'
        return 'unknown'
    }
}