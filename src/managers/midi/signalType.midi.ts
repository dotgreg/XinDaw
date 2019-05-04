import { iMidiSignal } from "src/components/MidiWatcher/MidiWatcher";

interface iMidiSignalType {
    device: 'keyboad' | 'button'
    event: 'pushDown' | 'pushUp'
}

export const midiType = (midiSignal:iMidiSignal) => {
    

}