import { iMidiSignal } from "src/components/MidiWatcher/MidiWatcher";
import { getSettingsObj } from "../settings.manager";
import { consts } from "src/constants";

type idevice = 'keyboard' | 'button' | 'knob' | null
type ievent = 'pushDown' | 'pushUp' | 'changed' | null

export interface iMidiSignalType {
    device: idevice
    event: ievent
}

export const getMidiSignalType = (midiSignal:iMidiSignal):iMidiSignalType => {

    let res:iMidiSignalType = {
        device: null,
        event: null,
    }
    if (midiSignal.state === getSettingsObj()[consts.settings['button.stateCode.pushDown']]) {
        res = {
            device: 'button',
            event: 'pushDown',
        }
    }
    else if (midiSignal.state === getSettingsObj()[consts.settings['button.stateCode.pushUp']]) {
        res = {
            device: 'button',
            event: 'pushUp',
        }
    }
    else if (midiSignal.state === getSettingsObj()[consts.settings['keyboard.stateCode.pushUp']]) {
        res = {
            device: 'keyboard',
            event: 'pushUp',
        }
    }
    else if (midiSignal.state === getSettingsObj()[consts.settings['keyboard.stateCode.pushDown']]) {
        res = {
            device: 'keyboard',
            event: 'pushDown',
        }
    }
    else if (midiSignal.state === getSettingsObj()[consts.settings['knob.stateCode.change']]) {
        res = {
            device: 'knob',
            event: 'changed',
        }
    }
    // console.log(`[SignalType]`,midiSignal,'->', res, getSettingsObj()[consts.settings['keyboard.stateCode.pushDown']], getSettingsObj()[consts.settings['button.stateCode.pushDown']]);

    return res
}

