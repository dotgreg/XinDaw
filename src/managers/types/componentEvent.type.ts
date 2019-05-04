import { t } from "./typeCheck";
import { iMidiSignalType } from "../midi/signalType.midi";
import { iMidiSignal } from "src/components/MidiWatcher/MidiWatcher";

// export const tComponentEvent = t.type({
//     id: t.string,
//     action: t.string,
//     value: t.number,
//     state: t.number,
//     signalType:
// })
// export type iComponentEvent = t.TypeOf<typeof tComponentEvent>;


export interface iComponentEvent {
    id: string
    action: string
    value: number
    state: number
    signalType: iMidiSignalType
    raw: iMidiSignal
}