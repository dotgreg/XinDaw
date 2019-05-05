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

    if (midiSignal.state === getSettingsObj()[consts.settings['button.stateCode.pushDown']]) {
        return {
            device: 'button',
            event: 'pushDown',
        }
    }
    else if (midiSignal.state === getSettingsObj()[consts.settings['button.stateCode.pushUp']]) {
        return {
            device: 'button',
            event: 'pushUp',
        }
    }
    else if (midiSignal.state === getSettingsObj()[consts.settings['keyboard.stateCode.pushUp']]) {
        return {
            device: 'keyboard',
            event: 'pushUp',
        }
    }
    else if (midiSignal.state === getSettingsObj()[consts.settings['keyboard.stateCode.pushDown']]) {
        return {
            device: 'keyboard',
            event: 'pushDown',
        }
    }
    else if (midiSignal.state === getSettingsObj()[consts.settings['knob.stateCode.change']]) {
        return {
            device: 'knob',
            event: 'changed',
        }
    }
    else {
        return {
            device: null,
            event: null,
        }
    }
}

