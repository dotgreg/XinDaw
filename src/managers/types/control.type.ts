import { t } from "./typeCheck";


export const tControlVar = t.type({
    id: t.string,
    name: t.string,
    target: t.type({
        value: t.number 
    }),
    value: t.number,
    min: t.number,
    max: t.number,
    step: t.number
})

export type iControlVar = t.TypeOf<typeof tControlVar>;

export const tSoundControls = t.type({
    id: t.string,
    controls: t.array(tControlVar)
})

export type iSoundControls = t.TypeOf<typeof tSoundControls>;