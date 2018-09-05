import { t } from "./typeCheck";

export const tPart = t.type({
    id: t.string,
    name: t.string,
    sounds: t.array(t.string),
    active: t.boolean
})

export type iPart = t.TypeOf<typeof tPart>;